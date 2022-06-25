import { Box, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineLogin as LoginIcon } from 'react-icons/ai';
import { BiUserCircle as UserIcon } from 'react-icons/bi';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { FormStatus } from '~/app/domain/models';
import { LoadForms } from '~/app/domain/usecases';
import { Fn } from '~/app/infra/utils';
import { Link } from '~/app/presentation/components';
import useStyles from './public-forms-styles';

type PublicFormsComponentProps = LoadForms.Response & {
  loadForms: LoadForms;
};

export default function PublicFormsComponent({
  data,
  loadForms,
  logged
}: PublicFormsComponentProps) {
  const [state, setState] = useState({
    forms: data
  });

  function handleRehydrateForms(name?: string) {
    loadForms
      .loadAll({ name })
      .then(({ data }: LoadForms.Response) =>
        setState(prevState => ({
          ...prevState,
          forms: data
        }))
      )
      .catch(console.error);
  }

  async function handleSearchByName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    handleRehydrateForms(value);
  }

  const classes = useStyles();

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(243, 244, 249)'
      }}
    >
      <header className={classes.header}>
        <Box display='flex' alignItems='center'>
          <Box>
            <Box
              style={{
                width: 25,
                height: 3,
                margin: 5,
                borderRadius: 10,
                transition: 'width 0.3s ease 0s',
                backgroundColor: 'rgb(36, 153, 239)'
              }}
            />
            <Box
              style={{
                height: 3,
                margin: 5,
                borderRadius: 10,
                transition: 'width 0.3s ease 0s',
                backgroundColor: 'rgb(36, 153, 239)',
                width: 15
              }}
            />
            <Box
              style={{
                width: 25,
                height: 3,
                margin: 5,
                borderRadius: 10,
                transition: 'width 0.3s ease 0s',
                backgroundColor: 'rgb(36, 153, 239)'
              }}
            />
          </Box>
          <Typography variant='h2' component='h1' className={classes.title}>
            eForm
          </Typography>
        </Box>

        <Box
          style={{
            display: 'flex',
            height: 44,
            width: 415.95,
            borderRadius: 5,
            border: '1px solid #E9E9E9',
            backgroundColor: 'white'
          }}
        >
          <Box
            style={{
              padding: 12
            }}
          >
            <SearchIcon size={16} />
          </Box>
          <DebounceInput
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              borderRadius: 5
            }}
            debounceTimeout={1000}
            onChange={handleSearchByName}
            placeholder='Pesquisar pelo nome do formulário'
          />
        </Box>

        {logged ? (
          <UserIcon size={32} fill={'#1D2438'} />
        ) : (
          <Link href={`/login`}>
            <LoginIcon size={32} fill={'#1D2438'} />
          </Link>
        )}
      </header>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          style={{
            display: 'flex',
            width: '60%',
            justifyContent: 'center',
            margin: '24px 0'
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {state.forms.map(form => (
              <Grid item xs={2} sm={4} md={4} key={form.id}>
                <Paper elevation={0} className={classes.paper}>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <small
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: 1.5,
                          textTransform: 'none',
                          whiteSpace: 'normal'
                        }}
                      >
                        {Fn.dateFormat(form.updatedAt)}
                      </small>
                    </Box>
                    <Box
                      style={{
                        textAlign: 'center',
                        paddingTop: 48,
                        paddingBottom: 32
                      }}
                    >
                      <Typography component='h3' className={classes.h3}>
                        {form.name}
                      </Typography>
                      <Typography component='h6' className={classes.h6}>
                        {form.status}
                      </Typography>
                    </Box>
                    <span
                      style={{
                        display: 'block',
                        height: 4,
                        borderRadius: 3,
                        backgroundColor: 'rgb(229, 234, 242)'
                      }}
                    />
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '1.5rem'
                      }}
                    >
                      {form.status === FormStatus.PUBLISHED ? (
                        <Link href={`/${form.id}`} className={classes.link}>
                          <small>Preencher</small>
                        </Link>
                      ) : (
                        <small className={classes.unpublished}>Preencher</small>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
