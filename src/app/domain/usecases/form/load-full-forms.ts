export interface LoadFullForms {
  execute: (params?: LoadFullForms.Params) => Promise<LoadFullForms.Response>;
}

export namespace LoadFullForms {
  export type Author = {
    id: string;
    email: string;
    updatedAt: string;
  };
  export type Answer = {
    id: string;
    content: string;
    hasContent: boolean;
    isDefault: boolean;
    questionId: string;
    createdAt: string;
    updatedAt: string;
    deleted: string;
  };
  export type QuestionAnswer = {
    id: string;
    questionId: string;
    answer: {
      id: string;
      content: string;
      createdAt: string;
    };
    response: string;
    createdAt: string;
  };
  export type Question = {
    id: string;
    content: string;
    formId: string;
    parentId: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    deleted: string;
    answers: Answer[];
    children: Question[];
    questionAnswer: QuestionAnswer;
  };
  export type Form = {
    id: string;
    name: string;
    authorId: string;
    authorDraft: Author;
    segment: string;
    status: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    deleted: string;
    questions: Question[];
  };
  export type Params = {
    except?: string[];
    only?: string[];
  };
  export type Response = Form[];
}
