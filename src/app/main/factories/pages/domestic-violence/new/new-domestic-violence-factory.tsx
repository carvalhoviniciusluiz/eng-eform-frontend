import { LoadFullForms } from '~/app/domain/usecases';
import {
  makeRemoteAddFormInput,
  makeRemoteGetCep
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { NewDomesticViolenceTag } from '~/app/presentation/pages';

export const makeNewDomesticViolence = (props: {
  data: LoadFullForms.Response;
}) => {
  return (
    <BaseLayout>
      <NewDomesticViolenceTag
        {...props}
        getCep={makeRemoteGetCep()}
        addFormInput={makeRemoteAddFormInput()}
      />
    </BaseLayout>
  );
};
