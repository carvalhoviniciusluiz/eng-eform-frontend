import { GetServerSidePropsContext } from 'next';
import { RemoteGetForm } from '~/app/application/usecases';
import { GetForm } from '~/app/domain/usecases';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeRemoteGetPublicForm = (
  context?: GetServerSidePropsContext
): GetForm => {
  return new RemoteGetForm('/', makeAxiosHttpClient(context));
};
