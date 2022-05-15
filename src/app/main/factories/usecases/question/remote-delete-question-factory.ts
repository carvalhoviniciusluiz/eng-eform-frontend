import { RemoteDeleteQuestion } from '~/app/application/usecases'
import { DeleteQuestion } from '~/app/domain/usecases'
import { makeAuthorizedHttpDeleteClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteDeleteQuestion = (
  surveySlug: string
): DeleteQuestion => {
  return new RemoteDeleteQuestion(
    `/v1/surveys/${surveySlug}/questions`,
    makeAuthorizedHttpDeleteClientDecorator()
  )
}
