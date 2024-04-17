import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/enum/User.enum'

//đặt interface vì theo chuẩn ts thôi, chứ làm thực tế thì khác
interface UserType {
  _id?: ObjectId
  user_name?: string
  password: string
  email: string
  full_name?: string
  address?: string
  phone_number?: string
  verify_status?: UserVerifyStatus
}

export default class User {
  _id?: ObjectId
  user_name?: string
  password: string
  email: string
  full_name?: string
  address?: string
  phone_number?: string

  constructor(user: UserType) {
    ;(this.user_name = user.user_name),
      (this.password = user.password),
      (this.email = user.email),
      (this.full_name = user.full_name),
      (this.address = user.address),
      (this.phone_number = user.phone_number)
  }
}
