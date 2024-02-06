import { Box, TextField } from '@mui/material';

type Props = {
  id: string;
  label: string;
  name: string;
};

export function TextInput({ id, label, name }: Props) {
  return (
    <Box
      style={{
        height: 40 + 78
      }}
    >
      <label htmlFor={`${name}-${id}-text-field`}>
        {label}
        <span>*</span>
      </label>
      <TextField
        style={{
          background: '#fff',
          width: '100%',
          marginTop: 7
        }}
        id={`${name}-${id}-text-field`}
        name={name}
        variant='outlined'
      />
    </Box>
  );
}
