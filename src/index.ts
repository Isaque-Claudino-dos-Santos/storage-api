import userRouter from './api/users/user-router.js'
import Application from './Kernel/Application/index.js'

export const app = new Application()

app.withRouters(userRouter)

app.initialize()
