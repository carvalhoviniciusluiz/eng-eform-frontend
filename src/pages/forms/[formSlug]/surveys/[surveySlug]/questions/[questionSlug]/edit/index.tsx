import { EditQuestion } from '~/app/domain/usecases'
import { makeEditQuestion } from '~/app/main/factories/pages'
import {
  makeRemoteGetForm,
  makeRemoteGetQuestion,
  makeRemoteGetSurvey
} from '~/app/main/factories/usecases'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth'

export const getServerSideProps = handleSSRAuth<EditQuestion.Props>(
  async (context) => {
    const formSlug = context.query.formSlug as string
    const surveySlug = context.query.surveySlug as string
    const questionSlug = context.query.questionSlug as string

    const getSurvey = makeRemoteGetSurvey(formSlug, context)
    const parentSurvey = await getSurvey.get(surveySlug)

    const getForm = makeRemoteGetForm(context)
    const parentForm = await getForm.get(formSlug)

    const getQuestion = makeRemoteGetQuestion(surveySlug, context)
    const data = await getQuestion.get(questionSlug)
    return {
      props: {
        data,
        parentForm,
        parentSurvey
      }
    }
  }
)

function EditQuestionPage(props: EditQuestion.Props) {
  return <BaseLayout>{makeEditQuestion({ ...props })}</BaseLayout>
}

export default EditQuestionPage
