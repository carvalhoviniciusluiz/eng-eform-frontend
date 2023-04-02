import { FormModel } from '~/app/domain/models';

export interface GetFormStats {
  get: (formId: string) => Promise<GetFormStats.Response>;
}

export namespace GetFormStats {
  export type ApiResponse = {
    data: {
      id: string;
      question: string;
      count: number;
      answer: string;
      date: Date;
    }[];
  };

  export type Response = ApiResponse & {
    form?: FormModel;
  };
}
