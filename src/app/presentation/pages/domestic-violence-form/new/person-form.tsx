import { Box, Paper, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { GetCep, LoadFullForms } from '~/app/domain/usecases';
import { MaskField, TextInput } from '~/app/presentation/components/custom';
import BuildForm from './build-form';
import PersonAddressForm from './person-address-form';
import PersonContactForm from './person-contact-form';
import PersonDocumentForm from './person-document-form';

type PersonAddress = {
  id: string;
  number?: string;
  zipCode?: string;
  publicPlace?: string;
  neighborhood?: string;
  neighborhoodComplement?: string;
  city?: string;
  county?: string;
};

type PersonDocument = {
  id: string;
  documentType?: string;
  documentNumber?: string;
  shippingDate?: string;
};

type PersonContact = {
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
  documentsSubmit: (value: PersonDocument[]) => void;
  adressesSubmit: (value: PersonAddress[]) => void;
  contactsSubmit: (value: PersonContact[]) => void;
  questionsSubmit: (value: any) => void;
  personSubmit: (value: any) => void;
};

function PersonForm({
  id,
  caption,
  generalInformationsForm,
  onGetCep,
  documentsSubmit,
  adressesSubmit,
  contactsSubmit,
  questionsSubmit,
  personSubmit
}: Props) {
  const [tabValue, setTabValue] = useState(0);
  const [person, setPerson] = useState(() => ({
    id: crypto.randomUUID(),
    name: '',
    socialName: '',
    birthDate: ''
  }));
  const [documents, seDocuments] = useState<PersonDocument[]>([
    { id: crypto.randomUUID() }
  ]);
  const [adresses, seAdresses] = useState<PersonAddress[]>([
    { id: crypto.randomUUID() }
  ]);
  const [contacts, seContacts] = useState<PersonContact[]>([
    { id: crypto.randomUUID() }
  ]);
  const [questions, setQuestions] = useState({});
  useEffect(() => {
    personSubmit(person);
  }, [person]);
  useEffect(() => {
    documentsSubmit(documents);
  }, [documents]);
  useEffect(() => {
    adressesSubmit(adresses);
  }, [adresses]);
  useEffect(() => {
    contactsSubmit(contacts);
  }, [contacts]);
  useEffect(() => {
    questionsSubmit(questions);
  }, [questions]);
  function handleChange(event: React.SyntheticEvent, newTabValue: number) {
    setTabValue(newTabValue);
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
  function handleGeneralInformationForm() {
    return (
      <TabPanel value={tabValue} index={0}>
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
              question={question}
              submit={selectedQuestions => {
                setQuestions(prevState => {
                  return {
                    ...prevState,
                    ...selectedQuestions
                  };
                });
              }}
            />
          ))}
        </Paper>
      </TabPanel>
    );
  }
  function handleAddressUpdate(value: GetCep.Address) {
    seAdresses(prevState => {
      const addressIndex = prevState.findIndex(item => item.id === value.id!);
      if (addressIndex !== -1) {
        prevState[addressIndex] = { ...value, id: value.id! };
      }
      return [...prevState];
    });
  }
  function handleAdressesForm() {
    return (
      <TabPanel value={tabValue} index={1}>
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
            <PersonAddressForm
              data={address}
              onGetCep={onGetCep}
              onAdd={handleOnAddNewAddress}
              onRemove={handleOnRemoveAddress}
              removeDisabled={adresses.length < 2}
              submit={handleAddressUpdate}
            />
          </Paper>
        ))}
      </TabPanel>
    );
  }
  function handleDocumentsUpdate(value: PersonDocument) {
    seDocuments(prevState => {
      const documentIndex = prevState.findIndex(item => item.id === value.id);
      if (documentIndex !== -1) {
        prevState[documentIndex] = { ...value };
      }
      return [...prevState];
    });
  }
  function handleDocumentsForm() {
    return (
      <TabPanel value={tabValue} index={2}>
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
            <PersonDocumentForm
              data={document}
              onAdd={handleOnAddNewDocument}
              onRemove={handleOnRemoveDocument}
              removeDisabled={documents.length < 2}
              submit={handleDocumentsUpdate}
            />
          </Paper>
        ))}
      </TabPanel>
    );
  }
  function handleContactsUpdate(value: PersonContact) {
    seContacts(prevState => {
      const contactIndex = prevState.findIndex(item => item.id === value.id);
      if (contactIndex !== -1) {
        prevState[contactIndex] = { ...value };
      }
      return [...prevState];
    });
  }
  function handleContactsForm() {
    return (
      <TabPanel value={tabValue} index={3}>
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
            <PersonContactForm
              data={contact}
              onAdd={handleOnAddNewContact}
              onRemove={handleOnRemoveContact}
              removeDisabled={contacts.length < 2}
              submit={handleContactsUpdate}
            />
          </Paper>
        ))}
      </TabPanel>
    );
  }
  function displayPanelPlaces() {
    return (
      <>
        <Tabs value={tabValue} onChange={handleChange} variant='fullWidth'>
          <Tab label={generalInformationsForm.name} />
          <Tab label='Endereço' />
          <Tab label='Documentos' />
          <Tab label='Contatos' />
        </Tabs>
        {handleGeneralInformationForm()}
        {handleAdressesForm()}
        {handleDocumentsForm()}
        {handleContactsForm()}
      </>
    );
  }
  function displayPersonForm() {
    return (
      <Box>
        <Box
          style={{
            margin: '72px 0 73px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography style={{ fontSize: 24 }}>{caption}</Typography>
        </Box>
        <TextInput
          id={id}
          name='name'
          label='Nome completo'
          required
          onChange={event =>
            setPerson(prevState => ({
              ...prevState,
              name: event.target.value
            }))
          }
        />
        <TextInput
          id={id}
          name='socialName'
          label='Nome social'
          onChange={event =>
            setPerson(prevState => ({
              ...prevState,
              socialName: event.target.value
            }))
          }
        />
        <MaskField
          id={id}
          name='birthDate'
          label='Data de nascimento'
          mask='date'
          onChange={event =>
            setPerson(prevState => ({
              ...prevState,
              birthDate: event.target.value
            }))
          }
        />
      </Box>
    );
  }
  return (
    <Box style={{ margin: 80 }}>
      {displayPersonForm()}
      {displayPanelPlaces()}
    </Box>
  );
}

export default PersonForm;
