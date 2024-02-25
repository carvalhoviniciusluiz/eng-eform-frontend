import { GetServerSidePropsContext } from 'next';
import { RemoteGetPerson } from '~/app/application/usecases';
import { GetPerson } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetPerson = (
  context?: GetServerSidePropsContext
): GetPerson => {
  return new RemoteGetPerson(
    '/v1/people',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
