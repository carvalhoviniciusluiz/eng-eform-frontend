import { QuestionModel } from '~/app/domain/models';

export enum FormStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  REMOVED = 'REMOVED'
}

export type FormModel = {
  id: string;
  name: string;
  status: FormStatus;
  updatedAt: Date;
  questions: QuestionModel[];
};

export type FormModelWithoutQuestions = Omit<FormModel, 'questions'>;
