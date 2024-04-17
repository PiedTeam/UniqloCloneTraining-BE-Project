import { Request, Response, NextFunction } from 'express'

export const searchValidator = (req: Request, res: Response, next: NextFunction) => {
  const { type, limit, page } = req.query // lấy dữ liệu từ query
  // kiểm tra xem type, limit, page có tồn tại không
  // kiểm tra xem limit và page có phải là số không
  if (isNaN(Number(limit)) || isNaN(Number(page))) {
    return res.status(400).json({
      message: 'Limit and page must be a number'
    })
  }
  // kiểm tra xem limit và page có phải là số không
  if (Number(limit) < 0 || Number(page) < 0) {
    return res.status(400).json({
      message: 'Limit and page must be greater than 0'
    })
  }

  // kiểm tra xem type có phải là string không
  if (typeof type !== 'string') {
    return res.status(400).json({
      message: 'Type must be a string'
    })
  }

  next()
}
