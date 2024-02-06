import { Box } from '@mui/material';
import { TextInput } from '~/app/presentation/components/custom';
import { SelectField } from '~/app/presentation/components/inputs/select-field';

type Props = {
  id: string;
};

function PersonContact({ id }: Props) {
  return (
    <Box
      style={{
        marginTop: 33
      }}
    >
      <SelectField id={id} name='contactType' label='Tipo de contato' />
      <TextInput id={id} name='contact' label='Contato' />
    </Box>
  );
}

export default PersonContact;
