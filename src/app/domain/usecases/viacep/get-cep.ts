export interface GetCep {
  get: (cep: string) => Promise<GetCep.Address>;
}

export namespace GetCep {
  export type Response = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  };
  export type Address = {
    id?: string;
    neighborhood: string;
    neighborhoodComplement: string;
    zipCode: string;
    ddd: string;
    city: string;
    number?: string;
    county: string;
    publicPlace: string;
  };
  export type Props = {
    data: Address;
  };
}
