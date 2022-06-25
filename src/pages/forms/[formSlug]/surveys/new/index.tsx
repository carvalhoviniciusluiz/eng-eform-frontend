import { AddSurvey } from '~/app/domain/usecases';
import { makeNewSurvey } from '~/app/main/factories/pages';
import { makeRemoteGetForm } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<AddSurvey.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const loadForm = makeRemoteGetForm(context);
    const httpFormResponse = await loadForm.get(formSlug);
    return {
      props: {
        parentForm: httpFormResponse
      }
    };
  }
);

function NewSurveyPage(props: AddSurvey.Props) {
  return <BaseLayout>{makeNewSurvey({ ...props })}</BaseLayout>;
}

export default NewSurveyPage;
