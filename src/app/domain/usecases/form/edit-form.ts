export interface EditForm {
  edit: (id: string, params: EditForm.Params) => Promise<EditForm.Response>
}

export namespace EditForm {
  export type Params = {
    email: string
  }

  export type Response = {
    id: string
    email: string
    updatedAt: Date
  }
}
