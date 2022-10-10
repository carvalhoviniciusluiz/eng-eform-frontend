import type {
  FormModelWithoutQuestions,
  QuestionModel
} from '~/app/domain/models';

export interface LoadQuestions {
  loadAll: (params?: LoadQuestions.Params) => Promise<LoadQuestions.Response>;
}

export namespace LoadQuestions {
  export type Params = {
    content?: string;
  };

  export type DataApi = {
    id: string;
    content: string;
    updatedAt: string;
  };

  export type QuestionDataApi = {
    id: string;
    content: string;
    type: string;
    updatedAt: Date;
  };

  export type MetaApi = {
    count: number;
    firstItemOnPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    lastItemOnPage: number;
    numberOfFirstItemOnPage: number;
    numberOfLastItemOnPage: number;
    page: number;
    pageCount: number;
    pageNumberIsGood: boolean;
    pageSize: number;
  };

  export type Response = {
    data: DataApi[];
    meta: MetaApi;
  };

  export type Props = {
    form: FormModelWithoutQuestions;
    questions?: QuestionModel[];
  };

  export type ChildrenProps = {
    form: FormModelWithoutQuestions;
    question: QuestionModel;
    children: QuestionDataApi[];
  };
}
