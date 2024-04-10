import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import databaseServices from '~/services/database.services'
//show ra thông tin của sản phẩm theo id
export const productController = async (req: Request, res: Response) => {
  const { _id } = req.body as { _id: ObjectId } // Chúng ta cần xác định kiểu cho _id
  try {
    if (!_id) {
      return res.status(400).json({
        message: 'Id is required'
      })
    }

    const product = await databaseServices.products.findOne({ _id })

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
