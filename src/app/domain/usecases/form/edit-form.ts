export interface EditForm {
  edit: (id: string, params: EditForm.Params) => Promise<EditForm.Response>
}

export namespace EditForm {
  export type Params = {
    name: string
  }

  export type Response = {
    id: string
    name: string
    updatedAt: Date
  }
}
