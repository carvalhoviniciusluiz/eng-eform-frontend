import { FormStatus, SurveyModel } from '~/app/domain/models';

export interface GetForm {
  get: (id: string) => Promise<GetForm.Response>;
}

export namespace GetForm {
  export type Response = {
    id: string;
    name: string;
    status: FormStatus;
    updatedAt: Date;
    surveys: SurveyModel[];
  };

  export type Props = {
    data: Response;
    formId: string;
    logged: boolean;
  };
}
