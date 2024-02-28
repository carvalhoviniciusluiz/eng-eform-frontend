import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { GetFormInputProtocols, GetPeople } from '~/app/domain/usecases';
import { SelectField } from '~/app/presentation/components/inputs';
import useStyles from './list-styles';

type Props = {
  hasData: boolean;
  protocols: GetFormInputProtocols.Output[];
  victims: GetPeople.Output[];
  aggressors: GetPeople.Output[];
  onSubmit: (param: {
    protocolNumber: string;
    aggressorId: string;
    victimId: string;
  }) => void;
};

export default function TableFilter({
  hasData,
  protocols,
  aggressors,
  victims,
  onSubmit
}: Props) {
  const [state, setState] = useState(() => ({
    protocolNumber: '',
    aggressorId: '',
    victimId: ''
  }));
  function handleProtocolOptions() {
    const isEmpty = !Boolean(protocols.length);
    if (isEmpty) {
      return [];
    }
    return protocols.map(protocol => ({
      key: protocol.number,
      value: protocol.number
    }));
  }
  function handlePersonOptions(values: GetPeople.Output[]) {
    const isEmpty = !Boolean(values.length);
    if (isEmpty) {
      return [];
    }
    return values.map(value => ({
      key: value.id,
      value: value.name
    }));
  }
  function handleClick() {
    onSubmit({ ...state });
    setState({
      protocolNumber: '',
      aggressorId: '',
      victimId: ''
    });
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
          <SelectField
            id={`vdf-select`}
            name='protocol'
            label='Protocolo'
            defaultValue={'0'}
            options={[
              {
                key: '0',
                value: 'Selecionar uma opção...'
              },
              ...handleProtocolOptions()
            ]}
            onChange={protocolNumber =>
              setState(prevState => ({
                ...prevState,
                protocolNumber
              }))
            }
          />
          <SelectField
            id={`vdf-select`}
            name='victin'
            label='Vítima'
            defaultValue={'0'}
            options={[
              {
                key: '0',
                value: 'Selecionar uma opção...'
              },
              ...handlePersonOptions(victims)
            ]}
            onChange={victimId =>
              setState(prevState => ({
                ...prevState,
                victimId
              }))
            }
          />
          <SelectField
            id={`vdf-select`}
            name='aggressor'
            label='Agressor'
            defaultValue={'0'}
            options={[
              {
                key: '0',
                value: 'Selecionar uma opção...'
              },
              ...handlePersonOptions(aggressors)
            ]}
            onChange={aggressorId =>
              setState(prevState => ({
                ...prevState,
                aggressorId
              }))
            }
          />
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
