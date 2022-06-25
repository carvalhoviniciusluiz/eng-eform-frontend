import { AxiosHttpAuth } from '~/app/infra/axios-http-client';
import { makeCookieAdapter } from '~/app/main/factories/cache';
import { makeAxios } from '~/app/main/factories/http';

export const makeAxiosHttpAuth = (context?: any): AxiosHttpAuth => {
  return new AxiosHttpAuth(
    '/v1/auth/refreshToken',
    makeAxios(),
    makeCookieAdapter(context)
  );
};
