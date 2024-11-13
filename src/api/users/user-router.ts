import { Router } from 'express'
import UserController from './UserController.js'

const userRouter = Router()
const userController = new UserController()

userRouter.get('/users', userController.index)

export default userRouter
