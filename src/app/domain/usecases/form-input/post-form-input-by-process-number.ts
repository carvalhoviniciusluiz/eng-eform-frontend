export interface PostFormInputByProcessNumber {
  execute(
    input: PostFormInputByProcessNumber.Input
  ): Promise<PostFormInputByProcessNumber.Output>;
}

export namespace PostFormInputByProcessNumber {
  export type HttpResponse = void;
  export type Input = {
    processNumber: string;
    questions: any;
  };
  export type Output = void;
}
