import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import {
  MdClose as CloseIcon,
  MdKeyboardArrowRight as ArrowRightIcon,
  MdSearch as SearchIcon,
  MdSegment as FormIcon
} from 'react-icons/md';
import { DeleteQuestion, LoadQuestions } from '~/app/domain/usecases';
import {
  AlertDialog,
  BarAction,
  Breadcrumbs,
  Link
} from '~/app/presentation/components';
import useStyles from './list-styles';

type QuestionListComponentProps = LoadQuestions.Props &
  LoadQuestions.Response & {
    loadQuestions: LoadQuestions;
    deleteQuestion: DeleteQuestion;
  };

export default function QuestionListComponent({
  data,
  parentForm,
  parentSurvey,
  loadQuestions,
  deleteQuestion
}: QuestionListComponentProps) {
  const [state, setState] = useState({
    questions: data,
    open: false,
    destroy: false,
    questionId: ''
  });

  function handleRehydrateQuestions(content?: string) {
    loadQuestions
      .loadAll({ content })
      .then(({ data }: LoadQuestions.Response) =>
        setState(prevState => ({
          ...prevState,
          questions: data
        }))
      )
      .catch(console.error);
  }

  function handleDestroy(questionId: string) {
    setState(prevState => ({
      ...prevState,
      open: true,
      questionId
    }));
  }

  async function handleSearchByName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    handleRehydrateQuestions(value);
  }

  useEffect(() => {
    const hasQuestionId = !!state.questionId;
    if (state.destroy && hasQuestionId) {
      deleteQuestion.delete(state.questionId).then(() => {
        setState(prevState => ({
          ...prevState,
          questions: state.questions.filter(
            question => question.id !== state.questionId
          ),
          open: false,
          destroy: false,
          questionId: ''
        }));
      });
    }
  }, [state.destroy]); // eslint-disable-line

  const classes = useStyles();

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

            <Typography>Questões</Typography>
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
              {parentSurvey.name} <ArrowRightIcon /> Questões
            </Typography>
          </Box>
        </Box>

        <Link
          className={classes.btnNew}
          href={`/forms/${parentForm.id}/surveys/${parentSurvey.id}/questions/new`}
        >
          Cadastrar questão
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
            width: '60%',
            borderRadius: 5,
            border: '1px solid #E9E9E9',
            marginTop: 40
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
            placeholder='Pesquisar pelo conteúdo da questão'
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

        <Box
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            margin: '24px 0'
          }}
        >
          <ul className={classes.list}>
            {state.questions.map(question => (
              <li className={classes.line} key={question.id}>
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
                          textAlign: 'left'
                        }}
                        component='h1'
                      >
                        {question.content}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box display='flex' justifyContent='center'>
                  <Link
                    className={classes.action}
                    href={`/forms/${parentForm.id}/surveys/${parentSurvey.id}/questions/${question.id}/edit`}
                  >
                    <EditIcon fill='#C8C8C8' size={32} />
                  </Link>

                  <button
                    className={classes.delete}
                    onClick={() => handleDestroy(question.id)}
                  >
                    <CloseIcon fill='#C8C8C8' size={32} />
                  </button>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </>
  );
}
