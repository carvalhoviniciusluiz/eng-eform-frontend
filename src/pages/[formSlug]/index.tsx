import { GetForm } from '~/app/domain/usecases';
import { makeRemoteGetPublicForm } from '~/app/main/factories/usecases';
import handleSSRNeutral from '~/pages/_handles/handle-ssr-neutral';

export const getServerSideProps = handleSSRNeutral(async context => {
  const formSlug = context.query.formSlug as string;
  const getForm = makeRemoteGetPublicForm(context);
  const httpResponse = await getForm.get(formSlug);

  return {
    props: {
      data: httpResponse,
      formId: formSlug
    }
  };
});

function MainFormPage(props: GetForm.Props) {
  return <h1>hello</h1>;
}

export default MainFormPage;
