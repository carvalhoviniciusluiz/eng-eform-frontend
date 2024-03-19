import {
  AlertColor,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Paper
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { AiFillSave as SaveIcon } from 'react-icons/ai';
import {
  AddFormInput,
  GetCep,
  GetPerson,
  LoadFullForms
} from '~/app/domain/usecases';
import { errorHandler } from '~/app/infra/error';
import { Link, Toast } from '~/app/presentation/components';
import DisplayQuestionsForm from './display-questions-form';
import Header from './header';
import useStyles from './new-styles';
import PersonForm from './person-form';

type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}

type Props = {
  getCep: GetCep;
  data: LoadFullForms.Response;
  addFormInput: AddFormInput;
  getPerson: GetPerson;
};

/**
 * TODO:
 *
 * add consumer for data container
 *
 */

const GENERAL_INFORMATION_FORM_ID = 'f594187f-504c-4266-b313-6d1fb19bb197';

export default function NewDomesticViolenceComponent({
  getCep,
  data,
  addFormInput,
  getPerson
}: Props) {
  const [state] = useState(() => {
    const forms = data.filter(form => form.id !== GENERAL_INFORMATION_FORM_ID);
    const generalInformationsForm = data.filter(
      form => form.id === GENERAL_INFORMATION_FORM_ID
    )[0];
    return {
      forms,
      generalInformationsForm
    };
  });
  const [value, setValue] = useState(0);
  const [victimPerson, setVictimPerson] = useState<any>({});
  const [victimQuestions, setVictimQuestions] = useState({});
  const [victimAdresses, setVictimAdresses] = useState({});
  const [victimContacts, setVictimContacts] = useState({});
  const [victimDocuments, setVictimDocuments] = useState({});
  const [aggressorPerson, setAggressorPerson] = useState<any>({});
  const [aggressorQuestions, setAggressorQuestions] = useState({});
  const [aggressorAdresses, setAggressorAdresses] = useState({});
  const [aggressorContacts, setAggressorContacts] = useState({});
  const [aggressorDocuments, setAggressorDocuments] = useState({});
  const [questionsMainForm, setQuestionsMainForm] = useState({});
  const [responseMeta, setResponseMeta] = useState<AddFormInput.Output | null>(
    null
  );
  const [warn, setWarn] = useState({
    type: '',
    title: '',
    message: '',
    open: false
  });
  const classes = useStyles();
  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }
  async function handleGetCep(cep: string) {
    try {
      const output = await getCep.get(cep);
      return output;
    } catch (error) {
      console.error(error);
    }
  }
  function handleSubmit() {
    if (victimPerson.name === '') {
      setWarn(() => ({
        title: 'Aviso',
        message: 'Você não informou o nome da vítima',
        type: 'warning',
        open: true
      }));
      return;
    }
    if (aggressorPerson.name === '') {
      setWarn(() => ({
        title: 'Aviso',
        message: 'Você não informou o nome da agressor',
        type: 'warning',
        open: true
      }));
      return;
    }
    addFormInput
      .execute({
        victim: {
          person: victimPerson,
          questions: victimQuestions,
          adresses: victimAdresses,
          contacts: victimContacts,
          documents: victimDocuments
        },
        aggressor: {
          person: aggressorPerson,
          questions: aggressorQuestions,
          adresses: aggressorAdresses,
          contacts: aggressorContacts,
          documents: aggressorDocuments
        },
        mainForms: questionsMainForm
      } as any)
      .then(setResponseMeta)
      .catch(async error => {
        setWarn(() => ({
          ...errorHandler(error),
          type: 'error',
          open: true
        }));
        const [, , personId] = error.message.split('::');
        if (personId) {
          console.log(personId);
        }
      });
  }
  async function handlePersonSearch(value: string) {
    const hasValue = !!value;
    if (!hasValue) {
      setWarn(() => ({
        title: 'Aviso',
        message: 'Você deve digitar um nome e então clicar no botão',
        type: 'info',
        open: true
      }));
      return;
    }
    setWarn(() => ({
      title: '',
      message: '',
      type: '',
      open: false
    }));
    try {
      const output = await getPerson.execute({ name: value });
      return output;
    } catch (error: any) {
      setWarn(() => ({
        ...errorHandler(error),
        type: 'error',
        open: true
      }));
    }
  }
  function handleMainForm() {
    return (
      <Box>
        <Toast
          type={warn.type as AlertColor}
          title={warn.title}
          message={warn.message}
          open={warn.open}
        />
        <AppBar position='static' color='transparent'>
          <Tabs value={value} onChange={handleChange} variant='fullWidth'>
            <Tab label='Vítima' />
            <Tab label='Agressor' />
            <Tab label='Fixa de atendimento' />
          </Tabs>
        </AppBar>
        <Header />
        <Box
          style={{
            margin: '0 20%',
            marginBottom: '14rem'
          }}
        >
          <TabPanel value={value} index={0}>
            <PersonForm
              id='victim'
              caption='Cadastro de vítima'
              generalInformationsForm={state.generalInformationsForm}
              onGetCep={handleGetCep}
              adressesSubmit={setVictimAdresses}
              contactsSubmit={setVictimContacts}
              documentsSubmit={setVictimDocuments}
              questionsSubmit={setVictimQuestions}
              personSubmit={setVictimPerson}
              personSearch={handlePersonSearch}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PersonForm
              id='aggressor'
              caption='Cadastro de agressor'
              generalInformationsForm={state.generalInformationsForm}
              onGetCep={handleGetCep}
              adressesSubmit={setAggressorAdresses}
              contactsSubmit={setAggressorContacts}
              documentsSubmit={setAggressorDocuments}
              questionsSubmit={setAggressorQuestions}
              personSubmit={setAggressorPerson}
              personSearch={handlePersonSearch}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DisplayQuestionsForm
              data={state.forms}
              submit={setQuestionsMainForm}
            />
          </TabPanel>
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100
        }}
      >
        <div
          style={{
            border: '1px solid #2469ce',
            padding: 60
          }}
        >
          <div style={{ padding: '6px 0' }}>
            <strong>Nº DE Registro: </strong>
            <span>{responseMeta?.protocolNumber}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Id. Do Centro: </strong>
            <span>{responseMeta?.companyCurrent.code}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Identificação da Recepcionista: </strong>
            <span>{responseMeta?.receptionist.username}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Data de entrada: </strong>
            <span>{responseMeta?.createdDateTime.dateLong}</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            <strong>Horário: </strong>
            <span>{responseMeta?.createdDateTime.timeLong}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 33
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
          </div>
        </div>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={5}
          padding={7}
        >
          <a className={classes.btnNew} href='/vdf/new'>
            Novo questionário
          </a>
          <Link href='/vdf'>Seguir para o acompanhamento</Link>
        </Box>
      </Box>
    );
  }
  return <>{responseMeta ? handleTicket() : handleMainForm()}</>;
}
