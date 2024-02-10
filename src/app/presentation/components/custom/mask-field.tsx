import { Box, Input, TextField } from '@mui/material';
import React from 'react';
import InputMask from 'react-input-mask';
import makeStyles from './mask-field-styles';

type Props = {
  id: string;
  label: string;
  name: string;
  mask: string;
  required?: boolean;
};

export function MaskField({ id, label, name, mask, required }: Props) {
  const classes = makeStyles();

  function MaskFieldComponent(props: any, ref: React.Ref<HTMLInputElement>) {
    const { onChange, ...other } = props;
    return (
      <InputMask
        {...other}
        style={{ border: 0 }}
        mask={mask}
        maskChar=''
        onChange={event => {
          onChange({
            target: {
              name: props.name,
              value: event.target.value
            }
          });
        }}
      >
        {(inputProps: any) => (
          <Input {...inputProps} className={classes.input} ref={ref} />
        )}
      </InputMask>
    );
  }

  return (
    <Box
      style={{
        height: 40 + 78
      }}
    >
      <label htmlFor={`${name}-${id}-mask-field`}>
        {label}
        {required && <span>*</span>}
      </label>
      <TextField
        style={{
          background: '#fff',
          width: '100%',
          marginTop: 7
        }}
        id={`${name}-${id}-mask-field`}
        name={name}
        variant='outlined'
        InputProps={{
          inputComponent: React.forwardRef(MaskFieldComponent) as any
        }}
      ></TextField>
    </Box>
  );
}
