import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormProps, useForm } from 'react-hook-form';
import { Authentication } from '~/app/domain/usecases';
import { Link, PasswordField, TextField } from '~/app/presentation/components';

type LoginComponentProps = {
  validation: UseFormProps<Authentication.Params>;
  authentication: Authentication;
};

export default function LoginComponent({
  validation,
  authentication
}: LoginComponentProps) {
  const { control, handleSubmit, formState } =
    useForm<Authentication.Params>(validation);

  const router = useRouter();

  async function onSubmit(params: Authentication.Params) {
    authentication
      .signIn(params)
      .then(() => {
        router.push('/vdf');
      })
      .catch(console.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        component='h1'
        style={{
          marginBottom: 48,
          fontSize: 24
        }}
      >
        Entrar no e-form!
      </Typography>

      <Box
        style={{
          height: 49 + 78
        }}
      >
        <label htmlFor='name'>E-mail</label>
        <TextField
          style={{
            marginTop: 8
          }}
          label='Digite seu e-mail'
          name='email'
          control={control}
        />
      </Box>

      <Box
        style={{
          height: 52 + 78
        }}
      >
        <label htmlFor='password'>Senha</label>
        <PasswordField
          style={{
            marginTop: 8
          }}
          label='Digite sua senha'
          name='password'
          control={control}
        />
      </Box>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button
          type='submit'
          style={{
            color: 'white',
            width: 200,
            height: 56,
            marginBottom: 40,
            backgroundColor: '#2469ce'
          }}
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting && <span />}
          Login
        </Button>

        <Typography
          component='span'
          style={{
            fontSize: 14,
            lineHeight: '120%',
            letterSpacing: 0.2
          }}
        >
          Ainda não tem conta?
        </Typography>
        <Link
          style={{
            margin: '8px 0',
            fontSize: 16
          }}
          href='/register'
        >
          Cadastre-se
        </Link>
      </Box>
    </form>
  );
}
