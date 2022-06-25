import { RemoteLoadForms } from '~/app/application/usecases';
import { LoadForms } from '~/app/domain/usecases';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeRemoteLoadPublicForms = (context?: any): LoadForms => {
  return new RemoteLoadForms('/', makeAxiosHttpClient(context));
};
