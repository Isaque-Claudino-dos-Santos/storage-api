import { Prisma } from '@prisma/client'
import { Request } from 'express'
import BaseDTO from '../../Bases/BaseDTO.js'

type Query = {
    limit: number
    user_ids: number[]
    order_by: Prisma.SortOrder
    order_by_column: string
}

export default class UsersPaginationDTO extends BaseDTO {
    public readonly limit: number
    public readonly userIds: number[]
    public readonly orderBy: { [x: string]: Prisma.SortOrder }

    constructor(request: Request) {
        super(request)
        
        const query = request.query as unknown as Query

        this.limit = query.limit
        this.userIds = query.user_ids
        this.orderBy = {
            [query.order_by_column]: query.order_by,
        }
    }
}
