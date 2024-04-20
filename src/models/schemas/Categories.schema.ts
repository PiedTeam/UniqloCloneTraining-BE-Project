import { ObjectId } from 'mongodb'
import { ProductGender } from '~/enum/Product.enum'

interface CategoryType {
  _id?: ObjectId
  category_title: string
  category_name: string
  gender: ProductGender
}

export default class Category {
  _id?: ObjectId
  category_title: string
  category_name: string
  gender: ProductGender
  constructor(category: CategoryType) {
    this.category_title = category.category_title
    this.category_name = category.category_name
    this.gender = category.gender
  }
}
