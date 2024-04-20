import { ObjectId } from 'mongodb'
import databaseServices from '~/services/database.services'
import Product from '~/models/schemas/Products.schema'
import ProductType from '~/models/schemas/Products.schema'
import CategoryType from '~/models/schemas/Categories.schema'
import Category from '~/models/schemas/Categories.schema'
import { ProductStatus } from '~/enum/Product.enum'

class ProductService {
  async getProductById(id: string) {
    const product = await databaseServices.products.findOne({ _id: new ObjectId(id) })
    return product
  }

  async upsertProduct(productId: string | null, productData: Partial<ProductType>, categoryData: CategoryType) {
    if (productId) {
      // Cập nhật sản phẩm
      const objectId = new ObjectId(productId)
      const existingProduct = await databaseServices.products.findOne({ _id: objectId })

      if (!existingProduct) {
        return null
      }

      // Tìm danh mục từ thông tin categoryData
      const category = await databaseServices.categories.findOne({ category_name: categoryData.category_name })
      if (!category) {
        throw new Error('Không tìm thấy danh mục')
      }

      productData.category_id = category._id
      await databaseServices.products.findOneAndUpdate({ _id: objectId }, { $set: productData })
      const updatedProduct = await databaseServices.products.findOne({ _id: objectId })
      return updatedProduct
    } else {
      // Tạo mới sản phẩm
      const existingProduct = await databaseServices.products.findOne({ name: productData.name })

      if (existingProduct) {
        throw new Error('Sản phẩm đã tồn tại')
      }

      // Tạo mới danh mục nếu chưa tồn tại
      let category = await databaseServices.categories.findOne({ category_name: categoryData.category_name })
      if (!category) {
        const newCategory = new Category(categoryData)
        const insertedCategory = await databaseServices.categories.insertOne(newCategory)
        category = await databaseServices.categories.findOne({ _id: insertedCategory.insertedId })
      }
      if (!category) {
        throw new Error('Không thể tạo hoặc tìm thấy danh mục')
      }

      productData.category_id = category._id

      if (!productData.details) {
        productData.details = []
      }

      const now = new Date()
      productData.details.forEach((detail: any) => {
        detail.status = 'Active'
        detail.create_at = now
        detail.create_by = new ObjectId()
      })

      const insertResult = await databaseServices.products.insertOne(new Product(productData as ProductType))

      if (insertResult.acknowledged && insertResult.insertedId) {
        const insertedProductId = insertResult.insertedId
        return await databaseServices.products.findOne({ _id: insertedProductId })
      } else {
        throw new Error('Không thể tạo sản phẩm')
      }
    }
  }
}

const productService = new ProductService()
export default productService
