import { Alert, AlertTitle, Box, Collapse, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegSave as SaveIcon } from 'react-icons/fa'
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md'
import { AddSurvey } from '~/app/domain/usecases'
import { NewSurveyProps } from '~/app/main/factories/pages'
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components'
import { SurveyFormTag } from '~/app/presentation/pages/survey/components'

type NewSurveyComponentProps = NewSurveyProps & {
  validation: any
  addSurvey: AddSurvey
}

export default function NewSurveyComponent({
  parentForm,
  validation,
  addSurvey
}: NewSurveyComponentProps) {
  const { control, handleSubmit, formState } =
    useForm<AddSurvey.Params>(validation)

  const [state, setState] = useState({
    showAlert: false
  })

  const router = useRouter()

  const GO_BACK = `/forms/${parentForm.id}/surveys`

  async function onSubmit(params: AddSurvey.Params) {
    addSurvey
      .add(params)
      .then(() => {
        router.push(GO_BACK)
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          showAlert: true
        }))
      })
  }

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

            <Link
              style={{
                color: '#B5B5B5',
                textDecoration: 'none'
              }}
              href={GO_BACK}
            >
              Enquetes
            </Link>

            <Typography>Nova enquete</Typography>
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
              display='flex'
              alignItems='center'
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              {parentForm.name} <ArrowRightIcon /> Nova enquete
            </Typography>
          </Box>
        </Box>

        <Collapse in={state.showAlert}>
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Algo de errado aconteceu — <strong>Contate o administrador</strong>
          </Alert>
        </Collapse>
      </BarAction>

      <SurveyFormTag
        title='Cadastro da enquete'
        isSubmitting={formState.isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </>
  )
}
