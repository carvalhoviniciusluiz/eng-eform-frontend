export interface GetPerson {
  execute: (params: GetPerson.Input) => Promise<GetPerson.Output>;
}
export namespace GetPerson {
  export type Response = {
    person: {
      id: string;
      name: string;
      socialName: String;
      birthDate?: string;
    };
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
    personalData: {
      questionAnswer: {
        id: string;
        response: string;
        question: {
          id: string;
          content: string;
        };
        answer: {
          id?: string;
          content?: string;
        };
      };
    }[];
  };
  export type Input = { name: string };
  export type Output = Response;
}
