import { LoadQuestions } from '~/app/domain/usecases';
import { makeQuestionChildrenList } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetQuestion
} from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<LoadQuestions.ChildrenProps>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const questionSlug = context.query.questionSlug as string;
    const loadForm = makeRemoteGetForm(context);
    const { form } = await loadForm.get(formSlug);
    const loadQuestion = makeRemoteGetQuestion(formSlug, context);
    const { children, question } = await loadQuestion.get(questionSlug);

    return {
      props: {
        form,
        question,
        children
      }
    };
  }
);

function QuestionChildrenPage(props: LoadQuestions.ChildrenProps) {
  return makeQuestionChildrenList({ ...props });
}

export default QuestionChildrenPage;
