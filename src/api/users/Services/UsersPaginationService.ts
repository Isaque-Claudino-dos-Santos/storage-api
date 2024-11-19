import { Prisma } from '@prisma/client'
import prisma from '../../../prisma'
import UsersPaginationQueryDTO from '../DTOs/UsersPaginationDTO'

export default class UsersPaginationService {
    private getUserWhereInput(query: UsersPaginationQueryDTO) {
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
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
                where: this.getUserWhereInput(query),
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
