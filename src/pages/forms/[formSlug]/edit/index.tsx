import { EditForm } from '~/app/domain/usecases';
import { makeEditForm } from '~/app/main/factories/pages';
import { makeRemoteGetForm } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth<EditForm.Props>(
  async context => {
    const formSlug = context.query.formSlug as string;
    const getForm = makeRemoteGetForm(context);
    const httpResponse = await getForm.get(formSlug);
    return {
      props: {
        data: httpResponse,
        formId: formSlug
      }
    };
  }
);

function EditFormPage(props: EditForm.Props) {
  return <BaseLayout>{makeEditForm({ ...props })}</BaseLayout>;
}

export default EditFormPage;
