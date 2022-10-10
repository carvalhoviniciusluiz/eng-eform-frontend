import { makeRegisterValidation } from '~/app/main/factories/pages';
import { makeRemoteRegister } from '~/app/main/factories/usecases';
import { DefaultLayout } from '~/app/presentation/layouts';
import { RegisterTag } from '~/app/presentation/pages';

export const makeRegister = () => {
  return (
    <DefaultLayout>
      <RegisterTag
        validation={makeRegisterValidation()}
        register={makeRemoteRegister()}
      />
    </DefaultLayout>
  );
};
