export interface GetForm {
  get: (id: string) => Promise<GetForm.Response>
}

export namespace GetForm {
  export type Response = {
    id: string
    name: string
    updatedAt: Date
  }
}
