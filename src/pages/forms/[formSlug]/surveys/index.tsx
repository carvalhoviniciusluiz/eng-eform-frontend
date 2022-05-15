import { LoadSurveys } from '~/app/domain/usecases'
import { makeSurveyList } from '~/app/main/factories/pages'
import {
  makeRemoteGetForm,
  makeRemoteLoadSurveys
} from '~/app/main/factories/usecases'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth'

export const getServerSideProps = handleSSRAuth<LoadSurveys.Props>(
  async (context) => {
    const formSlug = context.query.formSlug as string
    const loadSurveys = makeRemoteLoadSurveys(formSlug, context)
    const httpResponse = await loadSurveys.loadAll()
    const loadForm = makeRemoteGetForm(context)
    const parentForm = await loadForm.get(formSlug)
    return {
      props: {
        ...httpResponse,
        parentForm
      }
    }
  }
)

function EditSurveyPage(props: LoadSurveys.Props) {
  return <BaseLayout>{makeSurveyList({ ...props })}</BaseLayout>
}

export default EditSurveyPage
