import {
  EditFormProps,
  makeEditForm
} from '~/app/main/factories/pages/form/edit'
import { makeRemoteGetForm } from '~/app/main/factories/usecases'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth'

export const getServerSideProps = handleSSRAuth<EditFormProps>(
  async (context) => {
    const formId = context.query.id as string
    const getForm = makeRemoteGetForm(context)
    const httpResponse = await getForm.get(formId)
    return {
      props: {
        data: httpResponse,
        formId
      }
    }
  }
)

function EditFormPage(props: EditFormProps) {
  return <BaseLayout>{makeEditForm({ ...props })}</BaseLayout>
}

export default EditFormPage
