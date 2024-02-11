import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import MaskedInput from 'react-text-mask';

type BaseMaskedInputProps = any;

// Default component to receive the mask
function DefaultMask(props: BaseMaskedInputProps) {
  const { inputRef, mask, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        if (inputRef && ref) {
          if (typeof inputRef === 'function') {
            inputRef(ref.inputElement);
          } else if (
            Object.prototype.hasOwnProperty.call(inputRef, 'current')
          ) {
            inputRef.current = ref.inputElement;
          }
        }
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

// Data mask (DD/MM/AAAA)
function DateMask(props: BaseMaskedInputProps) {
  const { inputRef, ...other } = props;
  return (
    <DefaultMask
      ref={inputRef}
      {...other}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
    />
  );
}

// Zipcode mask (#####-###)
function ZipCodeMask(props: BaseMaskedInputProps) {
  const { inputRef, ...other } = props;
  return (
    <DefaultMask
      ref={inputRef}
      {...other}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
    />
  );
}

// CPF mask (###.###.###-##)
function CpfMask(props: BaseMaskedInputProps) {
  const { inputRef, ...other } = props;
  return (
    <DefaultMask
      ref={inputRef}
      {...other}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/
      ]}
    />
  );
}

// RG mask (##.###.###-#)
// function RgMask(props: BaseMaskedInputProps) {
//   const { inputRef, ...other } = props;
//   return (
//     <DefaultMask
//       ref={inputRef}
//       {...other}
//       mask={[
//         /\d/,
//         /\d/,
//         '.',
//         /\d/,
//         /\d/,
//         /\d/,
//         '.',
//         /\d/,
//         /\d/,
//         /\d/,
//         '-',
//         /\d/
//       ]}
//     />
//   );
// }

// Only number mask
function NumberMask(props: BaseMaskedInputProps) {
  const { inputRef, ...other } = props;
  return (
    <DefaultMask
      ref={inputRef}
      {...other}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
    />
  );
}

// Cellphone mask (DD) XXXX-XXXX
function CellPhoneMask(props: BaseMaskedInputProps) {
  const { inputRef, ...other } = props;
  return (
    <DefaultMask
      ref={inputRef}
      {...other}
      mask={[
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
    />
  );
}

// Cellhome mask (DD) XXXX-XXXX
function HomePhoneMask(props: BaseMaskedInputProps) {
  const { inputRef, ...other } = props;
  return (
    <DefaultMask
      ref={inputRef}
      {...other}
      mask={[
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
    />
  );
}

export type MaskType =
  | 'date'
  | 'zipcode'
  | 'cpf'
  // | 'rg'
  | 'cellphone'
  | 'homephone'
  | 'number';

interface MaskedTextFieldProps extends Omit<TextFieldProps, 'inputComponent'> {
  maskType: MaskType;
}

export function MaskedTextField({ maskType, ...props }: MaskedTextFieldProps) {
  let MaskComponent: React.FC<BaseMaskedInputProps>;
  switch (maskType) {
    case 'date':
      MaskComponent = DateMask;
      break;
    case 'zipcode':
      MaskComponent = ZipCodeMask;
      break;
    case 'cpf':
      MaskComponent = CpfMask;
      break;
    // case 'rg':
    //   MaskComponent = RgMask;
    //   break;
    case 'number':
      MaskComponent = NumberMask;
      break;
    case 'homephone':
      MaskComponent = HomePhoneMask;
      break;
    case 'cellphone':
      MaskComponent = CellPhoneMask;
      break;
    default:
      MaskComponent = DateMask;
      break;
  }
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: MaskComponent as any
      }}
    />
  );
}
