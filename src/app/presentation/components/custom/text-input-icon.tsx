import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';

type Props = {
  id: string;
  label: string;
  tooltip?: string;
  name: string;
  value?: any;
  required?: boolean;
  icon: React.ReactNode;
  onIconClick?: (value: string) => void;
  onChange?: (event: any) => void;
  onKeyUp?: (event: any) => void;
};

export function TextInputIcon({
  id,
  label,
  tooltip,
  name,
  required,
  icon,
  onIconClick,
  onChange,
  ...props
}: Props) {
  const [value, setValue] = React.useState('');
  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  function handleOnChange(event: any) {
    setValue(event.target.value);
    onChange && onChange(event);
  }
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
      <OutlinedInput
        style={{
          background: '#fff',
          width: '100%',
          marginTop: 7
        }}
        {...props}
        notched={false}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => onIconClick && onIconClick(value)}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {icon}
            </IconButton>
          </InputAdornment>
        }
        id={`${name}-${id}-text-field`}
        name={name}
        onChange={handleOnChange}
      />
      {tooltip && (
        <Box
          style={{
            textAlign: 'end'
          }}
        >
          <span>{tooltip}</span>
        </Box>
      )}
    </Box>
  );
}
