import { Box } from '@mui/material';
import {
  MaskType,
  MaskedTextField
} from '~/app/presentation/components/custom';

type Props = {
  id: string;
  label: string;
  name: string;
  mask: MaskType;
  required?: boolean;
  onChange?: (event: any) => void;
  onKeyUp?: (event: any) => void;
};

export function MaskField({
  id,
  label,
  name,
  mask,
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
      <label htmlFor={`${name}-${id}-mask-field`}>
        {label}
        {required && <span>*</span>}
      </label>
      <MaskedTextField
        maskType={mask}
        style={{
          background: '#fff',
          width: '100%',
          marginTop: 7
        }}
        id={`${name}-${id}-mask-field`}
        name={name}
        variant='outlined'
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </Box>
  );
}
