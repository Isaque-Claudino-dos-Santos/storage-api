import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'
export default class User {
    public readonly prismaUser: PrismaClient['user'] = new PrismaClient().user

    async findById(id: number) {
        return this.prismaUser.findUnique({
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
        return await this.prismaUser.create({
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

    static fake(data: object = {}) {
        return {
            id: faker.number.int(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
            ...data,
        }
    }
}
