import { parseCookies } from 'nookies';
import { LoadForms } from '~/app/domain/usecases';
import { makePublicForms } from '~/app/main/factories/pages';
import { makeRemoteLoadPublicForms } from '~/app/main/factories/usecases';
import handleSSRNeutral from '~/pages/_handles/handle-ssr-neutral';

export const getServerSideProps = handleSSRNeutral<LoadForms.Response>(
  async context => {
    const loadForms = makeRemoteLoadPublicForms(context);
    const httpResponse = await loadForms.loadAll({ orderBy: 'updatedAt.desc' });

    const cookieKey = 'eform:account';
    const cookies = parseCookies(context);
    const { [cookieKey]: cookie } = cookies;

    return {
      props: {
        ...httpResponse,
        logged: !!cookie
      }
    };
  }
);

function PublicFormsPage(props: LoadForms.Response) {
  return makePublicForms({ ...props });
}

export default PublicFormsPage;
