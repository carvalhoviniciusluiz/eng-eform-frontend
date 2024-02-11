import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { MaskField, TextInput } from '~/app/presentation/components/custom';
import { SelectField } from '~/app/presentation/components/inputs/select-field';
import makeStyles from './form-styles';

type PersonDocument = {
  id: string;
  documentType?: string;
  documentNumber?: string;
  shippingDate?: string;
};

type Props = {
  data: PersonDocument;
  onAdd: () => void;
  onRemove: (id: string) => void;
  submit: (value: PersonDocument) => void;
  removeDisabled: boolean;
};

function PersonDocumentForm({
  data,
  onAdd,
  onRemove,
  submit,
  removeDisabled = true
}: Props) {
  const classes = makeStyles();
  const [document, setDocument] = useState<Omit<PersonDocument, 'id'>>(() => {
    return {
      documentType: data?.documentType ?? 'CPF',
      documentNumber: data?.documentNumber ?? ''
    };
  });
  function handleOnChange(key: string, value: string) {
    setDocument(prevState => ({ ...prevState, [key]: value }));
  }
  function handleDocumentNumberToggle() {
    if (document.documentType === 'CPF') {
      return (
        <MaskField
          id={`${data.id}-document`}
          name='documentNumber'
          label='Número'
          mask='cpf'
          onChange={event => handleOnChange('', event.target.value)}
        />
      );
    }
    return (
      <TextInput
        id={`${data.id}-document`}
        name='documentNumber'
        label='Número'
        onChange={event => handleOnChange('documentNumber', event.target.value)}
      />
    );
  }
  useEffect(() => {
    submit({ ...document, id: data.id });
  }, [document]);
  return (
    <Box>
      <Box
        style={{
          marginTop: 33
        }}
      >
        <SelectField
          id={`${data.id}-document`}
          name='documentType'
          label='Tipo de documento'
          defaultValue={document.documentType}
          options={[
            { key: 'CPF', value: 'CPF' },
            { key: 'RG', value: 'RG' },
            { key: 'SUS', value: 'SUS' },
            { key: 'NIS', value: 'NIS' },
            { key: 'WORK_CARD', value: 'Carteira de trabalho' }
          ]}
          onChange={value => handleOnChange('documentType', value)}
        />
        {handleDocumentNumberToggle()}
        <MaskField
          id={`${data.id}-document`}
          name='shippingDate'
          label='Data de expedição'
          mask='date'
          onChange={event => handleOnChange('shippingDate', event.target.value)}
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
          onClick={() => onRemove(data.id)}
        >
          <RemoveIcon fill='#fff' size={32} />
        </button>
      </Box>
    </Box>
  );
}

export default PersonDocumentForm;
