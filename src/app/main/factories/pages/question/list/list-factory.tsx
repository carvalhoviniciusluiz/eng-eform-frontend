import { LoadQuestions } from '~/app/domain/usecases';
import {
  makeRemoteDeleteQuestion,
  makeRemoteLoadQuestions
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { QuestionListTag } from '~/app/presentation/pages';

export const makeQuestionList = (props: LoadQuestions.Props) => {
  return (
    <BaseLayout>
      <QuestionListTag
        {...props}
        loadQuestions={makeRemoteLoadQuestions(props.form.id)}
        deleteQuestion={makeRemoteDeleteQuestion(props.form.id)}
      />
    </BaseLayout>
  );
};
