import { Alert, AlertTitle, Box, Collapse, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { FaRegSave as SaveIcon } from 'react-icons/fa';
import { AddForm } from '~/app/domain/usecases';
import { BarAction, Breadcrumbs } from '~/app/presentation/components';
import { FormTag } from '~/app/presentation/pages/form/components';

type NewFormComponentProps = {
  validation: UseFormProps<AddForm.Params>;
  addForm: AddForm;
};

export default function NewFormComponent({
  validation,
  addForm
}: NewFormComponentProps) {
  const { control, handleSubmit, formState } =
    useForm<AddForm.Params>(validation);

  const [state, setState] = useState({
    showAlert: false
  });

  const router = useRouter();

  async function onSubmit(params: AddForm.Params) {
    addForm
      .add(params)
      .then(() => {
        router.push('/forms');
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          showAlert: true
        }));
      });
  }

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Typography>Cadastrar formulário</Typography>
          </Breadcrumbs>

          <Box
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SaveIcon size={24} />

            <Typography
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              Cadastrar formulário
            </Typography>
          </Box>
        </Box>

        <Collapse in={state.showAlert}>
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Usuário Master — <strong>Sem empresa</strong>
          </Alert>
        </Collapse>
      </BarAction>

      <FormTag
        title='Novo formulário'
        isSubmitting={formState.isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </>
  );
}
