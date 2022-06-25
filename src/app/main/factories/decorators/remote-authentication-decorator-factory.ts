import { Authentication } from '~/app/domain/usecases';
import { RemoteAuthenticationDecorator } from '~/app/main/decorators';
import { makeCookieAdapter } from '~/app/main/factories/cache';
import { makeRemoteAuthentication } from '~/app/main/factories/usecases';

export const makeRemoteAuthenticationDecorator = (): Authentication => {
  return new RemoteAuthenticationDecorator(
    makeCookieAdapter(),
    makeRemoteAuthentication()
  );
};
