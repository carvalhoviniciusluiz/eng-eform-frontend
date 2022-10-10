import { RemoteEditQuestion } from '~/app/application/usecases';
import { EditQuestion } from '~/app/domain/usecases';
import { makeAuthorizedHttpPatchClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteEditQuestion = (
  formSlug: string,
  context?: any
): EditQuestion => {
  return new RemoteEditQuestion(
    `/v1/forms/${formSlug}/questions`,
    makeAuthorizedHttpPatchClientDecorator(context)
  );
};
