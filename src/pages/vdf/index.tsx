import { GetFormInputProtocols, GetPeople } from '~/app/domain/usecases';
import { makeListDomesticViolence } from '~/app/main/factories/pages';
import {
  makeRemoteGetFormInputProtocols,
  makeRemoteGetPeople
} from '~/app/main/factories/usecases';
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth';

export const getServerSideProps = handleSSRAuth(async context => {
  const getFormInputProtocols = makeRemoteGetFormInputProtocols(context);
  const getPeople = makeRemoteGetPeople(context);
  const protocols = await getFormInputProtocols.execute();
  const victims = await getPeople.execute({ personType: 'VICTIM' });
  const aggressors = await getPeople.execute({ personType: 'AGGRESSOR' });
  return {
    props: {
      data: {
        protocols,
        victims,
        aggressors
      }
    }
  };
});

type Props = {
  data: {
    protocols: GetFormInputProtocols.Output[];
    victims: GetPeople.Output[];
    aggressors: GetPeople.Output[];
  };
};

function DomesticViolenceForm(props: Props) {
  return makeListDomesticViolence(props);
}

export default DomesticViolenceForm;
