import { GetFormStats } from '~/app/domain/usecases';
import { makeFormStats } from '~/app/main/factories/pages';
import {
  makeRemoteGetForm,
  makeRemoteGetFormStats
} from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<GetFormStats.Response>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const getForm = makeRemoteGetForm(context);
    const getFormStats = makeRemoteGetFormStats(context);
    const httpFormResponse = await getForm.get(formSlug, false);
    const httpFormStatsResponse = await getFormStats.get(formSlug);
    return {
      props: {
        ...httpFormStatsResponse,
        form: httpFormResponse.form
      }
    };
  }
);

function FormStatsPage(props: GetFormStats.Response) {
  return makeFormStats(props);
}

export default FormStatsPage;
