import { Request, Response } from 'express'
import productSevrice from '../services/products.services'
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
