import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export default class UserController {
    prisma = new PrismaClient()

    index = (req: Request, res: Response) => {
        res.send(this.prisma)
    }
}
