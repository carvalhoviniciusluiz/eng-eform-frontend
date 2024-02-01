import { QuestionModel } from '~/app/domain/models';

export interface GetQuestion {
  get: (id: string) => Promise<GetQuestion.Response>;
}

export namespace GetQuestion {
  export type AnswerApiResponseData = {
    id: string;
    content: string;
    hasContent: boolean;
    isDefault: boolean;
    updatedAt: string;
  };

  export type AnswerApiProps = {
    id: string;
    content: string;
    updatedAt: Date;
  };

  export type QuestionApiProps = {
    id: string;
    content: string;
    type: string;
    updatedAt: Date;
  };

  export type Response = {
    question: QuestionModel;
    answers: AnswerApiResponseData[];
    children: QuestionApiProps[];
  };
}
