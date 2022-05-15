import { Alert, AlertTitle, Box, Collapse, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegSave as SaveIcon } from 'react-icons/fa'
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md'
import { AddQuestion } from '~/app/domain/usecases'
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components'
import { QuestionFormTag } from '~/app/presentation/pages/question/components'

type NewQuestionComponentProps = AddQuestion.Props & {
  validation: any
  addQuestion: AddQuestion
}

export default function NewQuestionComponent({
  parentForm,
  parentSurvey,
  validation,
  addQuestion
}: NewQuestionComponentProps) {
  const { control, handleSubmit, formState } =
    useForm<AddQuestion.Params>(validation)

  const [state, setState] = useState({
    showAlert: false
  })

  const router = useRouter()

  const GO_BACK = `/forms/${parentForm.id}/surveys/${parentSurvey.id}/questions`

  async function onSubmit(params: AddQuestion.Params) {
    addQuestion
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
              href={`/forms/${parentForm.id}/surveys`}
            >
              Enquetes
            </Link>

            <Link
              style={{
                color: '#B5B5B5',
                textDecoration: 'none'
              }}
              href={GO_BACK}
            >
              Questões
            </Link>

            <Typography>Cadastro</Typography>
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
              {parentSurvey.name} <ArrowRightIcon /> Cadastrar Questão
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

      <QuestionFormTag
        title='Cadastrar questão'
        isSubmitting={formState.isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </>
  )
}