export interface GetFormByProcessNumber {
  execute(
    input: GetFormByProcessNumber.Input
  ): Promise<GetFormByProcessNumber.Output>;
}

export namespace GetFormByProcessNumber {
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
  export type PersonType = 'VICTIM' | 'AGGRESSOR';
  export type Person = {
    personType: PersonType;
    person: {
      id: string;
      name: string;
    };
  };
  export type HttpResponse = {
    user: {
      email: string;
      username: string;
      company: {
        name: string;
        initials: string;
        code: string;
      };
    };
    input: {
      id: string;
      number: string;
      createdAt: string;
      details: Person[];
    };
  };
  export type Input = {
    processNumber: string;
  };
  export type Output = {
    user: {
      email: string;
      username: string;
      company: {
        name: string;
        initials: string;
        code: string;
      };
    };
    input: {
      id: string;
      number: string;
      createdDateTime: {
        dateLong: string;
        timeLong: string;
      };
    };
    victim: Person;
    aggressor: Person;
  };
}
