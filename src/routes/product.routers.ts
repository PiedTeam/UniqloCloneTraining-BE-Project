import { Router } from 'express'
import databaseServices from '~/services/database.services'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
  const product = await databaseServices.products.findOne()
  console.log(product)
  res.send(product?.cover_image)
})

export default productRouter
