import { Box } from '@mui/material';
import { DateField, TextInput } from '~/app/presentation/components/custom';

type Props = {
  id: string;
};

function PersonAddress({ id }: Props) {
  return (
    <Box
      style={{
        marginTop: 33
      }}
    >
      <TextInput id={id} name='zipCode' label='CEP' />
      <DateField id={id} name='neighborhood' label='Bairro' />
      <DateField id={id} name='publicPlace' label='Logradouro' />
      <TextInput id={id} name='number' label='Número' />
      <DateField id={id} name='neighborhoodComplement' label='Complemento' />
      <DateField id={id} name='city' label='Cidade' />
      <DateField id={id} name='country' label='Estado' />
    </Box>
  );
}

export default PersonAddress;
