import { Prisma } from '@prisma/client'
import prisma from '../../helpers/prisma.js'

export default class UserRepository {
    async findById(id: number) {
        return prisma().user.findUnique({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            where: { id },
        })
    }

    async create(data: Prisma.UserCreateInput) {
        return await prisma().user.create({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            },
        })
    }
}
