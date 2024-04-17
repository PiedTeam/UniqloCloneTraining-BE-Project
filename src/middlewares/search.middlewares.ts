import { Request, Response, NextFunction } from 'express'
//   What if I remove type parameter, what is the result of API ?
// What if there is no value of search API, what is the error ?
// What if type is number, limit and page is negative ?
// What if type is empty string ?
// What if type is special character ?
// What if type is very long string ?
// What if type is very short string ?
// What if type is very long string ?
// What if type is very long string ?

export const searchValidator = (req: Request, res: Response, next: NextFunction) => {
  const { type, limit, page } = req.query // lấy dữ liệu từ query

  next()
}
