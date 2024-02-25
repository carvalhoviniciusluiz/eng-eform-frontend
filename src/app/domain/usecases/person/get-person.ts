export interface GetPerson {
  execute: (params: GetPerson.Input) => Promise<GetPerson.Output>;
}
export namespace GetPerson {
  export type Person = {
    id: string;
    name: string;
    socialName: string;
    birthDate?: string;
  };
  export type Question = {
    [key: string]:
      | string
      | {
          [key: string]: string;
        };
    metadata: {
      personQuestionAnswerId: string;
      questionAnswerId: string;
    };
  };
  export type Response = {
    person: Person;
    adresses: {
      id: string;
      number: string;
      zipCode: string;
      publicPlace: string;
      neighborhood: string;
      neighborhoodComplement: string;
      county: string;
      city: string;
    }[];
    documents: {
      id: string;
      documentType: string;
      documentNumber: string;
      shippingDate?: string;
    }[];
    contacts: {
      id: string;
      contactType: string;
      contact: string;
    }[];
    questions: Question[];
  };
  export type Input = { name: string };
  export type Output = Response[];
}
