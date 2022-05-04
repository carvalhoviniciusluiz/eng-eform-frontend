export interface LoadForms {
  loadAll: (params?: LoadForms.Params) => Promise<LoadForms.Response>
}

export namespace LoadForms {
  export type Params = {
    name?: string
  }

  export type FormResponse = {
    id: string
    name: string
    updatedAt: string
  }

  export type Response = {
    data: FormResponse[]
    meta: {
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
  }
}
