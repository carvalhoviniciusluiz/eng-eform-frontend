import { makeNewForm } from '~/app/main/factories/pages';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth(async () => {
  return {
    props: {}
  };
});

function NewFormPage() {
  return makeNewForm();
}

export default NewFormPage;
