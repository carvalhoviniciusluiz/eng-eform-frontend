import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { MaskField, TextInput } from '~/app/presentation/components/custom';
import { SelectField } from '~/app/presentation/components/inputs/select-field';
import makeStyles from './form-styles';

type PersonContact = {
  id: string;
  contactType?: string;
  contact?: string;
};

type Props = {
  data: PersonContact;
  onAdd: () => void;
  onRemove: (id: string) => void;
  submit: (value: PersonContact) => void;
  removeDisabled: boolean;
};

function PersonContactForm({
  data,
  onAdd,
  onRemove,
  submit,
  removeDisabled = true
}: Props) {
  const classes = makeStyles();
  const [contact, setContact] = useState<Omit<PersonContact, 'id'>>(() => {
    return {
      contactType: data?.contactType ?? 'CELL_PHONE',
      contact: data?.contact ?? ''
    };
  });
  function handleOnChange(key: string, value: string) {
    setContact(prevState => ({ ...prevState, [key]: value }));
  }
  function handleContactToggle() {
    if (contact.contactType === 'CELL_PHONE') {
      return (
        <MaskField
          id={`${data.id}-contact`}
          name='contact'
          label='Contato'
          mask='cellphone'
          value={contact?.contact}
          onChange={event => handleOnChange('contact', event.target.value)}
        />
      );
    }
    if (contact.contactType === 'HOME_PHONE') {
      return (
        <MaskField
          id={`${data.id}-contact`}
          name='contact'
          label='Contato'
          mask='homephone'
          value={contact?.contact}
          onChange={event => handleOnChange('contact', event.target.value)}
        />
      );
    }
    return (
      <TextInput
        id={`${data.id}-contact`}
        name='contact'
        label='Contato'
        value={contact?.contact}
        onChange={event => handleOnChange('contact', event.target.value)}
      />
    );
  }
  useEffect(() => {
    submit({ ...contact, id: data.id });
  }, [contact]);
  return (
    <Box>
      <Box
        style={{
          marginTop: 33
        }}
      >
        <label htmlFor='contactType'>Tipo de contato</label>
        <SelectField
          id={`${data.id}-contact`}
          name='contactType'
          defaultValue={contact.contactType}
          options={[
            { key: 'EMAIL', value: 'E-mail' },
            { key: 'CELL_PHONE', value: 'Celular' },
            { key: 'HOME_PHONE', value: 'Telefone residencial' }
          ]}
          onChange={value => handleOnChange('contactType', value)}
        />
        {handleContactToggle()}
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

export default PersonContactForm;
