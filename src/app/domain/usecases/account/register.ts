export interface Register {
  signUp: (params: Register.Params) => Promise<Register.Response>;
}

export namespace Register {
  export type Params = {
    name: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  };

  export type Response = {};
}
