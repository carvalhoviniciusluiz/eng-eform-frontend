import { RemoteLoadQuestions } from '~/app/application/usecases';
import { LoadQuestions } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteLoadQuestions = (
  surveySlug: string,
  context?: any
): LoadQuestions => {
  return new RemoteLoadQuestions(
    `/v1/surveys/${surveySlug}/questions`,
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
