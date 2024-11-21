import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import BaseController from '../api/Bases/BaseController'
import BaseErrorHandler from '../api/Bases/BaseErrorHandler'
import BaseMiddleware from '../api/Bases/BaseMiddleware'
import BaseValidations from '../api/Bases/BaseValidations'

type HttpMethods = 'get' | 'post' | 'delete' | 'put' | 'patch'
type Contructor<T> = new () => T
type Middleware = Contructor<BaseMiddleware> | Contructor<BaseValidations>
type Middlewares = Middleware[]

export default class Api {
    private static baseRoute(
        method: HttpMethods,
        uri: string,
        ...handlers: Middlewares
    ) {
        return function (_: unknown, context: DecoratorContext) {
            context.addInitializer(function () {
                const methodName = context.name

                if (
                    typeof methodName !== 'string' ||
                    context.kind !== 'method' ||
                    context.private
                ) {
                    return
                }

                const controller = this as BaseController
                const controllerHandler = Reflect.get(controller, methodName)

                const validations: ValidationChain[] = []
                const middlewares: BaseMiddleware['handle'][] = []
                const errors: BaseErrorHandler['handle'][] = []

                handlers.forEach((handlerClass) => {
                    const handler = Reflect.construct(handlerClass, [])

                    if (handler instanceof BaseValidations) {
                        validations.push(...handler.handler())
                    }

                    if (handler instanceof BaseMiddleware) {
                        middlewares.push(handler.handle)
                    }

                    if (handler instanceof BaseErrorHandler) {
                        errors.push(handler.handle)
                    }
                })

                const route = controller.router[method](
                    uri,
                    middlewares,
                    validations,
                    (request: Request, _: Response, next: NextFunction) => {
                        const validate = validationResult(request)

                        if (validate.isEmpty()) {
                            next()
                        }
                        
                        validate.throw()
                    },
                    controllerHandler
                )

                if (errors.length) {
                    route.use(errors)
                }
            })
        }
    }

    static ErrorHandler(...handler: (typeof BaseErrorHandler)[]) {
        return function (target: typeof BaseController) {
            target.errorsHandlers.push(
                ...handler.map(
                    (handlerClass) => Reflect.construct(handlerClass, []).handle
                )
            )
        }
    }

    static Get(uri: string, ...middleware: Middlewares) {
        return Api.baseRoute('get', uri, ...middleware)
    }

    static Post(uri: string, ...middleware: Middlewares) {
        return Api.baseRoute('post', uri, ...middleware)
    }

    static Put(uri: string, ...middleware: Middlewares) {
        return Api.baseRoute('put', uri, ...middleware)
    }

    static Patch(uri: string, ...middleware: Middlewares) {
        return Api.baseRoute('patch', uri, ...middleware)
    }

    static Delete(uri: string, ...middleware: Middlewares) {
        return Api.baseRoute('delete', uri, ...middleware)
    }
}
