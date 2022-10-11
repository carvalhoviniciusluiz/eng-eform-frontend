import { RemoteAddQuestion } from '~/app/application/usecases';
import { AddQuestion } from '~/app/domain/usecases';
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteAddQuestion = (
  formSlug: string,
  context?: any
): AddQuestion => {
  return new RemoteAddQuestion(
    `/v1/forms/${formSlug}/questions`,
    makeAuthorizedHttpPostClientDecorator(context)
  );
};
