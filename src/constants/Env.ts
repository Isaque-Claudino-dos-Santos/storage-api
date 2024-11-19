import { env } from 'process'

export default class Env {
    static readonly APP_ENV = env['APP_ENV'] ?? 'local'.toLocaleLowerCase()
    static readonly SERVER_PROTOCOL = env['SERVER_PROTOCOL'] ?? 'http'
    static readonly SERVER_HOST = env['SERVER_HOST'] ?? '127.0.0.1'
    static readonly SERVER_PORT = Number(env['SERVER_PORT'] ?? 8000)
    static readonly NODE_ENV = String(env['NODE_ENV'])
}
