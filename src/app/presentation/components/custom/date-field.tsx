import { Box, Input, TextField } from '@mui/material';
import React from 'react';
import InputMask from 'react-input-mask';
import makeStyles from './date-field-styles';

type Props = {
  id: string;
  label: string;
  name: string;
};

export function DateField({ id, label, name }: Props) {
  const classes = makeStyles();

  function DateFieldComponent(props: any, ref: React.Ref<HTMLInputElement>) {
    const { onChange, ...other } = props;
    return (
      <InputMask
        style={{ border: 0 }}
        mask='99/99/9999'
        maskChar=''
        {...other}
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
        InputProps={{
          inputComponent: React.forwardRef(DateFieldComponent) as any
        }}
      ></TextField>
    </Box>
  );
}
