import { ObjectId } from 'mongodb'
import { ProductGender } from '~/enum/Product.enum'

interface CategoryType {
  _id?: ObjectId
  name: string
  categoryName: string
  gender: ProductGender
}

export default class Category {
  _id?: ObjectId
  name: string
  categoryName: string
  gender: ProductGender
  constructor(category: CategoryType) {
    this.name = category.name
    this.categoryName = category.categoryName
    this.gender = category.gender
  }
}
