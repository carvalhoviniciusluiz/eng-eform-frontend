import { makeLogin } from '~/app/main/factories/pages';
import handleSSRGuest from '~/pages/_handles/handle-ssr-guest';

export const getServerSideProps = handleSSRGuest(async () => {
  return {
    props: {}
  };
});

function LoginPage() {
  return makeLogin();
}

export default LoginPage;
