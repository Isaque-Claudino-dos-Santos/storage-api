import { Prisma, PrismaClient } from '@prisma/client'
import UsersPaginationQueryDTO from '../DTOs/UsersPaginationDTO.js'

export default class UsersPaginationService {
    constructor(private readonly prisma: PrismaClient) {}

    private getUserWhereInput(query: UsersPaginationQueryDTO) {
        const { userIds } = query
        const where: Prisma.UserWhereInput = {}

        if (userIds?.length > 0) {
            where['id'] = { in: userIds }
        }

        return where
    }

    public async paginate(query: UsersPaginationQueryDTO) {
        const users = await this.prisma.user.findMany({
            select: { id: true, firstName: true, lastName: true, email: true },
            where: this.getUserWhereInput(query),
            orderBy: query.orderBy,
            take: query.limit,
        })

        return users
    }
}
