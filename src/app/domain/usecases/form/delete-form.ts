export interface DeleteForm {
  delete: (id: string) => Promise<DeleteForm.Response>
}

export namespace DeleteForm {
  export type Response = {}
}
