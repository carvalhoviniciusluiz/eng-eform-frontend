import { EditQuestion } from '~/app/domain/usecases';
import {
  makeRemoteEditQuestion,
  makeRemoteDeleteAnswer
} from '~/app/main/factories/usecases';
import { EditQuestionTag } from '~/app/presentation/pages';
import { makeEditQuestionValidation } from './edit-question-validation-factory';

export const makeEditQuestion = (props: EditQuestion.Props) => {
  return (
    <EditQuestionTag
      {...props}
      editQuestion={makeRemoteEditQuestion(props.parentSurvey.id)}
      deleteAnswer={makeRemoteDeleteAnswer(props.body.question.id)} // <--
      validation={makeEditQuestionValidation()}
    />
  );
};
