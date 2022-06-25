import { FormStatus, FormModel, SurveyModel } from '~/app/domain/models';

export interface LoadSubSurveys {
  loadAll: (params?: LoadSubSurveys.Params) => Promise<LoadSubSurveys.Response>;
}

export namespace LoadSubSurveys {
  export type Params = {
    name?: string;
  };

  export type DataApi = {
    id: string;
    name: string;
    updatedAt: string;
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
    form: {
      id: string;
      name: string;
      status: FormStatus;
      updatedAt: Date;
    };
    parent: {
      id: string;
      name: string;
      updatedAt: Date;
    };
    data: DataApi[];
    meta: MetaApi;
  };

  export type Props = Response & {
    parentForm: FormModel;
    parentSurvey: SurveyModel;
  };
}
