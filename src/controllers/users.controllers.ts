import { Request, Response } from 'express'
import usersService from '../services/users.services'

//1 req của client gữi lên server sẽ có body(chứa các thứ cần gửi)
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'khangbe0410@gmail.com' && password === 'Khangbeo4101010@') {
    return res.json({
      message: 'Login success'
    })
  } else {
    return res.status(400).json({
      message: 'Email or password is incorrect'
    })
  }
}

//route này nhận vào email, password và tạo tài khoản cho mình
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    console.log(result)
    return res.status(200).json({
      message: 'Register success', //chỉnh lại thông báo
      result: result
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Register failed', //chỉnh lại thông báo
      err: err
    })
  }
}
