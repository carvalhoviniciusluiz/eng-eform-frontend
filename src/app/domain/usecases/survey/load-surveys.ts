import { FormModel } from '../../models'

export interface LoadSurveys {
  loadAll: (params?: LoadSurveys.Params) => Promise<LoadSurveys.Response>
}

export namespace LoadSurveys {
  export type Params = {
    name?: string
  }

  export type DataApi = {
    id: string
    name: string
    updatedAt: string
  }

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
  }

  export type Props = Response & {
    parentForm: FormModel
  }
}
