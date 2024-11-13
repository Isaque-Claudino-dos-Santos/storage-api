import { Router } from 'express'
import userRouter from './api/users/user-router.js'
import HttpServer from './Kernel/Server/HttpServer.js'

const httpServer = new HttpServer()

const routers: Router[] = [userRouter]

httpServer.start(routers)
