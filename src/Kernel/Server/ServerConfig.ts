import Env from "../../constants/Env.js"

export default class ServerConfig {
    readonly protocol: string = Env.SERVER_PROTOCOL
    readonly host: string = Env.SERVER_HOST
    readonly port: number = Env.SERVER_PORT
    readonly url: string  = `${this.protocol}://${this.host}:${this.port}`
}