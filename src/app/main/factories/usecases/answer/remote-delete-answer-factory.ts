import { RemoteDeleteAnswer } from '~/app/application/usecases'
import { DeleteAnswer } from '~/app/domain/usecases'
import { makeAuthorizedHttpDeleteClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteDeleteAnswer = (questionSlug: string): DeleteAnswer => {
  return new RemoteDeleteAnswer(
    `/v1/questions/${questionSlug}/answers`,
    makeAuthorizedHttpDeleteClientDecorator()
  )
}
