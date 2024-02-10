import { Box, Paper, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { GetCep, LoadFullForms } from '~/app/domain/usecases';
import { DateField, TextInput } from '~/app/presentation/components/custom';
import BuildForm from './build-form';
import PersonAddress from './person-address';
import PersonContact from './person-contact';
import PersonDocument from './person-document';

type Address = {
  id: string;
  number?: string;
  zipCode?: string;
  publicPlace?: string;
  neighborhood?: string;
  neighborhoodComplement?: string;
  city?: string;
  county?: string;
};

type Document = {
  id: string;
  documentType?: string;
  documentNumber?: string;
  shippingDate?: string;
};

type Contact = {
  id: string;
  contactType?: string;
  contact?: string;
};

type TabPanelProps = {
  children?: React.ReactNode;
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
  generalInformationsForm: LoadFullForms.Form;
  onGetCep: (cep: string) => Promise<GetCep.Address | undefined>;
};

function PersonForm({ id, caption, generalInformationsForm, onGetCep }: Props) {
  const [value, setValue] = useState(0);
  const [documents, seDocuments] = useState<Document[]>([
    { id: crypto.randomUUID() }
  ]);
  const [adresses, seAdresses] = useState<Address[]>([
    { id: crypto.randomUUID() }
  ]);
  const [contacts, seContacts] = useState<Contact[]>([
    { id: crypto.randomUUID() }
  ]);

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  function handleOnAddNewAddress() {
    seAdresses(prevState => [...prevState, { id: crypto.randomUUID() }]);
  }

  function handleOnRemoveAddress(addressId: string) {
    seAdresses(prevState => {
      const adressesFiltered = prevState.filter(
        address => address.id !== addressId
      );
      return [...adressesFiltered];
    });
  }

  function handleOnAddNewDocument() {
    seDocuments(prevState => [...prevState, { id: crypto.randomUUID() }]);
  }

  function handleOnRemoveDocument(documentId: string) {
    seDocuments(prevState => {
      const documentsFiltered = prevState.filter(
        document => document.id !== documentId
      );
      return [...documentsFiltered];
    });
  }

  function handleOnAddNewContact() {
    seContacts(prevState => [...prevState, { id: crypto.randomUUID() }]);
  }

  function handleOnRemoveContact(contactId: string) {
    seContacts(prevState => {
      const contactsFiltered = prevState.filter(
        contact => contact.id !== contactId
      );
      return [...contactsFiltered];
    });
  }

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
        </Box>
        <TextInput id={id} name='name' label='Nome completo' />
        <TextInput id={id} name='socialName' label='Nome social' />
        <DateField id={id} name='birthdate' label='Data de nascimento' />
      </Box>
      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        <Tab label={generalInformationsForm.name} />
        <Tab label='Endereço' />
        <Tab label='Documentos pessoais' />
        <Tab label='Contatos' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Paper
          key={`${id}-${generalInformationsForm.id}-general-infomations`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 8,
            background: '#f8fafb',
            borderRadius: 4,
            margin: '3rem 0'
          }}
        >
          {generalInformationsForm.questions.map((question, index) => (
            <BuildForm
              key={index}
              form={generalInformationsForm}
              question={question}
            />
          ))}
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {adresses.map(address => (
          <Paper
            key={`${id}-${address.id}-address`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              background: '#f8fafb',
              borderRadius: 4,
              margin: '3rem 0'
            }}
          >
            <PersonAddress
              address={address}
              onGetCep={onGetCep}
              onAdd={handleOnAddNewAddress}
              onRemove={handleOnRemoveAddress}
              removeDisabled={adresses.length < 2}
            />
          </Paper>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {documents.map(document => (
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
            <PersonDocument
              document={document}
              onAdd={handleOnAddNewDocument}
              onRemove={handleOnRemoveDocument}
              removeDisabled={documents.length < 2}
            />
          </Paper>
        ))}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {contacts.map(contact => (
          <Paper
            key={`${id}-${contact.id}-contact`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              background: '#f8fafb',
              borderRadius: 4,
              margin: '3rem 0'
            }}
          >
            <PersonContact
              contact={contact}
              onAdd={handleOnAddNewContact}
              onRemove={handleOnRemoveContact}
              removeDisabled={contacts.length < 2}
            />
          </Paper>
        ))}
      </TabPanel>
    </Box>
  );
}

export default PersonForm;
