import { RemoteLoadQuestions } from '~/app/application/usecases';
import { LoadQuestions } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteLoadQuestions = (
  formSlug: string,
  context?: any
): LoadQuestions => {
  return new RemoteLoadQuestions(
    `/v1/forms/${formSlug}`,
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
