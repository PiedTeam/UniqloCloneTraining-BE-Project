import { Request, Response } from 'express'
import productSevrice from '../services/products.services'
import Product from '~/models/schemas/Products.schema'
//show ra thông tin của sản phẩm theo id
export const productController = async (req: Request, res: Response) => {
  const id = req.params.id // Chúng ta cần xác định kiểu cho _id
  try {
    if (!id) {
      return res.status(400).json({
        message: 'Id is required'
      })
    }
    const product = await productSevrice.getProductById(id)
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    console.log(product)
    return res.send(product)
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

  try {
    // Validate input
    if (!productData.name || productData.name.length > 200) {
      return res.status(422).json({ message: 'Invalid product_name' })
    }
    if (productData.quantity < 0) {
      return res.status(422).json({ message: 'Invalid product_quantity' })
    }
    if (productData.release_day && productData.release_day < new Date()) {
      return res.status(422).json({ message: 'Invalid release_day' })
    }
    // Kiểm tra các trường bắt buộc khác
    if (
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
      return res.status(422).json({ message: 'Missing required fields' })
    }

    if (id) {
      // Update product
      const updatedProduct = await productSevrice.upsertProduct(id, productData)
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' })
      }
      return res.status(200).json({ message: 'Update Product Successfully', data: updatedProduct })
    } else {
      // Create product
      const newProduct = new Product(productData)
      const createdProduct = await productSevrice.upsertProduct(null, newProduct)
      return res.status(200).json({ message: 'Create Product Successfully', data: createdProduct })
    }
  } catch (error: any) {
    console.error('Error occurred:', error)
    if (error.message === 'Product Exists') {
      return res.status(409).json({ message: 'Product Exists' })
    }
    return res.status(500).json({ message: 'Server Error' })
  }
}
