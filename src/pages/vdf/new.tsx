import { LoadFullForms } from '~/app/domain/usecases';
import { makeNewDomesticViolence } from '~/app/main/factories/pages/domestic-violence/new';
import { makeRemoteLoadFullForms } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth(async context => {
  const loadForms = makeRemoteLoadFullForms(context);
  const httpResponse = await loadForms.execute();
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
