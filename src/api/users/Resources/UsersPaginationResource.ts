import BaseResource from '../../Bases/BaseResource'

type ResourceData = {
    id: number
    firstName: string
    lastName: string
    email: string
}[]

export default class UsersPaginationResource extends BaseResource<ResourceData> {
    resolve() {
        return this.data.map(function (user) {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        })
    }
}
