import { AddQuestion } from '~/app/domain/usecases';
import { makeChildrenNewQuestion } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetQuestion
} from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<AddQuestion.Props>(
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
        form: httpFormResponse.form
      }
    };
  }
);

function NewQuestionChildrenPage(props: AddQuestion.ChildrenProps) {
  return makeChildrenNewQuestion({ ...props });
}

export default NewQuestionChildrenPage;
