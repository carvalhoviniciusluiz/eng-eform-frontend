export interface LoadSurveys {
  loadAll: (params?: LoadSurveys.Params) => Promise<LoadSurveys.Response>
}

export namespace LoadSurveys {
  export type Params = {
    name?: string
  }

  export type SurveyResponse = {
    id: string
    name: string
    updatedAt: string
  }

  export type Response = {
    data: SurveyResponse[]
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
