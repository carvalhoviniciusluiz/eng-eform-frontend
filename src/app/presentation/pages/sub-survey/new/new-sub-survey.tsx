import { Alert, AlertTitle, Box, Collapse, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, UseFormProps } from 'react-hook-form'
import { FaRegSave as SaveIcon } from 'react-icons/fa'
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md'
import { AddSubSurvey } from '~/app/domain/usecases'
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components'
import { SubSurveyFormTag } from '~/app/presentation/pages/sub-survey/components'

type NewSubSurveyComponentProps = AddSubSurvey.Props & {
  validation: UseFormProps<AddSubSurvey.Params>
  addSubSurvey: AddSubSurvey
}

export default function NewSubSurveyComponent({
  parentForm,
  parentSurvey,
  validation,
  addSubSurvey
}: NewSubSurveyComponentProps) {
  const { control, handleSubmit, formState } =
    useForm<AddSubSurvey.Params>(validation)

  const [state, setState] = useState({
    showAlert: false
  })

  const router = useRouter()

  const GO_BACK = `/forms/${parentForm.id}/surveys/${parentSurvey.id}`

  async function onSubmit(params: AddSubSurvey.Params) {
    addSubSurvey
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
              Gerenciador
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
              {parentSurvey.name} <ArrowRightIcon /> Nova enquete
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

      <SubSurveyFormTag
        title='Cadastro da enquete'
        isSubmitting={formState.isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </>
  )
}
