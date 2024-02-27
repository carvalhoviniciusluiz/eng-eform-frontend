import { makeListDomesticViolence } from '~/app/main/factories/pages';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth(async context => {
  return {
    props: {
      data: {}
    }
  };
});

function DomesticViolenceForm(props: { data: any }) {
  return makeListDomesticViolence(props);
}

export default DomesticViolenceForm;
