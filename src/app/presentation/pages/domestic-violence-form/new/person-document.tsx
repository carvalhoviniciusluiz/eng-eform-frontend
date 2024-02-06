import { Box } from '@mui/material';
import { DateField, TextInput } from '~/app/presentation/components/custom';
import { SelectField } from '~/app/presentation/components/inputs/select-field';

type Props = {
  id: string;
};

function PersonDocument({ id }: Props) {
  return (
    <Box
      style={{
        marginTop: 33
      }}
    >
      <SelectField id={id} name='documentType' label='Tipo de documento' />
      <TextInput id={id} name='documentNumber' label='Número' />
      <DateField id={id} name='shippingDate' label='Data de expedição' />
    </Box>
  );
}

export default PersonDocument;
