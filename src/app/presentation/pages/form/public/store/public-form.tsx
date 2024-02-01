import { Box, Checkbox, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  AiOutlineRollback as BackIcon,
  AiOutlineDoubleRight as ExpandIcon,
  AiOutlineLogin as LoginIcon,
  AiFillSave as SaveIcon
} from 'react-icons/ai';
import { BiUserCircle as UserIcon } from 'react-icons/bi';
import { AnswerModel, QuestionModel, QuestionType } from '~/app/domain/models';
import { AddPublicForm, GetForm } from '~/app/domain/usecases';
import { Link, TextArea } from '~/app/presentation/components';
import useStyles from './public-form-styles';

type PublicFormComponentProps = GetForm.Props & {
  addPublicForm: AddPublicForm;
};

export default function PublicFormComponent({
  data,
  addPublicForm,
  logged
}: PublicFormComponentProps) {
  const [state, setState] = useState(() => {
    const { form, questions } = data;
    const value = 0;
    return {
      form,
      questions,
      value,
      selectedQuestions: {} as any,
      loading: false
    };
  });
  const classes = useStyles();
  const router = useRouter();

  function handleSubmit() {
    setState(prevState => ({
      ...prevState,
      loading: true
    }));
    addPublicForm
      .add(state.selectedQuestions)
      .then(async () => await router.push('/'))
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          loading: false
        }));
      });
  }

  function handleQuestionTypeMultipleStore(
    event: any,
    question: QuestionModel
  ) {
    setState(prevState => {
      const questionsState = prevState.selectedQuestions;
      const questions = questionsState[question.id] || [];
      const { checked, value } = event.target;
      if (checked) {
        questions.push(value);
      } else {
        const index = questions.indexOf(value);
        if (index > -1) {
          questions.splice(index, 1);
        }
      }
      return {
        ...prevState,
        selectedQuestions: {
          ...prevState.selectedQuestions,
          [question.id]: questions
        }
      };
    });
  }

  function handleQuestionTypeObjectiveStore(
    event: any,
    question: QuestionModel
  ) {
    setState(prevState => ({
      ...prevState,
      selectedQuestions: {
        ...prevState.selectedQuestions,
        [question.id]: event.target.value
      }
    }));
  }

  function handleQuestionTypePlainTextStore(
    event: any,
    question: QuestionModel,
    answer?: AnswerModel
  ) {
    const answerSelected = answer
      ? { [answer.id]: event.target.value }
      : { response: event.target.value };
    setState(prevState => ({
      ...prevState,
      selectedQuestions: {
        ...prevState.selectedQuestions,
        [question.id]: answerSelected
      }
    }));
  }

  function handleInputToggle(question: QuestionModel, answer?: AnswerModel) {
    switch (question.type) {
      case QuestionType.OBJECTIVE: {
        if (!answer) {
          return <></>;
        }
        return (
          <Radio
            key={answer.id}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 22
              }
            }}
            onClick={event => handleQuestionTypeObjectiveStore(event, question)}
          />
        );
      }
      case QuestionType.MULTIPLE: {
        if (!answer) {
          return <></>;
        }
        return (
          <Checkbox
            key={answer.id}
            value={answer.id}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 22
              }
            }}
            onClick={event => handleQuestionTypeMultipleStore(event, question)}
          />
        );
      }
      case QuestionType.PLAIN_TEXT:
        return (
          <TextArea
            placeholder={question.content}
            onChange={event =>
              handleQuestionTypePlainTextStore(event, question, answer)
            }
          />
        );
    }
  }
  function handleQuestionWithAnswers(question: QuestionModel) {
    if (question.type === QuestionType.PLAIN_TEXT) {
      return handleInputToggle(question);
    }
    if (!question.answers) {
      return;
    }
    return (
      <RadioGroup
        aria-labelledby={`${question.id}-buttons-group-label`}
        defaultValue='female'
        name={`${question.id}-radio-buttons-group`}
        style={{ marginBottom: 22 }}
      >
        {question.answers.map(answer => {
          if (answer.hasContent) {
            return (
              <Box key={answer.id}>
                <FormControlLabel
                  value={answer.id}
                  control={handleInputToggle(question, answer)}
                  label={answer.content}
                />
                <TextArea
                  placeholder={answer.content}
                  onChange={event =>
                    handleQuestionTypePlainTextStore(event, question, answer)
                  }
                />
              </Box>
            );
          }
          return (
            <FormControlLabel
              key={answer.id}
              value={answer.id}
              control={handleInputToggle(question, answer)}
              label={answer.content}
            />
          );
        })}
      </RadioGroup>
    );
  }
  function handleQuestionWithAnswerChilds(question: QuestionModel) {
    if (!question.children) {
      return;
    }
    return (
      <>
        {question.children.map(child => (
          <Box key={child.id}>
            <FormControl
              style={{
                marginLeft: '1.5rem',
                marginBottom: '1.5rem'
              }}
            >
              <FormLabel
                id={`${child.id}-buttons-group-label`}
                style={{
                  fontSize: '1.5rem'
                }}
              >
                {child.content}
              </FormLabel>
              {handleQuestionWithAnswers(child)}
            </FormControl>
          </Box>
        ))}
      </>
    );
  }
  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(243, 244, 249)'
      }}
    >
      <header className={classes.header}>
        <Box display='flex' alignItems='center'>
          <Box>
            <Box
              style={{
                width: 25,
                height: 3,
                margin: 5,
                borderRadius: 10,
                transition: 'width 0.3s ease 0s',
                backgroundColor: 'rgb(36, 153, 239)'
              }}
            />
            <Box
              style={{
                height: 3,
                margin: 5,
                borderRadius: 10,
                transition: 'width 0.3s ease 0s',
                backgroundColor: 'rgb(36, 153, 239)',
                width: 15
              }}
            />
            <Box
              style={{
                width: 25,
                height: 3,
                margin: 5,
                borderRadius: 10,
                transition: 'width 0.3s ease 0s',
                backgroundColor: 'rgb(36, 153, 239)'
              }}
            />
          </Box>
          <Typography variant='h2' component='h1' className={classes.logo}>
            {logged ? (
              <Link href={`/forms`} style={{ textDecoration: 'none' }}>
                eForm
              </Link>
            ) : (
              <>eForm</>
            )}
          </Typography>
        </Box>
        {logged ? (
          <UserIcon size={32} fill={'#1D2438'} />
        ) : (
          <Link href={`/login`}>
            <LoginIcon size={32} fill={'#1D2438'} />
          </Link>
        )}
      </header>
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
            width: '777px',
            margin: '24px 0 100px 0'
          }}
        >
          <Box
            style={{
              marginBottom: 24
            }}
          >
            <Typography
              variant='h5'
              component='h1'
              style={{
                marginBottom: 20
              }}
            >
              {state.form.name}
            </Typography>
            <Typography component='span' className={classes.badge}>
              {state.form.status}
            </Typography>
          </Box>
          {state.questions?.map(question => (
            <Accordion key={question.id}>
              <AccordionSummary
                expandIcon={<ExpandIcon />}
                aria-controls={`${question.id}-content`}
                id={`${question.id}-header`}
              >
                <Typography className={classes.title2}>
                  {question.content}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {handleQuestionWithAnswers(question)}
                {handleQuestionWithAnswerChilds(question)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={state.value}
          onChange={(_, value) => {
            setState(prevState => ({
              ...prevState,
              value
            }));
          }}
        >
          <BottomNavigationAction
            label='Salvar'
            icon={<SaveIcon fontSize={22} />}
            onClick={handleSubmit}
            disabled={state.loading}
          />
          <BottomNavigationAction
            label='Voltar'
            icon={
              <Link href={`/`}>
                <BackIcon fontSize={22} />
              </Link>
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
