import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { AiOutlineEdit as EditIcon } from 'react-icons/ai'
import {
  MdClose as CloseIcon,
  MdSearch as SearchIcon,
  MdSegment as FormIcon
} from 'react-icons/md'
import { DeleteForm, LoadForms } from '~/app/domain/usecases'
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components'

type FormListProps = LoadForms.Response & {
  loadForms: LoadForms
  deleteForm: DeleteForm
}

export default function FormList({
  data,
  loadForms,
  deleteForm
}: FormListProps) {
  const [state, setState] = useState({
    forms: data
  })

  function handleRehydrateForms(name?: string) {
    loadForms
      .loadAll({ name })
      .then(({ data }: LoadForms.Response) =>
        setState((prevState) => ({
          ...prevState,
          forms: data
        }))
      )
      .catch(console.error)
  }

  function handleDestroy(formId: string) {
    deleteForm.delete(formId).then(() => {
      setState((prevState) => ({
        ...prevState,
        forms: state.forms.filter((form) => form.id !== formId)
      }))
    })
  }

  async function handleSearchByName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target
    handleRehydrateForms(value)
  }

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Typography>Gerenciar Formulários</Typography>
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
              Gerenciar Formulários
            </Typography>
          </Box>
        </Box>

        <Link
          style={{
            color: 'white',
            width: 200,
            height: 56,
            borderRadius: 4,
            backgroundColor: '#2469ce',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            letterSpacing: 0.2,
            fontSize: 14,
            textDecoration: 'none'
          }}
          href='/forms/new'
        >
          Cadastrar formulário
        </Link>
      </BarAction>

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

        <ul
          style={{
            margin: 0,
            listStyleType: 'none'
          }}
        >
          {state.forms.map((form) => (
            <li
              style={{
                width: 613,
                border: '1px solid #E9E9E9',
                borderRadius: 6,
                marginTop: 16
              }}
              key={form.id}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Box
                  style={{
                    margin: '9px 27px 9px 30px'
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '26rem'
                      }}
                    >
                      <Typography component='h1' fontSize={16}>
                        {form.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Link href={`/forms/edit/${form.id}`}>
                    <EditIcon fill='#C8C8C8' size={32} />
                  </Link>
                  <button
                    style={{
                      margin: '0 30px',
                      border: 0,
                      background: 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleDestroy(form.id)}
                  >
                    <CloseIcon fill='#C8C8C8' size={32} />
                  </button>
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </>
  )
}
