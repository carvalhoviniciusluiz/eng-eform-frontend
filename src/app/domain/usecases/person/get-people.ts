export interface GetPeople {
  execute: (input: GetPeople.Input) => Promise<GetPeople.Output[]>;
}

export namespace GetPeople {
  export type HttpResponse = {
    id: string;
    name: string;
  };
  export type Output = {
    id: string;
    name: string;
  };
  export type Input = {
    personType: 'VICTIM' | 'AGGRESSOR';
  };
}
