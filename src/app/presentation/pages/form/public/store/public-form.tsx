import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { AiOutlineLogin as LoginIcon } from 'react-icons/ai';
import { BiUserCircle as UserIcon } from 'react-icons/bi';
import { GetForm } from '~/app/domain/usecases';
import { Link } from '~/app/presentation/components';
import useStyles from './public-form-styles';

type PublicFormComponentProps = GetForm.Props;

export default function PublicFormComponent({
  data,
  logged
}: PublicFormComponentProps) {
  const [state, setState] = useState(() => {
    const { surveys, ...form } = data;
    return {
      form,
      surveys
    };
  });

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
            {logged ? (
              <Link href={`/forms`} style={{ textDecoration: 'none' }}>
                eForm
              </Link>
            ) : (
              <>eForm</>
            )}
          </Typography>
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
            inputs
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
