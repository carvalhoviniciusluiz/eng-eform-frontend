import { Box } from '@mui/material';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { DateField, TextInput } from '~/app/presentation/components/custom';
import { SelectField } from '~/app/presentation/components/inputs/select-field';
import makeStyles from './form-styles';

type PersonDocument = {
  id: string;
  documentType?: string;
  documentNumber?: string;
  shippingDate?: string;
};

type Props = {
  document: PersonDocument;
  onAdd: () => void;
  onRemove: (id: string) => void;
  removeDisabled: boolean;
};

function PersonDocument({
  document,
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
          id={`${document.id}-document`}
          name='documentType'
          label='Tipo de documento'
          options={[
            { key: 'CPF', value: 'CPF' },
            { key: 'RG', value: 'RG' },
            { key: 'SUS', value: 'SUS' },
            { key: 'NIS', value: 'NIS' },
            { key: 'WORK_CARD', value: 'Carteira de trabalho' }
          ]}
        />
        <TextInput
          id={`${document.id}-document`}
          name='documentNumber'
          label='Número'
        />
        <DateField
          id={`${document.id}-document`}
          name='shippingDate'
          label='Data de expedição'
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
          onClick={() => onRemove(document.id)}
        >
          <RemoveIcon fill='#fff' size={32} />
        </button>
      </Box>
    </Box>
  );
}

export default PersonDocument;
