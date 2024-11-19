import { Router } from 'express'
import { param } from 'express-validator'
import UserController from './UserController'

const userRouter = Router()
const userController = new UserController()

userRouter
    .get('/users', userController.getUsersPagination)
    .get('/users/:id', param('id').toInt(), userController.getUserById)
    .post('/users', userController.createUser)
    .put('/users/:id',param('id').toInt(),userController.updateUser)
    
export default userRouter
