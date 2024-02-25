export interface GetPerson {
  execute: (params: GetPerson.Input) => Promise<GetPerson.Output>;
}
export namespace GetPerson {
  export type Response = {
    id: string;
    name: string;
    socialName: String;
    birthDate: string;
  };
  export type Input = { name: string };
  export type Output = {
    id: string;
    name: string;
    socialName: String;
    birthDate: string;
  };
}
