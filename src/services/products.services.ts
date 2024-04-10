import { ObjectId } from 'mongodb'
import databaseServices from '~/services/database.services'

class ProductSevrice {
  async getProductById(id: string) {
    const product = await databaseServices.products.findOne({ _id: new ObjectId(id) })
    return product
  }
}

const productSevrice = new ProductSevrice()
export default productSevrice
