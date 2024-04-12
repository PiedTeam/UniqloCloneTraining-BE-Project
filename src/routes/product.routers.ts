import { Router } from 'express'
import { getProductController, deleteProductController } from '~/controllers/products.controller'

const productRouter = Router()
//show ra thông tin của sản phẩm theo id
productRouter.get('/:id', getProductController)
productRouter.delete('/:id', deleteProductController)
export default productRouter
