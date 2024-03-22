import {
  AlertColor,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Paper
} from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillSave as SaveIcon } from 'react-icons/ai';
import {
  GetFormByProcessNumber,
  PostFormInputByProcessNumber
} from '~/app/domain/usecases';
import { errorHandler } from '~/app/infra/error';
import { Toast } from '~/app/presentation/components';
import { BuildForm } from '../shared';
import useStyles from './form-input-styles';
import Header from './header';

type Props = {
  ticket: GetFormByProcessNumber.Output;
  forms: GetFormByProcessNumber.Form[];
  postFormInputByProcessNumber: PostFormInputByProcessNumber;
};

export default function FormInputComponent({
  ticket,
  forms,
  postFormInputByProcessNumber
}: Props) {
  const [form] = useState<GetFormByProcessNumber.Form>(() => forms[0]);
  const [warn, setWarn] = useState({
    type: '',
    title: '',
    message: '',
    open: false
  });
  const [questions, setQuestions] = useState({});
  const classes = useStyles();
  const router = useRouter();
  function handleSubmit() {
    postFormInputByProcessNumber
      .execute({
        processNumber: ticket.input.number,
        questions: questions
      })
      .then(() => router.push('/vdf'))
      .catch(async error => {
        setWarn(() => ({
          ...errorHandler(error),
          type: 'error',
          open: true
        }));
      });
  }
  function handleTicket() {
    const divPrint = () => {
      const content = document.querySelector('.printing-card')?.innerHTML;
      const windowContant = window.open('', '', 'height=600,width=800');
      if (windowContant) {
        windowContant.document.write(
          '<html><head><title>Cartão de Impressão</title></head><body>'
        );
        windowContant.document.write(
          '<style>@media print { a, button { display: none; } }</style>'
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
      <Toast
        type={warn.type as AlertColor}
        title={warn.title}
        message={warn.message}
        open={warn.open}
      />
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
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 8,
            background: '#F5F5F5',
            borderRadius: 4,
            marginTop: '3rem',
            marginBottom: '8rem'
          }}
        >
          {form.questions.map((question, index) => (
            <BuildForm
              key={index}
              defaultExpanded
              question={question}
              submit={selectedQuestions => {
                setQuestions(prevState => {
                  const updatedQuestions: any = { ...prevState };
                  for (const questionId in selectedQuestions) {
                    if (prevState.hasOwnProperty(form.id)) {
                      updatedQuestions[form.id][questionId] =
                        selectedQuestions[questionId];
                    } else {
                      updatedQuestions[form.id] = {
                        [questionId]: selectedQuestions[questionId]
                      };
                    }
                  }
                  return updatedQuestions;
                });
              }}
            />
          ))}
        </Paper>
      </Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation style={{ height: 100 }} showLabels>
          <BottomNavigationAction
            label='Salvar'
            icon={<SaveIcon fontSize={44} />}
            onClick={handleSubmit}
            disabled={false}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
