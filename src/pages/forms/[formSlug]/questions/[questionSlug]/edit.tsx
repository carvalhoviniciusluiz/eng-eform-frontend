import { EditQuestion } from '~/app/domain/usecases';
import { makeEditQuestion } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetQuestion
} from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<EditQuestion.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const questionSlug = context.query.questionSlug as string;
    const getForm = makeRemoteGetForm(context);
    const httpFormResponse = await getForm.get(formSlug);
    const getQuestion = makeRemoteGetQuestion(formSlug, context);
    const httpQuestionResponse = await getQuestion.get(questionSlug);
    return {
      props: {
        question: httpQuestionResponse.question,
        answers: httpQuestionResponse.answers,
        form: httpFormResponse.form
      }
    };
  }
);

function EditQuestionPage(props: EditQuestion.Props) {
  return makeEditQuestion({ ...props });
}

export default EditQuestionPage;
