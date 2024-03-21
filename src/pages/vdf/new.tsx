import { LoadFullForms } from '~/app/domain/usecases';
import { makeNewDomesticViolence } from '~/app/main/factories/pages/domestic-violence/new';
import { makeRemoteLoadFullForms } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

// const IGNORE_IDS = [
//   'f594187f-504c-4266-b313-6d1fb19bb197',
//   '64f9e7dd-de6d-400b-877c-252c965c0f12'
// ];

export const getServerSideProps = handleSSRAuth(async context => {
  const loadForms = makeRemoteLoadFullForms(context);
  const httpResponse = await loadForms.execute({
    // except: IGNORE_IDS
  });
  return {
    props: {
      data: httpResponse
    }
  };
});

function DomesticViolenceForm(props: { data: LoadFullForms.Response }) {
  return makeNewDomesticViolence({ ...props });
}

export default DomesticViolenceForm;
