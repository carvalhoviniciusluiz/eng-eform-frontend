import { makeRegisterValidation } from '~/app/main/factories/pages';
import { makeRemoteRegister } from '~/app/main/factories/usecases';
import { RegisterTag } from '~/app/presentation/pages';

export const makeRegister = () => {
  return (
    <RegisterTag
      validation={makeRegisterValidation()}
      register={makeRemoteRegister()}
    />
  );
};
