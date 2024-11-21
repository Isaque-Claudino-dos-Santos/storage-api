import 'dotenv/config'
import 'express-async-errors'

import UserController from './api/users/UserController'
import Application from './Kernel/Application/index'

export const app = new Application()

app.withController(UserController).initialize()
