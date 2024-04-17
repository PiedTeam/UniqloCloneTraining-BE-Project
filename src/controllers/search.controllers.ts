import { Request, Response } from 'express'
import searchServices from '~/services/search.services'

export const searchController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const type = req.query.type as string // lấy type từ query
  const result = await searchServices.search({ type, limit, page })

  if (!result) {
    return res.status(404).json({
      message: 'Not found'
    })
  }

  if (!limit || !page) {
    return res.status(400).json({
      message: 'Limit and page are required'
    })
  }

  if (!type) {
    // gọi hàm searchAll từ searchServices
    const resultAll = await searchServices.searchAll({ limit, page })
    return res.status(200).json({
      message: 'Show all products',
      data: resultAll
    })
  }
  return res.status(200).json({
    message: 'Search successfully',
    data: result
  })
}
