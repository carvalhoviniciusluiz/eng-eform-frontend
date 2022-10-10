import { AddQuestion } from '~/app/domain/usecases';
import { makeNewQuestion } from '~/app/main/factories/pages';
import { makeRemoteGetForm } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<AddQuestion.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const loadForm = makeRemoteGetForm(context);
    const httpResponse = await loadForm.get(formSlug);

    return {
      props: httpResponse
    };
  }
);

function NewQuestionPage(props: AddQuestion.Props) {
  return makeNewQuestion({ ...props });
}

export default NewQuestionPage;
