import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import {
  MdOutlineHorizontalSplit as BuildIcon,
  MdClose as CloseIcon,
  MdSegment as FormIcon,
  MdSearch as SearchIcon,
  MdOutlineQueryStats as StatsIcon
} from 'react-icons/md';
import { RiUserSharedLine as UsersIcon } from 'react-icons/ri';
import { FormModel } from '~/app/domain/models';
import { DeleteForm, LoadForms } from '~/app/domain/usecases';
import {
  AlertDialog,
  BarAction,
  Breadcrumbs,
  Link
} from '~/app/presentation/components';
import useStyles from './list-styles';

type FormListComponentProps = LoadForms.Response & {
  loadForms: LoadForms;
  deleteForm: DeleteForm;
};

export default function FormListComponent({
  data,
  loadForms,
  deleteForm
}: FormListComponentProps) {
  const [state, setState] = useState({
    forms: data,
    open: false,
    destroy: false,
    formId: ''
  });
  const classes = useStyles();

  function handleRehydrateForms(name?: string) {
    loadForms
      .loadAll({ name, orderBy: 'updatedAt.desc' })
      .then(({ data }: LoadForms.Response) =>
        setState(prevState => ({
          ...prevState,
          forms: data
        }))
      )
      .catch(console.error);
  }

  function handleDestroy(formId: string) {
    setState(prevState => ({
      ...prevState,
      open: true,
      formId
    }));
  }

  async function handleSearchByName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    handleRehydrateForms(value);
  }

  function handleCreateLink(
    form: FormModel,
    options?: {
      addUserOption?: boolean;
      addStatOption?: boolean;
      addDeleteOption?: boolean;
    }
  ) {
    const {
      addUserOption = true,
      addStatOption = true,
      addDeleteOption = true
    } = options ?? {};
    return (
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} margin={'9px 27px 9px 30px'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box className={classes.title}>
              <Typography component='h1' fontSize={16}>
                {form.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          {addUserOption && (
            <Link
              className={classes.action}
              href={`/forms/${form.id}/users`}
              style={{
                marginRight: 10
              }}
            >
              <UsersIcon fill='#C8C8C8' size={32} />
            </Link>
          )}
          <Link className={classes.action} href={`/forms/${form.id}/questions`}>
            <BuildIcon fill='#C8C8C8' size={32} />
          </Link>
          <Link
            className={classes.action}
            style={{
              marginLeft: 10
            }}
            href={`/forms/${form.id}/edit`}
          >
            <EditIcon fill='#C8C8C8' size={32} />
          </Link>
          {addStatOption && (
            <Link
              className={classes.action}
              style={{
                marginLeft: 10
              }}
              href={`/forms/${form.id}/stats`}
            >
              <StatsIcon fill='#C8C8C8' size={32} />
            </Link>
          )}
          {addDeleteOption ? (
            <button
              className={classes.delete}
              onClick={() => handleDestroy(form.id)}
            >
              <CloseIcon fill='#C8C8C8' size={32} />
            </button>
          ) : (
            <div className={classes.delete} />
          )}
        </Box>
      </Box>
    );
  }

  useEffect(() => {
    const hasFormId = !!state.formId;
    if (state.destroy && hasFormId) {
      deleteForm.delete(state.formId).then(() => {
        setState(prevState => ({
          ...prevState,
          forms: state.forms.filter(form => form.id !== state.formId),
          open: false,
          destroy: false,
          formId: ''
        }));
      });
    }
  }, [state.destroy]); // eslint-disable-line

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Typography>Gerenciador</Typography>
          </Breadcrumbs>
          <Box
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormIcon size={23} />
            <Typography
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              Gerenciador
            </Typography>
          </Box>
        </Box>
        <Link className={classes.btnNew} href='/forms/new'>
          Cadastrar formulário
        </Link>
      </BarAction>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          style={{
            display: 'flex',
            height: 44,
            width: 415.95,
            borderRadius: 5,
            border: '1px solid #E9E9E9',
            margin: '40px 0 24px'
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
        <AlertDialog
          title='Confirmar delete?'
          state={state}
          setState={setState}
        >
          Esse registro poderá ser recuperado futuramente caso queira. Deseja
          remove-lo mesmo assim?
        </AlertDialog>
        {/* <div className={classes.line}>
          {handleCreateLink(
            {
              id: '',
              name: 'INFORMAÇÕES GERAIS'
            } as any,
            {
              addUserOption: false,
              addDeleteOption: false
            }
          )}
        </div>
        <hr
          style={{
            marginTop: 22,
            width: 600,
            border: '1px solid #e9e9e9'
          }}
        /> */}
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyleType: 'none'
          }}
        >
          {state.forms?.map(form => (
            <li className={classes.line} key={form.id}>
              {handleCreateLink(form)}
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
}
