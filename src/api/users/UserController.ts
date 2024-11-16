import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User from '../../Models/User.js'
import CreateUserDTO from './DTOs/CreateUserDTO.js'
import UpdateUserDTO from './DTOs/UpdateUserDTO.js'
import UsersPaginationDTO from './DTOs/UsersPaginationDTO.js'
import UsersPaginationService from './Services/UsersPaginationService.js'
import CreateUserValidations from './Validations/CreateUserValidations.js'
import UpdateUserValidations from './Validations/UpdateUserValidations.js'
import UsersPaginationValidations from './Validations/UsersPaginationValidations.js'

export default class UserController {
    private readonly user = new User()

    getUsersPagination = async (request: Request, response: Response) => {
        await new UsersPaginationValidations().validate(request)
        const query = new UsersPaginationDTO(request)
        const service = new UsersPaginationService()
        const pagination = await service.paginate(query)

        response.json({
            success: true,
            data: pagination,
        })
    }

    getUserById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)

        if (!id) {
            response.status(400).json({
                success: false,
                data: validationResult(request).mapped(),
            })
            return
        }

        const user = await this.user.findById(id)

        response.json({
            success: true,
            data: user,
        })
    }

    createUser = async (request: Request, response: Response) => {
        await new CreateUserValidations().validate(request)
        const dto = new CreateUserDTO(request)

        const user = await this.user.create(dto)

        response.status(201).json({
            success: true,
            data: user,
        })
    }

    updateUser = async (request: Request, response: Response) => {
        await new UpdateUserValidations().validate(request)
        const dto = new UpdateUserDTO(request)
        const id = Number(request.params.id)

        const updatedUser = await this.user.prismaUser.update({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                password: dto.password,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            where: { id },
        })

        response.json({
            success: true,
            data: updatedUser,
        })
    }
}
