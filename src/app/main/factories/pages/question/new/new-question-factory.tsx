import { AddQuestion } from '~/app/domain/usecases';
import { makeRemoteAddQuestion } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { NewQuestionTag } from '~/app/presentation/pages';
import { makeNewQuestionValidation } from './new-question-validation-factory';

export const makeNewQuestion = (props: AddQuestion.Props) => {
  return (
    <BaseLayout>
      <NewQuestionTag
        {...props}
        addQuestion={makeRemoteAddQuestion(props.form.id)}
        validation={makeNewQuestionValidation()}
      />
    </BaseLayout>
  );
};
