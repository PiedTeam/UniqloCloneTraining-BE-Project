import { Request, Response } from 'express'
import productSevrice from '~/services/products.services'
import { PODUCTS_MESSAGE } from '~/constants/message'
import Product from '~/models/schemas/Products.schema'
import { ProductStatus } from '~/enum/Product.enum'
import Category from '~/models/schemas/Categories.schema'
import databaseServices from '~/services/database.services'
//show ra thông tin của sản phẩm theo id
export const getProductController = async (req: Request, res: Response) => {
  const id = req.params.id // lấy id từ url
  try {
    if (!id) {
      return res.status(401).json({
        message: PODUCTS_MESSAGE.ID_REQUIRED
      })
    }

    const product = await productSevrice.getProductById(id)

    if (!product) {
      return res.status(404).json({
        message: PODUCTS_MESSAGE.PRODUCT_NOT_FOUND
      })
    }
    return res.status(200).json({
      message: PODUCTS_MESSAGE.GET_PRODUCT_SUCCESS,
      result: product
    })
  } catch (error) {
    console.error('Error occurred:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}
export const upsertProductController = async (req: Request, res: Response) => {
  const { id } = req.params
  const productData = req.body
  const categoryData = req.body.category

  try {
    if (
      !id &&
      (!productData.name ||
        productData.name.length > 200 ||
        productData.quantity < 0 ||
        (productData.release_day && productData.release_day < new Date()) ||
        !productData.type ||
        !productData.price ||
        !productData.description ||
        !productData.material ||
        !productData.warning ||
        !productData.gender ||
        !productData.cover_image ||
        !productData.details)
    ) {
      return res.status(422).json({ message: 'Invalid or missing fields in product data' })
    }

    let result
    if (id) {
      result = await productSevrice.upsertProduct(id, productData, categoryData)
    } else {
      const newProduct = { ...productData, status: 'Active' }
      result = await productSevrice.upsertProduct(null, newProduct, categoryData)
    }

    if (!result) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const successMessage = id ? 'Update Product Successfully' : 'Create Product Successfully'
    return res.status(200).json({ message: successMessage, data: result })
  } catch (error: any) {
    console.error('Error occurred:', error)
    const errorMessage = error.message === 'Product Exists' ? 'Product Exists' : 'Server Error'
    return res.status(error.status || 500).json({ message: errorMessage })
  }
}
