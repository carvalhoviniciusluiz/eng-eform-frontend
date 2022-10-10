import { EditForm } from '~/app/domain/usecases';
import { makeEditForm } from '~/app/main/factories/pages';
import { makeRemoteGetForm } from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<EditForm.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const getForm = makeRemoteGetForm(context);
    const httpResponse = await getForm.get(formSlug);

    return {
      props: {
        ...httpResponse,
        formId: formSlug
      }
    };
  }
);

function EditFormPage(props: EditForm.Props) {
  return makeEditForm({ ...props });
}

export default EditFormPage;
