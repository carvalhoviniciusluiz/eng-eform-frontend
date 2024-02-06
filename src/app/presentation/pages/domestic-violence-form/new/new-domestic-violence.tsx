import { LoadFullForms } from '~/app/domain/usecases';
import Header from './header';
import PersonForm from './person-form';
import ShowForms from './show-forms';

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

export default function NewDomesticViolenceComponent({ data }: Props) {
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

      <TabPanel value={value} index={0}>
        <PersonForm id='victim' caption='Cadastro de vítima' />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PersonForm id='aggressor' caption='Cadastro de agressor' />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowForms data={data} />
      </TabPanel>
    </Box>
  );
}
