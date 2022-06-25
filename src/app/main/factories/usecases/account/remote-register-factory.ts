import { RemoteRegister } from '~/app/application/usecases';
import { Register } from '~/app/domain/usecases';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeRemoteRegister = (): Register => {
  return new RemoteRegister('/v1/auth/signup', makeAxiosHttpClient());
};
