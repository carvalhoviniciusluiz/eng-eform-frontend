import { Box, Button, Typography } from '@mui/material';
import { SelectField } from '~/app/presentation/components/inputs';
import useStyles from './list-styles';

export default function TableFilter() {
  const classes = useStyles();
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
              { key: 'AVDF1020230000032', value: 'AVDF1020230000032' },
              { key: 'AVDF0820230000020', value: 'AVDF0820230000020' },
              { key: 'AVDF1020230000025', value: 'AVDF1020230000025' },
              { key: 'AVDF0920230000024', value: 'AVDF0920230000024' },
              { key: 'AVDF0820230000021', value: 'AVDF0820230000021' },
              { key: 'AVDF0120240000033', value: 'AVDF0120240000033' },
              { key: 'AVDF0120240000038', value: 'AVDF0120240000038' },
              { key: 'AVDF0120240000044', value: 'AVDF0120240000044' },
              { key: 'AVDF0120240000053', value: 'AVDF0120240000053' },
              { key: 'AVDF0120240000059', value: 'AVDF0120240000059' }
            ]}
            onChange={console.log}
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
              { key: 'VITIMA DA PAZ', value: 'VITIMA DA PAZ' },
              { key: 'VITIMA TEIXEIRA', value: 'VITIMA TEIXEIRA' },
              { key: 'VITIMA GONÇALVES', value: 'VITIMA GONÇALVES' },
              { key: 'AGRESSOR SANTANA', value: 'AGRESSOR SANTANA' }
            ]}
            onChange={console.log}
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
              { key: 'VITIMA DA PAZ', value: 'VITIMA DA PAZ' },
              { key: 'VITIMA TEIXEIRA', value: 'VITIMA TEIXEIRA' },
              { key: 'VITIMA GONÇALVES', value: 'VITIMA GONÇALVES' },
              { key: 'AGRESSOR SANTANA', value: 'AGRESSOR SANTANA' }
            ]}
            onChange={console.log}
          />
        </Box>
      </Box>
      <Box textAlign={'right'} padding={2.222}>
        <Button className={classes.btnSearch} onClick={console.log} autoFocus>
          Pesquisar
        </Button>
        <Button onClick={console.log}>Limpar</Button>
      </Box>
    </Box>
  );
}
