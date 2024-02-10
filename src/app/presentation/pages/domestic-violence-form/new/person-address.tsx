import { Box } from '@mui/material';
import { useState } from 'react';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { GetCep } from '~/app/domain/usecases';
import { TextInput } from '~/app/presentation/components/custom';
import makeStyles from './form-styles';

type PersonAddress = {
  id: string;
  number?: string;
  zipCode?: string;
  publicPlace?: string;
  neighborhood?: string;
  neighborhoodComplement?: string;
  city?: string;
  county?: string;
};

type Props = {
  address: PersonAddress;
  onGetCep: (cep: string) => Promise<GetCep.Address | undefined>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  removeDisabled: boolean;
};

function PersonAddress({
  address,
  onGetCep,
  onAdd,
  onRemove,
  removeDisabled = true
}: Props) {
  const [cep, setCep] = useState('');
  const [data, setData] = useState<GetCep.Address>();
  const classes = makeStyles();
  function handleOnKeyUp(event: any) {
    if (event.key === 'Enter') {
      onGetCep(cep)
        .then(setData)
        .catch(error => console.error(error));
    }
  }
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        style={{
          marginTop: 33
        }}
      >
        <TextInput
          id={`${address.id}-address`}
          name='zipCode'
          label='CEP'
          value={cep}
          onChange={event => setCep(event.target.value)}
          onKeyUp={handleOnKeyUp}
        />
        <TextInput
          id={`${address.id}-address`}
          name='neighborhood'
          label='Bairro'
          value={data?.neighborhood}
        />
        <TextInput
          id={`${address.id}-address`}
          name='publicPlace'
          label='Logradouro'
          value={data?.publicPlace}
        />
        <TextInput id={`${address.id}-address`} name='number' label='Número' />
        <TextInput
          id={`${address.id}-address`}
          name='neighborhoodComplement'
          label='Complemento'
          value={data?.neighborhoodComplement}
        />
        <TextInput
          id={`${address.id}-address`}
          name='city'
          label='Cidade'
          value={data?.city}
        />
        <TextInput
          id={`${address.id}-address`}
          name='country'
          label='Estado'
          value={data?.county}
        />
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 15
        }}
      >
        <button className={classes.btnSave} onClick={() => onAdd()}>
          <AddIcon fill='#fff' size={32} />
        </button>
        <button
          disabled={removeDisabled}
          className={classes.btnSave}
          onClick={() => onRemove(address.id)}
        >
          <RemoveIcon fill='#fff' size={32} />
        </button>
      </Box>
    </Box>
  );
}

export default PersonAddress;
