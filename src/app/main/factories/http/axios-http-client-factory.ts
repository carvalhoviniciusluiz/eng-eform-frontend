import { AxiosHttpClient } from '~/app/infra/axios-http-client';
import { makeAxiosHttpAuth } from '~/app/main/factories/http';

export const makeAxiosHttpClient = (context?: any): AxiosHttpClient => {
  return new AxiosHttpClient(makeAxiosHttpAuth(context).getAxiosInstance());
};
