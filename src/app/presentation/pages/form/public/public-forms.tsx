import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { MdSearch as SearchIcon, MdSegment as FormIcon } from 'react-icons/md'
import { LoadForms } from '~/app/domain/usecases'
import { BarAction, Breadcrumbs } from '~/app/presentation/components'

type PublicFormsComponentProps = LoadForms.Response & {
  loadForms: LoadForms
}

export default function PublicFormsComponent({
  data,
  loadForms
}: PublicFormsComponentProps) {
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
            <Typography>Forms</Typography>
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
              Formulários
            </Typography>
          </Box>
        </Box>
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
            margin: '40px 0'
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
            listStyleType: 'none',
            margin: 0,
            padding: 0
          }}
        >
          {state.forms.map((form) => (
            <li key={form.id}>
              <Box
                style={{
                  cursor: 'pointer'
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
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      style={{
                        marginTop: 16,
                        fontSize: 16,
                        letterSpacing: 0.2,
                        textTransform: 'uppercase',
                        textAlign: 'center'
                      }}
                      component='h1'
                    >
                      {form.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </>
  )
}
