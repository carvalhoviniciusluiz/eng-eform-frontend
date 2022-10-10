import type { FormModel, QuestionModel } from '~/app/domain/models';

export interface GetForm {
  get: (id: string) => Promise<GetForm.Response>;
}

export namespace GetForm {
  export type Response = {
    form: FormModel;
    questions?: QuestionModel[];
  };

  export type Props = {
    data: Response;
    formId: string;
    logged: boolean;
  };
}
