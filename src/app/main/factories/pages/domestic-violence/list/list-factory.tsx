import {
  makeRemoteGetFormInputProtocols,
  makeRemoteGetFormInputs,
  makeRemoteGetPeople
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { ListDomesticViolenceTag } from '~/app/presentation/pages';

export const makeListDomesticViolence = (props: { data: any }) => {
  return (
    <BaseLayout>
      <ListDomesticViolenceTag
        getFormInputProtocols={makeRemoteGetFormInputProtocols()}
        getPeople={makeRemoteGetPeople()}
        getFormInputs={makeRemoteGetFormInputs()}
      />
    </BaseLayout>
  );
};
