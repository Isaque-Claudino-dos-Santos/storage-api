import { Prisma } from '@prisma/client'
import User from '../../../Models/User'
import prisma from '../../../prisma'
import UsersPaginationQueryDTO from '../DTOs/UsersPaginationDTO'

export default class UsersPaginationService {
    private getUsersPaginationWhereStatement(query: UsersPaginationQueryDTO) {
        const { userIds } = query
        const where: Prisma.UserWhereInput = {}

        if (userIds?.length > 0) {
            where['id'] = { in: userIds }
        }

        return where
    }

    public async paginate(query: UsersPaginationQueryDTO) {
        const users = prisma.user
            .paginate({
                select: User.SELECT_READABLE,
                where: this.getUsersPaginationWhereStatement(query),
                orderBy: query.orderBy,
            })
            .withPages({
                limit: query.limit,
                includePageCount: true,
                page: query.page,
            })

        return users
    }
}
