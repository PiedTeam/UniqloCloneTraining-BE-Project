import databaseServices from './database.services'

//
class SearchServices {
  async search(query: { type: string; limit: number; page: number }) {
    const { type, limit, page } = query //lấy dữ liệu từ query
    const result = await databaseServices.products
      .find({ $text: { $search: type } }) //tìm kiếm theo text
      .skip((page - 1) * limit) //bỏ qua các sản phẩm trước trang hiện tại
      .limit(limit) //giới hạn số lượng trả về
      .toArray() //chuyển dữ liệu từ cursor sang mảng
    return result
  }
}

const searchServices = new SearchServices()
export default searchServices
