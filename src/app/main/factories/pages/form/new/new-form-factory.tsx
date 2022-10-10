import { makeRemoteAddForm } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { NewFormTag } from '~/app/presentation/pages';
import { makeNewFormValidation } from './new-form-validation-factory';

export const makeNewForm = () => {
  return (
    <BaseLayout>
      <NewFormTag
        addForm={makeRemoteAddForm()}
        validation={makeNewFormValidation()}
      />
    </BaseLayout>
  );
};
