import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdAdd as AddIcon, MdRemove as RemoveIcon } from 'react-icons/md';
import { GetCep } from '~/app/domain/usecases';
import { MaskField, TextInput } from '~/app/presentation/components/custom';
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
  data: PersonAddress;
  onGetCep: (cep: string) => Promise<GetCep.Address | undefined>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  submit: (value: GetCep.Address) => void;
  removeDisabled: boolean;
};

function PersonAddressForm({
  data,
  onGetCep,
  onAdd,
  onRemove,
  submit,
  removeDisabled = true
}: Props) {
  const classes = makeStyles();
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState<GetCep.Address>(() => {
    return {
      neighborhood: data?.neighborhood ?? '',
      neighborhoodComplement: data?.neighborhoodComplement ?? '',
      zipCode: data?.zipCode ?? '',
      ddd: '96',
      city: data?.city ?? '',
      county: data?.county ?? '',
      publicPlace: data?.publicPlace ?? ''
    };
  });
  function handleOnKeyUp(event: any) {
    if (event.key === 'Enter') {
      onGetCep(zipcode)
        .then(response => {
          if (!response) {
            return;
          }
          setAddress({
            id: response.id,
            neighborhood: response.neighborhood,
            neighborhoodComplement: response.neighborhoodComplement,
            zipCode: response.zipCode,
            ddd: '96',
            city: response.city,
            county: response.county,
            publicPlace: response.publicPlace
          });
        })
        .catch(error => console.error(error));
    }
  }
  function handleOnChange(key: string, value: string) {
    setAddress(prevState => ({ ...prevState, [key]: value }));
  }
  useEffect(() => {
    submit({ ...address, id: data.id });
  }, [address]);
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
        <MaskField
          id={`${data.id}-address`}
          name='zipCode'
          label='CEP'
          mask='zipcode'
          onChange={event => setZipcode(event.target.value)}
          onKeyUp={handleOnKeyUp}
        />
        <TextInput
          id={`${data.id}-address`}
          name='neighborhood'
          label='Bairro'
          value={address?.neighborhood}
          onChange={event => handleOnChange('neighborhood', event.target.value)}
        />
        <TextInput
          id={`${data.id}-address`}
          name='publicPlace'
          label='Logradouro'
          value={address?.publicPlace}
          onChange={event => handleOnChange('publicPlace', event.target.value)}
        />
        <TextInput id={`${data.id}-address`} name='number' label='Número' />
        <TextInput
          id={`${data.id}-address`}
          name='neighborhoodComplement'
          label='Complemento'
          value={address?.neighborhoodComplement}
          onChange={event =>
            handleOnChange('neighborhoodComplement', event.target.value)
          }
        />
        <TextInput
          id={`${data.id}-address`}
          name='city'
          label='Cidade'
          value={address?.city}
          onChange={event => handleOnChange('city', event.target.value)}
        />
        <TextInput
          id={`${data.id}-address`}
          name='country'
          label='Estado'
          value={address?.county}
          onChange={event => handleOnChange('county', event.target.value)}
        />
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 15
        }}
      >
        <button className={classes.btnSave} onClick={onAdd}>
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

export default PersonAddressForm;
