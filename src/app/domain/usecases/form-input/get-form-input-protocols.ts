export interface GetFormInputProtocols {
  execute: (
    input: GetFormInputProtocols.Input
  ) => Promise<GetFormInputProtocols.Output[]>;
}

export namespace GetFormInputProtocols {
  export type HttpResponse = {
    id: string;
    number: string;
  };
  export type Output = {
    id: string;
    number: string;
  };
  export type Input = void;
}
