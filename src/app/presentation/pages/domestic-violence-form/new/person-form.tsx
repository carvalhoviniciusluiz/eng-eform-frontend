import { Box, Paper, Typography } from '@mui/material';
import { FaRegSave as SaveIcon } from 'react-icons/fa';
import { DateField, TextInput } from '~/app/presentation/components/custom';
import makeStyles from './form-styles';
import PersonAddress from './person-address';
import PersonContact from './person-contact';
import PersonDocument from './person-document';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

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
  id: string;
  caption: string;
};

function PersonForm({ id, caption }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const classes = makeStyles();

  return (
    <Box style={{ margin: 80 }}>
      <Box>
        <Box
          style={{
            margin: '72px 0 73px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            style={{
              fontSize: 24
            }}
          >
            {caption}
          </Typography>

          <button className={classes.btnSave}>
            <SaveIcon size={20} fill='white' />
            <span
              style={{
                marginLeft: 13,
                color: 'white'
              }}
            >
              Salvar formulário
            </span>
          </button>
        </Box>

        <TextInput id={id} name='name' label='Nome completo' />
        <TextInput id={id} name='socialName' label='Nome social' />
        <DateField id={id} name='birthdate' label='Data de nascimento' />
      </Box>

      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        <Tab label='Endereço' />
        <Tab label='Documentos pessoais' />
        <Tab label='Contatos' />
      </Tabs>

      <TabPanel value={value} index={0}>
        {[{ id: 1 }].map(document => (
          <Paper
            key={`${id}-${document.id}-address`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              background: '#f8fafb',
              borderRadius: 4,
              margin: '3rem 0'
            }}
          >
            <PersonAddress id={`${id}-address`} />
          </Paper>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {[{ id: 1 }].map(document => (
          <Paper
            key={`${id}-${document.id}-document`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              background: '#f8fafb',
              borderRadius: 4,
              margin: '3rem 0'
            }}
          >
            <PersonDocument id={`${id}-document`} />
          </Paper>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {[{ id: 1 }].map(document => (
          <Paper
            key={`${id}-${document.id}-contact`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              background: '#f8fafb',
              borderRadius: 4,
              margin: '3rem 0'
            }}
          >
            <PersonContact id={`${id}-contact`} />
          </Paper>
        ))}
      </TabPanel>
    </Box>
  );
}

export default PersonForm;
