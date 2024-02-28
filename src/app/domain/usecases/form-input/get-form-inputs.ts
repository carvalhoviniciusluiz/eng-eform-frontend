export interface GetFormInputs {
  execute: (input: GetFormInputs.Input) => Promise<GetFormInputs.Output[]>;
}

export namespace GetFormInputs {
  export type HttpResponse = {
    id: string;
    number: string;
    details: {
      personType: 'VICTIM' | 'AGGRESSOR';
      person: {
        id: string;
        name: string;
      };
    }[];
  };
  export type Output = {
    id: string;
    number: string;
    details: {
      personType: 'VICTIM' | 'AGGRESSOR';
      person: {
        id: string;
        name: string;
      };
    }[];
  };
  export type Input = {
    victimId?: string;
    aggressorId?: string;
    protocolNumber?: string;
  };
}
