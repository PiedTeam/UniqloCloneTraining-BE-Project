import { Request, Response } from 'express'
import searchServices from '~/services/search.services'
export const searchController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const type = req.query.type as string // lấy type từ query
  const result = await searchServices.search({ type, limit, page })
}
