import { ObjectId } from 'mongodb'
import databaseServices from '~/services/database.services'

class ProductSevrice {
  async getProductById(id: string) {
    const product = await databaseServices.products.findOne({ _id: new ObjectId(id) })
    return product
  }
  async deleteProductById(id: string) {
    const product = await databaseServices.products.findOneAndDelete({ _id: new ObjectId(id) })
  }
}

const productSevrice = new ProductSevrice()
export default productSevrice
