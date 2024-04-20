import { Router } from 'express'
import databaseServices from '~/services/database.services'
import { getProductController, upsertProductController } from '~/controllers/products.controller'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
  const product = await databaseServices.products.findOne()
  console.log(product)
  res.send(product?.cover_image)
})

productRouter.get('/:id', getProductController)
productRouter.route('/').post(upsertProductController).put(upsertProductController)
productRouter.put('/:id', upsertProductController)
export default productRouter
