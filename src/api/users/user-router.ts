import { Router } from 'express'
import UserController from './UserController.js'
import { param } from 'express-validator'

const userRouter = Router()
const userController = new UserController()

userRouter.get('/users', userController.getUsersPagination)
userRouter.get('/users/:id', param('id').toInt(), userController.getUserById)
userRouter.post('/users', userController.createUser)


export default userRouter
