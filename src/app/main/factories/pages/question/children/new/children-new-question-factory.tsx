import { AddQuestion } from '~/app/domain/usecases';
import { makeRemoteChildrenAddQuestion } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { ChildrenNewQuestionTag } from '~/app/presentation/pages';
import { makeChildrenNewQuestionValidation } from './children-new-question-validation-factory';

export const makeChildrenNewQuestion = (props: AddQuestion.ChildrenProps) => {
  return (
    <BaseLayout>
      <ChildrenNewQuestionTag
        {...props}
        addQuestion={makeRemoteChildrenAddQuestion(
          props.form.id,
          props.question.id
        )}
        validation={makeChildrenNewQuestionValidation()}
      />
    </BaseLayout>
  );
};
