import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '../models/schemas/User.schema'
import Product from '~/models/schemas/Products.schema'
import Log from '~/models/schemas/Logs.schema'
import Categoriess from '~/models/schemas/Categories.schema'
import Category from '~/models/schemas/Categories.schema'

dotenv.config()
const connectionString = `mongodb+srv://uniqlo-sa:i1gmT1OXOFPVRbRy@cluster1.f18lfkh.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db //tạo thành thuộc tình db
  constructor() {
    this.client = new MongoClient(connectionString)
    // nạp giá trị cho thuộc tình db thông qua constructor
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 }) //đổi cách xài
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
    //vào db lấy ra collection users, và vì chuỗi truyền vào có thể là undefined nên mình phải rằng buộc nó là string 'thử xóa as string để thấy lỗi'
  }
  get products(): Collection<Product> {
    return this.db.collection(process.env.DB_PRODUCTS_COLLECTION as string)
  }
  get logs(): Collection<Log> {
    return this.db.collection(process.env.DB_LOGS_COLLECTION as string)
  }
  get categories(): Collection<Category> {
    return this.db.collection(process.env.DB_CATEGORIES_COLLECTION as string)
  }

  async indexProducts() {
    const exits = await this.products.indexExists(['type_text'])
    if (!exits) {
      await this.products.createIndex({ type: 'text' }, { default_language: 'none' })
    }
  }
}

const databaseServices = new DatabaseService() //tạo ra một đối tượng mới từ class DatabaseService
export default databaseServices
