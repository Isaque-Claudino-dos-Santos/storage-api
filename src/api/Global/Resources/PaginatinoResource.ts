import {
    PageNumberCounters,
    PageNumberPagination,
} from 'prisma-extension-pagination/dist/types'
import BaseResource from '../../Bases/BaseResource'

export default class PaginationResource extends BaseResource<
    PageNumberPagination & PageNumberCounters
> {
    resolve() {        
        return {
            isFirstPage: this.data.isFirstPage,
            isLastPage: this.data.isLastPage,
            currentPage: this.data.currentPage,
            previousPage: this.data.previousPage,
            nextPage: this.data.nextPage,
            pageCount: this.data.pageCount,
            totalCount: this.data.totalCount,
        }
    }
}
