import { LoadQuestions } from '~/app/domain/usecases';
import { makeQuestionList } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetSurvey,
  makeRemoteLoadQuestions
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<LoadQuestions.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const surveySlug = context.query.surveySlug as string;

    const loadForm = makeRemoteGetForm(context);
    const parentForm = await loadForm.get(formSlug);

    const loadSurvey = makeRemoteGetSurvey(formSlug, context);
    const parentSurvey = await loadSurvey.get(surveySlug);

    const loadQuestions = makeRemoteLoadQuestions(surveySlug, context);
    const httpResponse = await loadQuestions.loadAll();
    return {
      props: {
        ...httpResponse,
        parentForm,
        parentSurvey
      }
    };
  }
);

function EditQuestionPage(props: LoadQuestions.Props) {
  return <BaseLayout>{makeQuestionList({ ...props })}</BaseLayout>;
}

export default EditQuestionPage;
