import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

type Props = {
  id: string;
  label: string;
  name: string;
  defaultValue?: string;
  options: { key: string; value: string }[];
  onChange?: (value: string) => void;
};

export function SelectField({
  id,
  label,
  name,
  defaultValue = '',
  options,
  onChange
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue(value);
    onChange && onChange(value);
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
          {options.map((option, index) => (
            <MenuItem key={index} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
