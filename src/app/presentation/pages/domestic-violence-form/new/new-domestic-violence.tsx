import { AiFillSave as SaveIcon } from 'react-icons/ai';
import { LoadFullForms } from '~/app/domain/usecases';
import Header from './header';
import PersonForm from './person-form';
import ShowForms from './show-forms';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

type Props = {
  data: LoadFullForms.Response;
};

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

const GENERAL_INFORMATION_FORM_ID = 'f594187f-504c-4266-b313-6d1fb19bb197';

export default function NewDomesticViolenceComponent({ data }: Props) {
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PersonForm
            id='aggressor'
            caption='Cadastro de agressor'
            generalInformationsForm={state.generalInformationsForm}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ShowForms data={state.forms} />
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
            onClick={() => console.log('saved')}
            disabled={false}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
