import { HttpDeleteClient } from '~/app/application/protocols/http';
import { AuthorizeHttpDeleteClientDecorator } from '~/app/main/decorators';
import { makeCookieAdapter } from '~/app/main/factories/cache';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeAuthorizedHttpDeleteClientDecorator = (): HttpDeleteClient => {
  return new AuthorizeHttpDeleteClientDecorator(
    makeCookieAdapter(),
    makeAxiosHttpClient()
  );
};
