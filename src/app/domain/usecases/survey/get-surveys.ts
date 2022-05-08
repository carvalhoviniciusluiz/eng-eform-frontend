export interface GetSurvey {
  get: (id: string) => Promise<GetSurvey.Response>
}

export namespace GetSurvey {
  export type Response = {
    id: string
    name: string
    updatedAt: Date
  }
}
