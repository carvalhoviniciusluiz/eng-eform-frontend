import { makeRemoteGetFormInputs } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { ListDomesticViolenceTag } from '~/app/presentation/pages';

export const makeListDomesticViolence = () => {
  return (
    <BaseLayout>
      <ListDomesticViolenceTag getFormInputs={makeRemoteGetFormInputs()} />
    </BaseLayout>
  );
};
