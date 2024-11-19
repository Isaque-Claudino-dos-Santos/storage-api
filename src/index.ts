import userRouter from './api/users/user-router'
import Application from './Kernel/Application/index'

export const app = new Application()

app.withRouters(userRouter)

app.initialize()
