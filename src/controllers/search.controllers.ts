import { Request, Response } from 'express'
import searchServices from '~/services/search.services'
export const searchController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const type = req.query.type as string // Ensure content is of type string
  const result = await searchServices.search({ type, limit, page })
  res.json({ message: 'search thành côg' })
}
