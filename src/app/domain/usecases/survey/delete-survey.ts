export interface DeleteSurvey {
  delete: (id: string) => Promise<DeleteSurvey.Response>
}

export namespace DeleteSurvey {
  export type Response = {}
}
