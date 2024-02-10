import { Box } from '@mui/material';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { DateField, TextInput } from '~/app/presentation/components/custom';
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
  onAdd: () => void;
  onRemove: (id: string) => void;
  removeDisabled: boolean;
};

function PersonAddress({
  address,
  onAdd,
  onRemove,
  removeDisabled = true
}: Props) {
  const classes = makeStyles();
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
        <TextInput id={`${address.id}-address`} name='zipCode' label='CEP' />
        <DateField
          id={`${address.id}-address`}
          name='neighborhood'
          label='Bairro'
        />
        <DateField
          id={`${address.id}-address`}
          name='publicPlace'
          label='Logradouro'
        />
        <TextInput id={`${address.id}-address`} name='number' label='Número' />
        <DateField
          id={`${address.id}-address`}
          name='neighborhoodComplement'
          label='Complemento'
        />
        <DateField id={`${address.id}-address`} name='city' label='Cidade' />
        <DateField id={`${address.id}-address`} name='country' label='Estado' />
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
