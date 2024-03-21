import { GetFormByProcessNumber } from '~/app/domain/usecases';
import { makeFormInput } from '~/app/main/factories/pages';
import {
  makeRemoteGetFormByProcessNumber,
  makeRemoteLoadFullForms
} from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth(async context => {
  const processNumber = context.query.processNumber as string;
  const getFormByProcessNumber = makeRemoteGetFormByProcessNumber(context);
  const formInputResponse = await getFormByProcessNumber.execute({
    processNumber
  });
  const loadForms = makeRemoteLoadFullForms(context);
  const formResponse = await loadForms.execute({
    only: ['64f9e7dd-de6d-400b-877c-252c965c0f12']
  });
  return {
    props: {
      ticket: formInputResponse,
      forms: formResponse
    }
  };
});

type Props = {
  ticket: GetFormByProcessNumber.Output;
  forms: GetFormByProcessNumber.Form[];
};

function ProcessNumberPage(props: Props) {
  return makeFormInput(props);
}

export default ProcessNumberPage;
