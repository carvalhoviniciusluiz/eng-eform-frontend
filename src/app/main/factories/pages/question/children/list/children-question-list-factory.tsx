import { LoadQuestions } from '~/app/domain/usecases';
import {
  makeRemoteDeleteQuestion,
  makeRemoteLoadQuestions
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { ChildrenQuestionListTag } from '~/app/presentation/pages';

export const makeQuestionChildrenList = (
  props: LoadQuestions.ChildrenProps
) => {
  return (
    <BaseLayout>
      <ChildrenQuestionListTag
        {...props}
        loadQuestions={makeRemoteLoadQuestions(props.form.id)}
        deleteQuestion={makeRemoteDeleteQuestion(props.form.id)}
      />
    </BaseLayout>
  );
};
