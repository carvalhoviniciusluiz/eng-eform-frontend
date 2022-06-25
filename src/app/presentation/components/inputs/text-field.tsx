import {
  TextField as TextFieldMui,
  TextFieldProps as TextFieldPropsMui
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type FieldProps = {
  name: string;
  control: Control<any>;
  variant?: string;
};

export type TextFieldProps = TextFieldPropsMui & FieldProps;

export const TextField = ({
  name,
  control,
  variant = 'filled',
  ...props
}: TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error, invalid } }) => {
        return (
          <TextFieldMui
            {...field}
            {...props}
            fullWidth
            error={invalid}
            helperText={invalid ? error?.message : ''}
            variant={variant}
          />
        );
      }}
    />
  );
};
