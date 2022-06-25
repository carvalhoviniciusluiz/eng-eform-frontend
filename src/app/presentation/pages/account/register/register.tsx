import { Box, Button, Checkbox, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm, UseFormProps } from 'react-hook-form';
import { Register as RegisterUseCase } from '~/app/domain/usecases';
import { Link, PasswordField, TextField } from '~/app/presentation/components';

type RegisterComponentProps = {
  validation: UseFormProps<RegisterUseCase.Params>;
  register: RegisterUseCase;
};

export default function RegisterComponent({
  validation,
  register
}: RegisterComponentProps) {
  const { control, handleSubmit, formState } =
    useForm<RegisterUseCase.Params>(validation);

  const router = useRouter();

  function onSubmit(params: RegisterUseCase.Params) {
    register
      .signUp(params)
      .then(() => {
        router.push('/login');
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
        Crie uma conta!
      </Typography>

      <Box
        style={{
          height: 49 + 78
        }}
      >
        <label htmlFor='email'>E-mail</label>
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
          height: 22 + 78
        }}
      >
        <label htmlFor='password'>Senha</label>
        <PasswordField
          style={{
            marginTop: 8
          }}
          label='Crie sua senha'
          name='password'
          control={control}
        />
      </Box>

      <label style={{ display: 'flex' }}>
        <Checkbox defaultChecked />
        <Typography
          component='span'
          style={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '120%',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: 0.2
          }}
        >
          Aceito os Termos e Condições e autorizo o uso de meus dados de acordo
          com a Declaração de Privacidade.
        </Typography>
      </label>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 48
        }}
      >
        <Button
          type='submit'
          style={{
            color: 'white',
            width: 200,
            height: 56,
            backgroundColor: '#2469ce'
          }}
          disabled={formState.isSubmitting}
        >
          Criar conta
        </Button>
        <Link
          style={{
            margin: '8px 0'
          }}
          href='/login'
        >
          Já tenho um conta!
        </Link>
      </Box>
    </form>
  );
}
