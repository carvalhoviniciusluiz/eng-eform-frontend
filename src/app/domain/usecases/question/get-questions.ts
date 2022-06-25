export interface GetQuestion {
  get: (id: string) => Promise<GetQuestion.Response>;
}

export namespace GetQuestion {
  export type AnswerApiResponseData = {
    id: string;
    content: string;
    updatedAt: string;
  };

  export type Response = {
    question: {
      id: string;
      type: string;
      content: string;
      updatedAt: Date;
    };
    answers: AnswerApiResponseData[];
  };
}
