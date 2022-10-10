import { FormModel, QuestionModel } from '~/app/domain/models';

export interface EditForm {
  edit: (id: string, params: EditForm.Params) => Promise<EditForm.Response>;
}

export namespace EditForm {
  export type Params = {
    name: string;
  };

  export type Response = {
    id: string;
    name: string;
    updatedAt: Date;
  };

  export type Props = {
    form: FormModel;
    questions?: QuestionModel[];
    formId: string;
  };
}
