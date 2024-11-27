import { Handler, Router } from 'express'
import { ValidationChain } from 'express-validator'
import BaseMiddleware from '../../api/Bases/BaseMiddleware'
import BaseValidations from '../../api/Bases/BaseValidations'
import Collection from '../../Helpers/Collection'
import Metadata from '../../Helpers/Metadata'

const METADATA_KEYS = {
    MIDDLEWARES: 'middlewares',
    VALIDATIONS: 'validations',
    OPTIONS: 'options',
    ROUTER: 'router',
}

type Handle = BaseMiddleware['handle'] | ValidationChain

type Methods =
    | 'all'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head'

export type EndPointOptions = {
    prefix?: string
}

export function EndPoint(options: EndPointOptions) {
    return function (_: unknown, context: DecoratorContext) {
        context.addInitializer(function () {
            if (!context.metadata) {
                Reflect.defineProperty(context, 'metadata', {
                    value: {},
                })
            }

            if (!context.metadata) return


            const metadata = new Metadata('global', context.metadata)

            const router = Router()
            const middlewares = metadata.get<Handle>({
                key: METADATA_KEYS.MIDDLEWARES,
                defaultValue: [],
            })

            if (middlewares.length) {
                router.use(middlewares)
            }

            metadata
                .set({
                    key: METADATA_KEYS.OPTIONS,
                    value: options,
                })
                .set({
                    key: METADATA_KEYS.ROUTER,
                    value: router,
                })
        })
    }
}

export function Validation(...validationClass: (typeof BaseValidations)[]) {
    return function (_: Handler, context: DecoratorContext) {
        if (
            !context.name ||
            typeof context.name !== 'string' ||
            !context.metadata
        )
            return

        const metadata = new Metadata(context.name, context.metadata)

        const newValidations = Collection.create(validationClass)
            .construct()
            .map((validation) => {
                return validation.handle()
            })
            .get()

        metadata.append({
            key: METADATA_KEYS.VALIDATIONS,
            value: newValidations,
        })
    }
}

export function Middleware(...middlewareClass: (new () => BaseMiddleware)[]) {
    return function (_: unknown, context: DecoratorContext) {
        if (
            !context.name ||
            typeof context.name !== 'string' ||
            !context.metadata
        ) {
            return
        }

        const newMiddlewares = Collection.create(middlewareClass)
            .construct()
            .columns('handle')
            .get()

        if (context.kind === 'class') {
            const globalMetadata = new Metadata('global', context.metadata)

            globalMetadata.append({
                key: METADATA_KEYS.MIDDLEWARES,
                value: newMiddlewares,
            })

            return
        }

        const localMetadata = new Metadata(context.name, context.metadata)

        localMetadata.append({
            key: METADATA_KEYS.MIDDLEWARES,
            value: newMiddlewares,
        })
    }
}

function createRoute(method: Methods, uri: string) {
    return function (target: Handler, context: DecoratorContext) {
        context.addInitializer(function () {
            if (!context.metadata || typeof context.name !== 'string') return

            const localMetadata = new Metadata(context.name, context.metadata)
            const globalMetadata = new Metadata('global', context.metadata)

            const middlewares = localMetadata.get<Handle[]>({
                key: METADATA_KEYS.MIDDLEWARES,
                defaultValue: [],
            })
            const validations = localMetadata.get<Handle[]>({
                key: METADATA_KEYS.VALIDATIONS,
                defaultValue: [],
            })

            const router = globalMetadata.get<Router>({ key: 'router' })


            router[method](uri, ...middlewares, ...validations, target)
        })
    }
}

export function Get(uri: string) {
    return createRoute('get', uri)
}

export function Post(uri: string) {
    return createRoute('post', uri)
}

export function Put(uri: string) {
    return createRoute('put', uri)
}

export function Patch(uri: string) {
    return createRoute('patch', uri)
}

export function Delete(uri: string) {
    return createRoute('delete', uri)
}

export function Head(uri: string) {
    return createRoute('head', uri)
}

export function Options(uri: string) {
    return createRoute('options', uri)
}

export function All(uri: string) {
    return createRoute('all', uri)
}
