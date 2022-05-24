import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { AiOutlineEdit as EditIcon } from 'react-icons/ai'
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md'
import { EditQuestion } from '~/app/domain/usecases'
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components'
import { QuestionFormTag } from '~/app/presentation/pages/question/components'

type EditQuestionComponentProps = EditQuestion.Props & {
  editQuestion: EditQuestion
  validation: any
}

export default function EditQuestionComponent({
  body,
  parentForm,
  parentSurvey,
  editQuestion,
  validation
}: EditQuestionComponentProps) {
  const router = useRouter()

  async function onSubmit(params: EditQuestion.FormParams) {
    editQuestion
      .edit(body.question.id, params)
      .then(() => {
        router.push(GO_BACK)
      })
      .catch(console.error)
  }

  const GO_BACK = `/forms/${parentForm.id}/surveys/${parentSurvey.id}/questions`

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

            <Typography>Editar</Typography>
          </Breadcrumbs>

          <Box
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <EditIcon size={23.16} />

            <Typography
              display='flex'
              alignItems='center'
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              {parentSurvey.name} <ArrowRightIcon /> Editar Questão
            </Typography>
          </Box>
        </Box>
      </BarAction>

      <QuestionFormTag
        title='Editar Questão'
        validation={validation}
        onSubmit={onSubmit}
        body={body}
      />
    </>
  )
}
