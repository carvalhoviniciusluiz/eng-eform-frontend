import { Box } from '@mui/material';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { TextInput } from '~/app/presentation/components/custom';
import { SelectField } from '~/app/presentation/components/inputs/select-field';
import makeStyles from './form-styles';

type PersonContact = {
  id: string;
  contactType?: string;
  contact?: string;
};

type Props = {
  contact: PersonContact;
  onAdd: () => void;
  onRemove: (id: string) => void;
  removeDisabled: boolean;
};

function PersonContact({
  contact,
  onAdd,
  onRemove,
  removeDisabled = true
}: Props) {
  const classes = makeStyles();
  return (
    <Box>
      <Box
        style={{
          marginTop: 33
        }}
      >
        <SelectField
          id={`${contact.id}-contact`}
          name='contactType'
          label='Tipo de contato'
          options={[
            { key: 'EMAIL', value: 'E-mail' },
            { key: 'CELL_PHONE', value: 'Celular' },
            { key: 'HOME_PHONE', value: 'Telefone residencial' }
          ]}
        />
        <TextInput
          id={`${contact.id}-contact`}
          name='contact'
          label='Contato'
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
          onClick={() => onRemove(contact.id)}
        >
          <RemoveIcon fill='#fff' size={32} />
        </button>
      </Box>
    </Box>
  );
}

export default PersonContact;
