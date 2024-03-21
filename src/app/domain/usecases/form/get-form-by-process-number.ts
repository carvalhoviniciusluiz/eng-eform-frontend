export interface GetFormByProcessNumber {
  execute(
    input: GetFormByProcessNumber.Input
  ): Promise<GetFormByProcessNumber.Output>;
}

export namespace GetFormByProcessNumber {
  export type PersonType = 'VICTIM' | 'AGGRESSOR';
  export type Person = {
    personType: PersonType;
    person: {
      id: string;
      name: string;
    };
  };
  export type HttpResponse = {
    user: {
      email: string;
      username: string;
      company: {
        name: string;
        initials: string;
        code: string;
      };
    };
    input: {
      id: string;
      number: string;
      createdAt: string;
      details: Person[];
    };
  };
  export type Input = {
    processNumber: string;
  };
  export type Output = {
    user: {
      email: string;
      username: string;
      company: {
        name: string;
        initials: string;
        code: string;
      };
    };
    input: {
      id: string;
      number: string;
      createdDateTime: {
        dateLong: string;
        timeLong: string;
      };
    };
    victim: Person;
    aggressor: Person;
  };
}
