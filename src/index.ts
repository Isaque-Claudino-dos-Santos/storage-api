import 'dotenv/config'
import 'express-async-errors'
import "reflect-metadata";

import ErrorHandler from './api/Global/Errors/ErrorHandler'
import UserController from './api/users/UserController'
import Application from './Kernel/Application/index'

export const app = new Application()

app.withController(UserController).withErrorHandler(ErrorHandler).initialize()
