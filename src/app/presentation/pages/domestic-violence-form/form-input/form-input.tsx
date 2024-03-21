import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { GetFormByProcessNumber } from '~/app/domain/usecases';
import useStyles from './form-input-styles';
import Header from './header';

type Props = {
  ticket: GetFormByProcessNumber.Output;
};

export default function FormInputComponent({ ticket }: Props) {
  const classes = useStyles();
  function handleTicket() {
    const divPrint = () => {
      const content = document.querySelector('.printing-card')?.innerHTML;
      const windowContant = window.open('', '', 'height=600,width=800');
      if (windowContant) {
        windowContant.document.write(
          '<html><head><title>Cartão de Impressão</title></head><body>'
        );
        windowContant.document.write(
          '<style>@media print { button { display: none; } }</style>'
        );
        windowContant.document.write(content || '');
        windowContant.document.write('</body></html>');
        windowContant.document.close();
        windowContant.print();
      }
    };
    return (
      <Box
        className='printing-card'
        style={{
          width: '100%',
          borderRadius: 6,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px'
        }}
      >
        <div
          style={{
            padding: '3rem'
          }}
        >
          <div style={{ padding: '6px 0' }}>
            <strong>Nº DE Registro: </strong>
            <span>{ticket.input.number}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Id. Do Centro: </strong>
            <span>{ticket.user.company.code}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Identificação da Recepcionista: </strong>
            <span>{ticket.user.username}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Data de entrada: </strong>
            <span>{ticket.input.createdDateTime.dateLong}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Horário: </strong>
            <span>{ticket.input.createdDateTime.timeLong}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10
            }}
          >
            <Button
              style={{
                color: '#2469ce'
              }}
              onClick={divPrint}
            >
              Imprimir
            </Button>
            <Button href='/vdf'>Seguir para o acompanhamento</Button>
          </div>
        </div>
      </Box>
    );
  }
  function handlePeople() {
    return (
      <Box
        style={{
          marginTop: 30,
          display: 'flex',
          gap: 15,
          width: '100%'
        }}
      >
        <Box
          style={{
            width: '100%',
            borderRadius: 6,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px'
          }}
        >
          <div
            style={{
              padding: 10
            }}
          >
            <div style={{ padding: '6px 0' }}>
              <strong>Nome da vítima: </strong>
              <span>{ticket.victim.person.name}</span>
            </div>
          </div>
        </Box>
        <Box
          style={{
            width: '100%',
            borderRadius: 6,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px'
          }}
        >
          <div
            style={{
              padding: 10
            }}
          >
            <div style={{ padding: '6px 0' }}>
              <strong>Nome do Agressor: </strong>
              <span>{ticket.aggressor.person.name}</span>
            </div>
          </div>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{
          margin: 50,
          display: 'flex'
        }}
      >
        {handleTicket()}
        {handlePeople()}
      </Box>
    </Box>
  );
}
