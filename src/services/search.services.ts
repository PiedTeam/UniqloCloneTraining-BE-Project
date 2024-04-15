import databaseServices from './database.services'

//
class SearchServices {
  async search(query: { type: string; limit: number; page: number }) {
    const { type, limit, page } = query
    const result = await databaseServices.products
      .find({ $text: { $search: type } }) //tìm kiếm theo text
      .limit(limit) //giới hạn số lượng trả về
      .toArray() //chuyển dữ liệu từ cursor sang mảng
    return result
  }
}

const searchServices = new SearchServices()
export default searchServices
