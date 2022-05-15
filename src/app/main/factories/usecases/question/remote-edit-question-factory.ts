import { RemoteEditQuestion } from '~/app/application/usecases'
import { EditQuestion } from '~/app/domain/usecases'
import { makeAuthorizedHttpPatchClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteEditQuestion = (
  surveySlug: string,
  context?: any
): EditQuestion => {
  return new RemoteEditQuestion(
    `/v1/surveys/${surveySlug}/questions`,
    makeAuthorizedHttpPatchClientDecorator(context)
  )
}
