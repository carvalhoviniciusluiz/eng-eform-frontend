import { LoadQuestions } from '~/app/domain/usecases';
import { makeQuestionList } from '~/app/main/factories/pages';
import { makeRemoteGetForm } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<LoadQuestions.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const loadForm = makeRemoteGetForm(context);
    const httpResponse = await loadForm.get(formSlug);

    return {
      props: httpResponse
    };
  }
);

function QuestionsPage(props: LoadQuestions.Props) {
  return makeQuestionList({ ...props });
}

export default QuestionsPage;
