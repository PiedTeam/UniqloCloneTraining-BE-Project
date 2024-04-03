import { loginValidator } from '~/middlewares/users.middlewares'
import { loginController, registerController } from '~/controllers/users.controllers'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/register', registerController)
usersRouter.post('/login', loginValidator, loginController)
export default usersRouter
