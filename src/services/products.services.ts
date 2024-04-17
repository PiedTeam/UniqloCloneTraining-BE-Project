import { ObjectId } from 'mongodb'
import databaseServices from '~/services/database.services'
import Product from '~/models/schemas/Products.schema'
import ProductType from '~/models/schemas/Products.schema'
class ProductSevrice {
  async getProductById(id: string) {
    const product = await databaseServices.products.findOne({ _id: new ObjectId(id) })
    return product
  }
  async upsertProduct(productId: string | null, productData: Partial<ProductType>) {
    if (productId) {
      // Update product
      const objectId = new ObjectId(productId)
      const existingProduct = await databaseServices.products.findOne({ _id: objectId })
      if (!existingProduct) {
        return null
      }
      await databaseServices.products.findOneAndUpdate({ _id: objectId }, { $set: productData })
      const updatedProduct = await databaseServices.products.findOne({ _id: objectId })
      return updatedProduct
    } else {
      // Create product
      const existingProduct = await databaseServices.products.findOne({ name: productData.name })
      if (existingProduct) {
        throw new Error('Product Exists')
      }
      // Kiểm tra các trường bắt buộc
      if (
        !productData.name ||
        !productData.type ||
        !productData.price ||
        !productData.description ||
        !productData.material ||
        !productData.warning ||
        !productData.status ||
        !productData.gender ||
        !productData.cover_image ||
        !productData.details
      ) {
        throw new Error('Missing required fields')
      }
      const insertResult = await databaseServices.products.insertOne(new Product(productData as ProductType))
      if (insertResult.acknowledged && insertResult.insertedId) {
        const insertedProductId = insertResult.insertedId
        return await databaseServices.products.findOne({ _id: insertedProductId })
      } else {
        throw new Error('Failed to insert product')
      }
    }
  }
}

const productSevrice = new ProductSevrice()
export default productSevrice
