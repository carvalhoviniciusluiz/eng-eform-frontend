import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { AiFillSave as SaveIcon } from 'react-icons/ai';
import { AddFormInput, GetCep, LoadFullForms } from '~/app/domain/usecases';
import { Toast } from '~/app/presentation/components';
import DisplayQuestionsForm from './display-questions-form';
import Header from './header';
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
  addFormInput
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
      alert('Você não informou o nome da vítima');
      return;
    }
    if (aggressorPerson.name === '') {
      alert('Você não informou o nome da agressor');
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
      .then(console.log)
      .catch(console.error);
  }
  return (
    <Box>
      <AppBar position='static' color='transparent'>
        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
          <Tab label='Vítima' />
          <Tab label='Agressor' />
          <Tab label='Fixa de atendimento' />
        </Tabs>
      </AppBar>
      <Header />
      <Box style={{ marginBottom: '12rem' }}>
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
          />
        </TabPanel>

        <Toast
          open
          type='success'
          message='This is an error alert with a custom background color'
        />

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
