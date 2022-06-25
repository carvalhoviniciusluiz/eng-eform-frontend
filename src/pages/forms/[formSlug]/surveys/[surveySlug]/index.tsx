import { LoadSubSurveys } from '~/app/domain/usecases';
import { makeSubSurveyList } from '~/app/main/factories/pages/sub-survey';
import { makeRemoteLoadSubSurveys } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<LoadSubSurveys.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const surveySlug = context.query.surveySlug as string;

    const loadSubSurveys = makeRemoteLoadSubSurveys(
      formSlug,
      surveySlug,
      context
    );
    const httpResponse = await loadSubSurveys.loadAll();

    const parentForm = httpResponse.form;
    const parentSurvey = httpResponse.parent;

    return {
      props: {
        ...httpResponse,
        parentForm,
        parentSurvey
      }
    };
  }
);

function SubSurveyPage(props: LoadSubSurveys.Props) {
  return <BaseLayout>{makeSubSurveyList({ ...props })}</BaseLayout>;
}

export default SubSurveyPage;
