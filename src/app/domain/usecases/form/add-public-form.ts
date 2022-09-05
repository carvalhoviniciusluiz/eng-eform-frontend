export interface AddPublicForm {
  add: (params: AddPublicForm.Params) => Promise<AddPublicForm.Response>;
}

export namespace AddPublicForm {
  export type Params = Array<{ [key: string]: string | string[] }>;

  export type Response = {};
}
