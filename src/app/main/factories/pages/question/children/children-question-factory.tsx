import { LoadQuestions } from '~/app/domain/usecases';
import {
  makeRemoteDeleteQuestion,
  makeRemoteLoadQuestions
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { QuestionChildrenListTag } from '~/app/presentation/pages';

export const makeQuestionChildrenList = (
  props: LoadQuestions.ChildrenProps
) => {
  return (
    <BaseLayout>
      <QuestionChildrenListTag
        {...props}
        loadQuestions={makeRemoteLoadQuestions(props.form.id)}
        deleteQuestion={makeRemoteDeleteQuestion(props.form.id)}
      />
    </BaseLayout>
  );
};
