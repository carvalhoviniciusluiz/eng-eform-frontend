export interface AddForm {
  add: (params: AddForm.Params) => Promise<AddForm.Response>;
}

export namespace AddForm {
  export type Params = {
    segment: string;
    name: string;
  };

  export type Response = {
    id: string;
    name: string;
    updatedAt: Date;
  };
}
