import { GetServerSidePropsContext } from 'next';
import { RemoteGetFormInputProtocols } from '~/app/application/usecases';
import { GetFormInputProtocols } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetFormInputProtocols = (
  context?: GetServerSidePropsContext
): GetFormInputProtocols => {
  return new RemoteGetFormInputProtocols(
    '/v1/form-inputs/protocols',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
