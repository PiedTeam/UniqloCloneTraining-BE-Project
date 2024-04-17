import { Router } from 'express'
import { getProductController, deleteProductController } from '~/controllers/products.controller'

const productRouter = Router()
productRouter.get('/:id', getProductController)
productRouter.delete('/:id', deleteProductController)

export default productRouter
