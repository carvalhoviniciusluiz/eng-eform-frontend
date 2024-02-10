import { LoadFullForms } from '~/app/domain/usecases';
import { makeRemoteGetCep } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { NewDomesticViolenceTag } from '~/app/presentation/pages/domestic-violence-form';

export const makeNewDomesticViolence = (props: {
  data: LoadFullForms.Response;
}) => {
  return (
    <BaseLayout>
      <NewDomesticViolenceTag {...props} getCep={makeRemoteGetCep()} />
    </BaseLayout>
  );
};
