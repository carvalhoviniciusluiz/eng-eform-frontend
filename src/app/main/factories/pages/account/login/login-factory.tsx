import { makeRemoteAuthenticationDecorator } from '~/app/main/factories/decorators';
import { makeLoginValidation } from '~/app/main/factories/pages';
import { LoginTag } from '~/app/presentation/pages';

export const makeLogin = () => {
  return (
    <LoginTag
      validation={makeLoginValidation()}
      authentication={makeRemoteAuthenticationDecorator()}
    />
  );
};
