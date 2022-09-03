import { parseCookies } from 'nookies';
import { GetForm } from '~/app/domain/usecases';
import { makePublicForm } from '~/app/main/factories/pages';
import { makeRemoteGetPublicForm } from '~/app/main/factories/usecases';
import handleSSRNeutral from '~/pages/_handles/handle-ssr-neutral';

export const getServerSideProps = handleSSRNeutral(async context => {
  const formSlug = context.query.formSlug as string;
  const getForm = makeRemoteGetPublicForm(context);
  const httpResponse = await getForm.get(formSlug);

  const cookieKey = 'eform:account';
  const cookies = parseCookies(context);
  const { [cookieKey]: cookie } = cookies;

  return {
    props: {
      data: httpResponse,
      formId: formSlug,
      logged: !!cookie
    }
  };
});

function MainFormPage(props: GetForm.Props) {
  return makePublicForm(props);
}

export default MainFormPage;
