import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UserRepository from '../Repositories/UserRepository.js'
import CreateUserDTO from './DTOs/CreateUserDTO.js'
import UsersPaginationDTO from './DTOs/UsersPaginationDTO.js'
import UsersPaginationService from './Services/UsersPaginationService.js'
import CreateUserValidations from './Validations/CreateUserValidations.js'
import UsersPaginationValidations from './Validations/UsersPaginationValidations.js'

export default class UserController {
    userRepository = new UserRepository()

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

        const user = await this.userRepository.findById(id)

        response.json({
            success: true,
            data: user,
        })
    }

    createUser = async (request: Request, response: Response) => {
        await new CreateUserValidations().validate(request)
        const dto = new CreateUserDTO(request)

        const user = await this.userRepository.create(dto)

        response.status(201).json({
            success: true,
            data: user,
        })
    }
}
