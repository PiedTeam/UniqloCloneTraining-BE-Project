///import các interface để định dạng kiểu cho para của middlewares
import { Request, Response, NextFunction } from 'express'

//1 req của client gữi lên server sẽ có body(chứa các thứ cần gửi)
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  // ta vào body lấy email, password ra
  console.log(req.body) //log xem có gì
  const { email, password } = req.body
  // kiểm tra xem email và password có tồn tại không
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }
  next()
}
