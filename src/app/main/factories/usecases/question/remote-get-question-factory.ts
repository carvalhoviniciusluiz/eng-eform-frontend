import { RemoteGetQuestion } from '~/app/application/usecases';
import { GetQuestion } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetQuestion = (
  formSlug: string,
  context?: any
): GetQuestion => {
  return new RemoteGetQuestion(
    `/v1/forms/${formSlug}/questions`,
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
