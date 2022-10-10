import { LoadForms } from '~/app/domain/usecases';
import { makeFormList } from '~/app/main/factories/pages/form/list/list-factory';
import { makeRemoteLoadForms } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<LoadForms.Response>(
  async context => {
    const loadForms = makeRemoteLoadForms(context);
    const httpResponse = await loadForms.loadAll({ orderBy: 'updatedAt.desc' });

    return {
      props: httpResponse
    };
  }
);

function FormListPage(props: LoadForms.Response) {
  return makeFormList({ ...props });
}

export default FormListPage;
