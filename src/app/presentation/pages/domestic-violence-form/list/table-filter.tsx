import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import useStyles from './list-styles';

type Props = {
  hasData: boolean;
  onSubmit: (param: {
    protocolNumber: string;
    aggressorId: string;
    victimId: string;
  }) => void;
};

const defaultValue = {
  protocolNumber: '',
  aggressorId: '',
  victimId: ''
};

export default function TableFilter({ hasData, onSubmit }: Props) {
  const [state, setState] = useState(() => defaultValue);
  function handleClick() {
    onSubmit({ ...state });
    setState(defaultValue);
  }
  const classes = useStyles();
  if (hasData) {
    return <></>;
  }
  return (
    <Box
      style={{
        marginTop: 30,
        borderTop: '10px solid #2469ce!important',
        border: '1px solid #2469ce',
        borderRadius: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
      }}
    >
      <Box
        style={{
          height: 37,
          background: '#FFFFFF',
          borderColor: '#cbcffb',
          borderWidth: '0px 0px 1px 0px',
          borderStyle: 'dashed',
          padding: 6
        }}
      >
        <Typography variant='h6'>Registro de avaliação de risco</Typography>
      </Box>
      <Box
        style={{
          padding: 30
        }}
      >
        <Box
          style={{
            width: 600,
            background: '#f1f3ff',
            padding: 30,
            paddingBottom: 0
          }}
        >
          <Box>
            <InputLabel>Protocolo</InputLabel>
            <FormControl fullWidth>
              <TextField
                style={{
                  background: '#fff',
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  marginBottom: 22
                }}
                placeholder='Protocolo'
                name='protocol'
                onChange={event => {
                  setState(prevState => ({
                    ...prevState,
                    protocolNumber: event.target.value
                  }));
                }}
              />
            </FormControl>
          </Box>
          <Box>
            <InputLabel>Vítima</InputLabel>
            <FormControl fullWidth>
              <TextField
                style={{
                  background: '#fff',
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  marginBottom: 22
                }}
                placeholder='Vítima'
                name='victin'
                onChange={event => {
                  setState(prevState => ({
                    ...prevState,
                    victimId: event.target.value
                  }));
                }}
              />
            </FormControl>
          </Box>
          <Box>
            <InputLabel>Agressor</InputLabel>
            <FormControl fullWidth>
              <TextField
                style={{
                  background: '#fff',
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  marginBottom: 44
                }}
                placeholder='Agressor'
                name='aggressor'
                onChange={event => {
                  setState(prevState => ({
                    ...prevState,
                    aggressorId: event.target.value
                  }));
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box textAlign={'right'} padding={2.222}>
        <Button className={classes.btnSearch} onClick={handleClick} autoFocus>
          Pesquisar
        </Button>
        <Button onClick={console.log}>Limpar</Button>
      </Box>
    </Box>
  );
}
