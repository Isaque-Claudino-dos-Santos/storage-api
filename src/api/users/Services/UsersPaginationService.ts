import { Prisma } from '@prisma/client'
import prisma from '../../../helpers/prisma.js'
import UsersPaginationQueryDTO from '../DTOs/UsersPaginationDTO.js'

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
        const users = await prisma().user.findMany({
            select: { id: true, firstName: true, lastName: true, email: true },
            where: this.getUserWhereInput(query),
            orderBy: query.orderBy,
            take: query.limit,
        })

        return users
    }
}
