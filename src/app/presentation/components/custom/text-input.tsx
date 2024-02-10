import { Box, TextField } from '@mui/material';

type Props = {
  id: string;
  label: string;
  name: string;
  value?: any;
  required?: boolean;
  onChange?: (event: any) => void;
  onKeyUp?: (event: any) => void;
};

export function TextInput({
  id,
  label,
  name,
  value,
  required,
  onChange,
  onKeyUp
}: Props) {
  return (
    <Box
      style={{
        height: 40 + 78
      }}
    >
      <label htmlFor={`${name}-${id}-text-field`}>
        {label}
        {required && <span>*</span>}
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
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </Box>
  );
}
