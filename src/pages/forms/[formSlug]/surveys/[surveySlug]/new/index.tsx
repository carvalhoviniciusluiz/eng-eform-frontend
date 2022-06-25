import { AddSubSurvey } from '~/app/domain/usecases';
import { makeNewSubSurvey } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetSurvey
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<AddSubSurvey.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const surveySlug = context.query.surveySlug as string;

    const loadForm = makeRemoteGetForm(context);
    const httpFormResponse = await loadForm.get(formSlug);

    const loadSurvey = makeRemoteGetSurvey(formSlug, context);
    const httpSurveyResponse = await loadSurvey.get(surveySlug);

    return {
      props: {
        parentForm: httpFormResponse,
        parentSurvey: httpSurveyResponse
      }
    };
  }
);

function NewSubSurveyPage(props: AddSubSurvey.Props) {
  return <BaseLayout>{makeNewSubSurvey({ ...props })}</BaseLayout>;
}

export default NewSubSurveyPage;
