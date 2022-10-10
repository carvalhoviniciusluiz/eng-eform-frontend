import { makeRemoteAuthenticationDecorator } from '~/app/main/factories/decorators';
import { makeLoginValidation } from '~/app/main/factories/pages';
import { DefaultLayout } from '~/app/presentation/layouts';
import { LoginTag } from '~/app/presentation/pages';

export const makeLogin = () => {
  return (
    <DefaultLayout>
      <LoginTag
        validation={makeLoginValidation()}
        authentication={makeRemoteAuthenticationDecorator()}
      />
    </DefaultLayout>
  );
};
