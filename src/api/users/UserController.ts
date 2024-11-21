import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Route } from '../../decorators/router-decorators'
import User from '../../Models/User'
import BaseController from '../Bases/BaseController'
import PaginationResource from '../Global/Resources/PaginatinoResource'
import QueryIdValidation from '../Global/Validations/QueryIdValidation'
import CreateUserDTO from './DTOs/CreateUserDTO'
import UpdateUserDTO from './DTOs/UpdateUserDTO'
import UsersPaginationDTO from './DTOs/UsersPaginationDTO'
import UsersPaginationResource from './Resources/UsersPaginationResource'
import UsersPaginationService from './Services/UsersPaginationService'
import CreateUserValidations from './Validations/CreateUserValidations'
import UpdateUserValidations from './Validations/UpdateUserValidations'
import UsersPaginationValidations from './Validations/UsersPaginationValidations'

export default class UserController extends BaseController {
    @Route('get', '/users', UsersPaginationValidations)
    getUsersPagination = async (request: Request, response: Response) => {
        const query = new UsersPaginationDTO(request)
        const service = new UsersPaginationService()
        const pagination = await service.paginate(query)

        response.json({
            success: true,
            data: new UsersPaginationResource(pagination[0]).resolve(),
            pagination: new PaginationResource(pagination[1]).resolve(),
        })
    }

    @Route('get', '/users/:id', QueryIdValidation)
    getUserById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)

        if (!id) {
            response.status(400).json({
                success: false,
                data: validationResult(request).mapped(),
            })
            return
        }

        const user = await User.findById(id)

        if (!user) {
            response.status(404).json({
                success: false,
                data: {
                    message: 'User not found',
                },
            })
            return
        }

        response.json({
            success: true,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        })
    }

    @Route('post', '/users', CreateUserValidations)
    createUser = async (request: Request, response: Response) => {
        const dto = new CreateUserDTO(request)

        const user = await User.create(dto)

        response.status(201).json({
            success: true,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        })
    }

    @Route('post', '/users/:id', UpdateUserValidations)
    updateUser = async (request: Request, response: Response) => {
        const dto = new UpdateUserDTO(request)
        const id = Number(request.params.id)

        const user = await User.updateById(id, dto)

        response.json({
            success: true,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        })
    }
}
