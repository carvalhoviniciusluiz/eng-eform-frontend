import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { AiOutlineEdit as EditIcon } from 'react-icons/ai'
import { CgFormatSeparator as FieldIcon } from 'react-icons/cg'
import {
  MdClose as CloseIcon,
  MdKeyboardArrowRight as ArrowRightIcon,
  MdOutlineHorizontalSplit as BuildIcon,
  MdSearch as SearchIcon,
  MdSegment as FormIcon
} from 'react-icons/md'
import { DeleteSurvey, LoadSurveys } from '~/app/domain/usecases'
import { SurveyListProps } from '~/app/main/factories/pages'
import {
  AlertDialog,
  BarAction,
  Breadcrumbs,
  Link
} from '~/app/presentation/components'
import useStyles from './list-styles'

type SurveyListComponentProps = SurveyListProps &
  LoadSurveys.Response & {
    loadSurveys: LoadSurveys
    deleteSurvey: DeleteSurvey
  }

export default function SurveyListComponent({
  data,
  parentForm,
  loadSurveys,
  deleteSurvey
}: SurveyListComponentProps) {
  const [state, setState] = useState({
    surveys: data,
    open: false,
    destroy: false,
    surveyId: ''
  })

  function handleRehydrateSurveys(name?: string) {
    loadSurveys
      .loadAll({ name })
      .then(({ data }: LoadSurveys.Response) =>
        setState((prevState) => ({
          ...prevState,
          surveys: data
        }))
      )
      .catch(console.error)
  }

  function handleDestroy(surveyId: string) {
    setState((prevState) => ({
      ...prevState,
      open: true,
      surveyId
    }))
  }

  async function handleSearchByName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target
    handleRehydrateSurveys(value)
  }

  useEffect(() => {
    const hasSurveyId = !!state.surveyId
    if (state.destroy && hasSurveyId) {
      deleteSurvey.delete(state.surveyId).then(() => {
        setState((prevState) => ({
          ...prevState,
          surveys: state.surveys.filter(
            (survey) => survey.id !== state.surveyId
          ),
          open: false,
          destroy: false,
          surveyId: ''
        }))
      })
    }
  }, [state.destroy]) // eslint-disable-line

  const classes = useStyles()

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Link
              style={{
                color: '#B5B5B5',
                textDecoration: 'none'
              }}
              href='/forms'
            >
              Gerenciar Formulários
            </Link>

            <Typography>Enquetes</Typography>
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
              display='flex'
              alignItems='center'
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              {parentForm.name} <ArrowRightIcon /> Enquetes
            </Typography>
          </Box>
        </Box>

        <Link
          className={classes.btnNew}
          href={`/forms/${parentForm.id}/surveys/new`}
        >
          Cadastrar enquete
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
            placeholder='Pesquisar pelo nome da enquete'
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

        <ul
          style={{
            position: 'relative',
            listStyleType: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridGap: 17
          }}
        >
          {state.surveys.map((survey) => (
            <li className={classes.line} key={survey.id}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                className='showcase'
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
                        margin: 16,
                        fontSize: 16,
                        letterSpacing: 0.2,
                        textAlign: 'center'
                      }}
                      component='h1'
                    >
                      {survey.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box display='flex' justifyContent='center'>
                <Link
                  className={classes.action}
                  href={`/forms/${parentForm.id}/surveys/${survey.id}`}
                >
                  <BuildIcon fill='#C8C8C8' size={32} />
                </Link>

                <Link
                  className={classes.action}
                  href={`/forms/${parentForm.id}/surveys/${survey.id}/fields`}
                >
                  <FieldIcon size={32} className={classes.fieldIcon} />
                </Link>

                <Link
                  className={classes.action}
                  href={`/forms/${parentForm.id}/surveys/${survey.id}/edit`}
                >
                  <EditIcon fill='#C8C8C8' size={32} />
                </Link>

                <button
                  className={classes.delete}
                  onClick={() => handleDestroy(survey.id)}
                >
                  <CloseIcon fill='#C8C8C8' size={32} />
                </button>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </>
  )
}
