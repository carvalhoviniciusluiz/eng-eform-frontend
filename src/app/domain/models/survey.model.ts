import { QuestionModel } from '~/app/domain/models/question.model';

export type SurveyModel = {
  id: string;
  name: string;
  updatedAt: Date;
  questions?: QuestionModel[];
};
