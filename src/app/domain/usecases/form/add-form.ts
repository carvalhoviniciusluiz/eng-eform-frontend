export interface AddForm {
  add: (params: AddForm.Params) => Promise<AddForm.Response>
}

export namespace AddForm {
  export type Params = {
    email: string
  }

  export type Response = {
    id: string
    email: string
    updatedAt: Date
  }
}
