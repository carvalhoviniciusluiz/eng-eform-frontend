import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormProps } from 'react-hook-form';
import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md';
import { DeleteAnswer, EditQuestion } from '~/app/domain/usecases';
import { isUUID } from '~/app/infra/utils';
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components';
import { QuestionFormTag } from '~/app/presentation/pages/question/components';

type EditQuestionComponentProps = EditQuestion.Props & {
  editQuestion: EditQuestion;
  deleteAnswer: DeleteAnswer;
  validation: UseFormProps;
};

export default function EditQuestionComponent({
  question,
  answers,
  form,
  editQuestion,
  deleteAnswer,
  validation
}: EditQuestionComponentProps) {
  const router = useRouter();

  function onSubmit(params: any) {
    editQuestion
      .edit(question.id, params)
      .then(() => {
        router.push(GO_BACK);
      })
      .catch(console.error);
  }

  function onAnswerDelete(answerId: string) {
    if (isUUID(answerId)) {
      deleteAnswer.delete(answerId).catch(console.error);
    }
  }

  const GO_BACK = `/forms/${form.id}/questions`;

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
              href={`/forms/${form.id}/questions`}
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
              {form.name} <ArrowRightIcon /> Editar Questão
            </Typography>
          </Box>
        </Box>
      </BarAction>

      <QuestionFormTag
        title='Editar Questão'
        validation={validation}
        onSubmit={onSubmit}
        onAnswerDelete={onAnswerDelete}
        question={question}
        answers={answers}
      />
    </>
  );
}
