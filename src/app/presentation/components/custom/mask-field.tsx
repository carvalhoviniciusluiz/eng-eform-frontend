import { Box } from '@mui/material';
import {
  MaskType,
  MaskedTextField
} from '~/app/presentation/components/custom';

type Props = {
  id: string;
  label: string;
  tooltip?: string;
  name: string;
  mask: MaskType;
  required?: boolean;
  onChange?: (event: any) => void;
  onKeyUp?: (event: any) => void;
};

export function MaskField({
  id,
  label,
  tooltip,
  name,
  mask,
  required,
  ...props
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
        style={{
          background: '#fff',
          width: '100%',
          marginTop: 7
        }}
        {...props}
        maskType={mask}
        id={`${name}-${id}-mask-field`}
        name={name}
        variant='outlined'
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
