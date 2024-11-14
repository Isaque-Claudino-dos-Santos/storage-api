import { Prisma } from '@prisma/client'

export default class Helper {
    static toOrderBy(field: string, sort: Prisma.SortOrder) {
        return { [field]: sort }
    }

    static toNumericOrNull(data: unknown): number | null {
        if (typeof data === 'number') return data

        if (typeof data === 'string') {
            const dataNumeric = Number(data)

            if (isNaN(dataNumeric)) return null

            return dataNumeric
        }

        return null
    }

    static toNumericList(data: unknown): number[] {
        if (Array.isArray(data)) {
            return data
                .map((value) => this.toNumericOrNull(value))
                .filter((value) => value !== null)
        }

        return []
    }
}
