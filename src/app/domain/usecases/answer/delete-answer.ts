export interface DeleteAnswer {
  delete: (id: string) => Promise<DeleteAnswer.Response>
}

export namespace DeleteAnswer {
  export type Response = {}
}
