import { IconButton } from '@mui/material'
import { useState } from 'react'
import {
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon
} from 'react-icons/md'
import { TextField, TextFieldProps } from './text-field'

export const PasswordField = (input: TextFieldProps) => {
  const [inputType, setInputType] = useState<'password' | 'text'>('password')

  const togglePasswordInput = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password')
  }

  return (
    <TextField
      type={inputType}
      {...input}
      InputProps={{
        endAdornment: (
          <IconButton onClick={togglePasswordInput}>
            {inputType === 'password' ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>
        )
      }}
    />
  )
}
