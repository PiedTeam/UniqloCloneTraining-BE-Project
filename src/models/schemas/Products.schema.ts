import { ObjectId } from 'mongodb'
import { ProductColor, ProductGender, ProductSize, ProductStatus } from '~/enum/Product.enum'

interface ProductType {
  _id?: ObjectId
  name: string
  type: string
  price: number
  quantity: number
  release_day: Date
  total_sold: number
  description: string
  material: string
  warning: string
  status: ProductStatus
  gender: ProductGender
  cover_image: string
  product_images: string[]
  details: ProductDetail[]
}

interface ProductDetail {
  color: ProductColor
  image: string
  quantities: { size: ProductSize; quantity: number; status: ProductStatus }[]
  create_at: Date
  create_by: ObjectId
}

export default class Product {
  _id?: ObjectId
  name: string
  type: string
  price: number
  quantity: number
  release_day: Date
  total_sold: number
  description: string
  material: string
  warning: string
  status: ProductStatus
  gender: ProductGender
  cover_image: string
  product_images: string[]
  details: ProductDetail[]
  constructor(product: ProductType) {
    ;(this.name = product.name),
      (this.type = product.type),
      (this.price = product.price),
      (this.quantity = product.quantity),
      (this.release_day = product.release_day),
      (this.total_sold = product.total_sold),
      (this.cover_image = product.cover_image),
      (this.description = product.description),
      (this.material = product.material),
      (this.warning = product.warning),
      (this.status = product.status),
      (this.gender = product.gender),
      (this.product_images = product.product_images),
      (this.details = product.details)
  }
}
