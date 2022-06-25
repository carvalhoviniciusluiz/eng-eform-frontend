import { LoadQuestions } from '~/app/domain/usecases';
import {
  makeRemoteDeleteQuestion,
  makeRemoteLoadQuestions
} from '~/app/main/factories/usecases';
import { QuestionListTag } from '~/app/presentation/pages';

export const makeQuestionList = (props: LoadQuestions.Props) => {
  return (
    <QuestionListTag
      {...props}
      loadQuestions={makeRemoteLoadQuestions(props.parentSurvey.id)}
      deleteQuestion={makeRemoteDeleteQuestion(props.parentSurvey.id)}
    />
  );
};
