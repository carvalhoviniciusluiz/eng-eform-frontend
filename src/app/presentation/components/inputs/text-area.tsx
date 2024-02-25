import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

interface Props {
  defaultValue?: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const TextArea = ({ defaultValue, placeholder, onChange }: Props) => {
  const [value, setValue] = useState('');
  const [inputEvent, setInputEvent] =
    useState<React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>>();
  useEffect(() => {
    if (inputEvent) {
      onChange && onChange(inputEvent);
    }
  }, [inputEvent]);
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <Paper
      component='div'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: 100
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        multiline
        maxRows={4}
        value={value}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        onChange={event => {
          setValue(event.target.value);
          setInputEvent(event);
        }}
      />
    </Paper>
  );
};
