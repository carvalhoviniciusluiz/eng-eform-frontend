export interface AddForm {
  add: (params: AddForm.Params) => Promise<AddForm.Response>
}

export namespace AddForm {
  export type Params = {
    name: string
  }

  export type Response = {
    id: string
    name: string
    updatedAt: Date
  }
}
