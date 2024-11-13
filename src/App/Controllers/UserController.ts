import { Request, Response } from 'express'

export default class UserController {
    static index(req: Request, res: Response) {
        res.send({
            success: true,
            message: 'Hello World',
        })
    }
}
