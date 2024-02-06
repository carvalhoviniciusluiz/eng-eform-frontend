import { LoadFullForms } from '~/app/domain/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { NewDomesticViolenceTag } from '~/app/presentation/pages/domestic-violence-form';

export const makeNewDomesticViolence = (props: {
  data: LoadFullForms.Response;
}) => {
  return (
    <BaseLayout>
      <NewDomesticViolenceTag {...props} />
    </BaseLayout>
  );
};
