import { Request, Response } from 'express'
import productSevrice from '~/services/products.services'

//show ra thông tin của sản phẩm theo id
export const productController = async (req: Request, res: Response) => {
  const id = req.params.id // lấy id từ url
  try {
    if (!id) {
      return res.status(400).json({
        message: 'Id is required'
      })
    }

    const product = await productSevrice.getProductById(id) //gọi hàm lấy thông tin sản phẩm theo id

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    console.log(product) // in ra thông tin sản phẩm
    return res.send(product) // trả về thông tin sản phẩ
  } catch (error) {
    //bắt lỗi
    console.error('Error occurred:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

//hàm xóa sản phẩm
export const deleteProductController = async (req: Request, res: Response) => {
  const id = req.params.id // lấy id từ url
  try {
    if (!id) {
      return res.status(401).json({
        message: 'Id is required'
      })
    }
    // trả về thông tin sản phẩm
    await productSevrice.deleteProductById(id) //gọi hàm xóa sản phẩm
    return res.status(200).json({
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error occurred:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}
