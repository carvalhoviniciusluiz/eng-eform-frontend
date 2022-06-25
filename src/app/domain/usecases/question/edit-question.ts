import { AnswerTypeEnum } from '~/app/domain/enums';
import { FormModel, SurveyModel, AnswerModel } from '~/app/domain/models';

export interface EditQuestion {
  edit: (
    id: string,
    params: EditQuestion.FormParams
  ) => Promise<EditQuestion.Response>;
}

export namespace EditQuestion {
  export type Props = {
    body: ApiResponseData;
    parentForm: FormModel;
    parentSurvey: SurveyModel;
  };

  export type FormParams = {
    content: string;
    answerType: AnswerTypeEnum;
    answers: AnswerApiResponseData[];
  };

  export type RequestParams = {
    content: string;
    answers: {
      type: AnswerTypeEnum;
      data: AnswerApiResponseData[];
    };
  };

  export type AnswerApiResponseData = {
    id?: string;
    content: string;
    updatedAt?: string;
  };

  export type ApiResponseData = {
    question: {
      id: string;
      type: string;
      content: string;
      updatedAt: Date;
    };
    answers: AnswerApiResponseData[];
  };

  export type Response = {
    question: {
      id: string;
      type: AnswerTypeEnum;
      content: string;
      updatedAt: Date;
    };
    answers: AnswerApiResponseData[];
  };
}
