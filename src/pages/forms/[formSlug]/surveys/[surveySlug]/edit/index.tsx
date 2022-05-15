import { EditSurvey } from '~/app/domain/usecases'
import { makeEditSurvey } from '~/app/main/factories/pages'
import {
  makeRemoteGetForm,
  makeRemoteGetSurvey
} from '~/app/main/factories/usecases'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth'

export const getServerSideProps = handleSSRAuth<EditSurvey.Props>(
  async (context) => {
    const formSlug = context.query.formSlug as string
    const surveySlug = context.query.surveySlug as string
    const getSyrvey = makeRemoteGetSurvey(formSlug, context)
    const httpSurveyResponse = await getSyrvey.get(surveySlug)
    const getForm = makeRemoteGetForm(context)
    const httpFormResponse = await getForm.get(formSlug)
    return {
      props: {
        data: httpSurveyResponse,
        parentForm: httpFormResponse
      }
    }
  }
)

function EditSurveyPage(props: EditSurvey.Props) {
  return <BaseLayout>{makeEditSurvey({ ...props })}</BaseLayout>
}

export default EditSurveyPage
