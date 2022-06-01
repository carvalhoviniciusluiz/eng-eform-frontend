import { FormModel } from '~/app/domain/models'

export interface LoadForms {
  loadAll: (params?: LoadForms.Params) => Promise<LoadForms.Response>
}

export namespace LoadForms {
  export type Params = {
    name?: string
  }

  export type DataApi = FormModel

  export type MetaApi = {
    count: number
    firstItemOnPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    isFirstPage: boolean
    isLastPage: boolean
    lastItemOnPage: number
    numberOfFirstItemOnPage: number
    numberOfLastItemOnPage: number
    page: number
    pageCount: number
    pageNumberIsGood: boolean
    pageSize: number
  }

  export type Response = {
    data: DataApi[]
    meta: MetaApi
    logged: boolean
  }
}
