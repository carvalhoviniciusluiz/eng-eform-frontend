import { AnswerModel } from '~/app/domain/models/answer.model';

export enum QuestionType {
  OBJECTIVE = 'OBJECTIVE',
  MULTIPLE = 'MULTIPLE',
  PLAIN_TEXT = 'PLAIN_TEXT'
}

export type QuestionModel = {
  id: string;
  content: string;
  updatedAt: Date;
  type: QuestionType;
  answers?: AnswerModel[];
  children?: QuestionModel[];
};
