export interface AddFormInput {
  execute: (params: AddFormInput.Input) => Promise<AddFormInput.Output>;
}

export namespace AddFormInput {
  export type Response = void;
  export type Input = void;
  export type Output = void;
}
