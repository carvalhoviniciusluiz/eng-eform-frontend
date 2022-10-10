import { RemoteDeleteQuestion } from '~/app/application/usecases';
import { DeleteQuestion } from '~/app/domain/usecases';
import { makeAuthorizedHttpDeleteClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteDeleteQuestion = (formSlug: string): DeleteQuestion => {
  return new RemoteDeleteQuestion(
    `/v1/forms/${formSlug}/questions`,
    makeAuthorizedHttpDeleteClientDecorator()
  );
};
