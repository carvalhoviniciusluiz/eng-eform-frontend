import { Box, DialogContentText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import {
  MdKeyboardArrowRight as ArrowRightIcon,
  MdOutlineHorizontalSplit as BuildIcon,
  MdClose as CloseIcon,
  MdSegment as FormIcon,
  MdSearch as SearchIcon
} from 'react-icons/md';
import { QuestionModel } from '~/app/domain/models';
import { DeleteQuestion, LoadQuestions } from '~/app/domain/usecases';
import {
  AlertDialog,
  BarAction,
  Breadcrumbs,
  Dialog,
  Link
} from '~/app/presentation/components';
import useStyles from './list-styles';

type QuestionListComponentProps = LoadQuestions.Props & {
  loadQuestions: LoadQuestions;
  deleteQuestion: DeleteQuestion;
};

export default function QuestionListComponent({
  form,
  questions,
  loadQuestions,
  deleteQuestion
}: QuestionListComponentProps) {
  const [state, setState] = useState({
    questions,
    open: false,
    destroy: false,
    questionId: ''
  });
  const [question, setQuestion] = React.useState<QuestionModel | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const classes = useStyles();

  function handleRehydrateQuestions(content?: string) {
    // loadQuestions
    //   .loadAll({ content })
    //   .then(({ questions }: LoadQuestions.Props) => {
    //     setState(prevState => ({
    //       ...prevState,
    //       questions
    //     }));
    //   })
    //   .catch(console.error);
  }

  function handleDestroy(questionId: string) {
    setState(prevState => ({
      ...prevState,
      open: true,
      questionId
    }));
  }

  function handleDialogOpen(question: QuestionModel) {
    setQuestion(question);
    setDialogOpen(true);
  }

  async function handleSearchByName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    handleRehydrateQuestions(value);
  }

  useEffect(() => {
    const hasQuestionId = !!state.questionId;
    if (!state.destroy && !hasQuestionId) return;
    deleteQuestion.delete(state.questionId).then(() => {
      setState(prevState => ({
        ...prevState,
        questions: state.questions?.filter(
          question => question.id !== state.questionId
        ),
        open: false,
        destroy: false,
        questionId: ''
      }));
    });
  }, [state.destroy, state.questionId]); // eslint-disable-line

  return (
    <>
      <Dialog
        title='Remover'
        open={dialogOpen}
        setOpen={setDialogOpen}
        onContinue={() => {
          handleDestroy(question!.id);
          setQuestion(null);
        }}
      >
        <DialogContentText>
          Você está prestes a remover essa questão, continuar?
        </DialogContentText>
      </Dialog>
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
              {form.name} <ArrowRightIcon /> Questões
            </Typography>
          </Box>
        </Box>
        <Link
          className={classes.btnNew}
          href={`/forms/${form.id}/questions/new`}
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
            {state.questions?.map(question => (
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
                <Box display='flex'>
                  <Box display='flex' justifyContent='center'>
                    <Link
                      className={classes.action}
                      href={`/forms/${form.id}/questions/${question.id}`}
                    >
                      <BuildIcon fill='#C8C8C8' size={32} />
                    </Link>
                    <Link
                      className={classes.action}
                      href={`/forms/${form.id}/questions/${question.id}/edit`}
                    >
                      <EditIcon fill='#C8C8C8' size={32} />
                    </Link>
                  </Box>
                  <Box display='flex' justifyContent='center'>
                    <button
                      className={classes.delete}
                      onClick={() => handleDialogOpen(question)}
                    >
                      <CloseIcon fill='#C8C8C8' size={32} />
                    </button>
                  </Box>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </>
  );
}
