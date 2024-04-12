import { Request, Response } from 'express'
import productSevrice from '~/services/products.services'
import { PODUCTS_MESSAGE } from '~/constants/message'

//show ra thông tin của sản phẩm theo id
export const getProductController = async (req: Request, res: Response) => {
  const id = req.params.id // lấy id từ url
  try {
    if (!id) {
      return res.status(400).json({
        message: PODUCTS_MESSAGE.ID_REQUIRED
      })
    }

    const product = await productSevrice.getProductById(id) //gọi hàm lấy thông tin sản phẩm theo id

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
        message: PODUCTS_MESSAGE.ID_REQUIRED
      })
    }

    await productSevrice.deleteProductById(id) //gọi hàm xóa sản phẩm
    return res.status(200).json({
      message: PODUCTS_MESSAGE.PRODUCT_DELETED_SUCCESS
    })
  } catch (error) {
    console.error('Error occurred:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}
