import BaseController from '../api/Bases/BaseController'
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
        ...middleware: Middlewares
    ) {
        return function (target: unknown, context: DecoratorContext) {
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

                const handlers = middleware.flatMap((middlewareClass) => {
                    const middleware = Reflect.construct(middlewareClass, [])

                    if (middleware instanceof BaseValidations) {
                        return middleware.handler()
                    }

                    return middleware.handle
                })

                controller.router[method](uri, handlers, controllerHandler)
            })
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
