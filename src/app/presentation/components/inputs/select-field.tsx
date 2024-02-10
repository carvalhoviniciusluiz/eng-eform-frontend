import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

type Props = {
  id: string;
  label: string;
  name: string;
  options: { key: string; value: string }[];
};

export function SelectField({ id, label, name, options }: Props) {
  const [value, setValue] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <Box sx={{ marginbo: 120, height: 90 }}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-${id}-select-label`}>{label}</InputLabel>
        <Select
          style={{
            background: '#fff'
          }}
          labelId={`${name}-${id}-select-label`}
          id={`${name}-${id}-select`}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map(option => (
            <MenuItem value={option.key}>{option.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
