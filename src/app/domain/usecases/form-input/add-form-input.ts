export interface AddFormInput {
  execute: (params: AddFormInput.Input) => Promise<AddFormInput.Output>;
}

export namespace AddFormInput {
  export type Response = {
    protocolNumber: string;
    companyCurrent: {
      name: string;
      initials: string;
      code: string;
    };
    receptionist: {
      username: string;
      email: string;
    };
    createdAt: string;
  };
  export type Input = void;
  export type Output = {
    protocolNumber: string;
    companyCurrent: {
      name: string;
      initials: string;
      code: string;
    };
    receptionist: {
      username: string;
      email: string;
    };
    createdDateTime: {
      dateLong: string;
      timeLong: string;
    };
  };
}
