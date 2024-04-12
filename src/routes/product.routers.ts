import { Router } from 'express'
import { productController, deleteProductController } from '~/controllers/products.controller'

const productRouter = Router()
//show ra thông tin của sản phẩm theo id
productRouter.get('/:id', productController)
productRouter.delete('/:id', deleteProductController)
export default productRouter
