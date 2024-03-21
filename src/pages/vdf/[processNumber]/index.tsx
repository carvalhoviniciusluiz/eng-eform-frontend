import { GetFormByProcessNumber } from '~/app/domain/usecases';
import { makeFormInput } from '~/app/main/factories/pages';
import { makeRemoteGetFormByProcessNumber } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth(async context => {
  const processNumber = context.query.processNumber as string;
  const getFormByProcessNumber = makeRemoteGetFormByProcessNumber(context);
  const response = await getFormByProcessNumber.execute({
    processNumber
  });
  return {
    props: response
  };
});

function ProcessNumberPage(props: GetFormByProcessNumber.Output) {
  return makeFormInput(props);
}

export default ProcessNumberPage;
