export interface GetQuestion {
  get: (id: string) => Promise<GetQuestion.Response>
}

export namespace GetQuestion {
  export type Response = {
    id: string
    content: string
    updatedAt: Date
  }
}
