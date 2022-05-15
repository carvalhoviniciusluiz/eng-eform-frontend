import { RemoteGetQuestion } from '~/app/application/usecases'
import { GetQuestion } from '~/app/domain/usecases'
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteGetQuestion = (
  surveySlug: string,
  context?: any
): GetQuestion => {
  return new RemoteGetQuestion(
    `/v1/surveys/${surveySlug}/questions`,
    makeAuthorizedHttpGetClientDecorator(context)
  )
}
