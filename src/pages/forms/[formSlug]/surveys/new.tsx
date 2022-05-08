import { makeNewSurvey, NewSurveyProps } from '~/app/main/factories/pages'
import { makeRemoteGetForm } from '~/app/main/factories/usecases'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth'

export const getServerSideProps = handleSSRAuth(async (context) => {
  const formSlug = context.query.formSlug as string
  const loadForm = makeRemoteGetForm(context)
  const parentForm = await loadForm.get(formSlug)
  return {
    props: {
      formSlug,
      parentForm
    }
  }
})

function NewSurveyPage(props: NewSurveyProps) {
  return <BaseLayout>{makeNewSurvey({ ...props })}</BaseLayout>
}

export default NewSurveyPage
