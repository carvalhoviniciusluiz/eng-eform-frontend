import { AddQuestion } from '~/app/domain/usecases';
import { makeNewQuestion } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetSurvey
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<AddQuestion.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const surveySlug = context.query.surveySlug as string;

    const loadForm = makeRemoteGetForm(context);
    const parentForm = await loadForm.get(formSlug);

    const loadSurvey = makeRemoteGetSurvey(formSlug, context);
    const parentSurvey = await loadSurvey.get(surveySlug);
    return {
      props: {
        parentForm,
        parentSurvey
      }
    };
  }
);

function NewQuestionPage(props: AddQuestion.Props) {
  return <BaseLayout>{makeNewQuestion({ ...props })}</BaseLayout>;
}

export default NewQuestionPage;
