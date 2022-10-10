import { makeRegister } from '~/app/main/factories/pages';
import handleSSRGuest from '~/pages/_handles/handle-ssr-guest';

export const getServerSideProps = handleSSRGuest(async () => {
  return {
    props: {}
  };
});

function RegisterPage() {
  return makeRegister();
}

export default RegisterPage;
