import { GetServerSidePropsContext } from 'next';
import { RemoteGetCep } from '~/app/application/usecases';
import { GetCep } from '~/app/domain/usecases';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeRemoteGetCep = (
  context?: GetServerSidePropsContext
): GetCep => {
  return new RemoteGetCep(
    'https://viacep.com.br/ws',
    makeAxiosHttpClient(context)
  );
};
