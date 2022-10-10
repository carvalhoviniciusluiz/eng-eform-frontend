import { EditQuestion } from '~/app/domain/usecases';
import {
  makeRemoteDeleteAnswer,
  makeRemoteEditQuestion
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { EditQuestionTag } from '~/app/presentation/pages';
import { makeEditQuestionValidation } from './edit-question-validation-factory';

export const makeEditQuestion = (props: EditQuestion.Props) => {
  return (
    <BaseLayout>
      <EditQuestionTag
        {...props}
        editQuestion={makeRemoteEditQuestion(props.form.id)}
        deleteAnswer={makeRemoteDeleteAnswer(props.question.id)}
        validation={makeEditQuestionValidation()}
      />
    </BaseLayout>
  );
};
