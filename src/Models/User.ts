import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import prisma from '../prisma'

export default class User {
    static readonly SELECT_READABLE = {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
    }

    static async findById(id: number) {
        return prisma.user.findUnique({
            select: User.SELECT_READABLE,
            where: { id },
        })
    }

    static async updateById(id: number, data: Prisma.UserUpdateInput) {
        return prisma.user.update({
            select: User.SELECT_READABLE,
            where: { id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            },
        })
    }

    static async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            select: User.SELECT_READABLE,
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
