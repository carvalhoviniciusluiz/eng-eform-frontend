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
import { useState } from 'react';
import {
  AiFillSave as SaveIcon,
  AiOutlineDoubleRight as ExpandIcon,
  AiOutlineLogin as LoginIcon,
  AiOutlineRollback as BackIcon
} from 'react-icons/ai';
import { BiUserCircle as UserIcon } from 'react-icons/bi';
import { AnswerModel, QuestionModel, QuestionType } from '~/app/domain/models';
import { GetForm } from '~/app/domain/usecases';
import { Link } from '~/app/presentation/components';
import useStyles from './public-form-styles';

type PublicFormComponentProps = GetForm.Props;

export default function PublicFormComponent({
  data,
  logged
}: PublicFormComponentProps) {
  const [state, setState] = useState(() => {
    const { surveys, ...form } = data;
    const value = 0;
    return {
      form,
      surveys,
      value,
      questions: {}
    };
  });

  const classes = useStyles();

  const handleSubmit = () => {
    console.log(state.questions);
  };

  const handleQuestionTypeMultipleStore = (
    event: any,
    question: QuestionModel
  ) => {
    setState(prevState => {
      const questionsState = prevState.questions as any;
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
        questions: {
          ...prevState.questions,
          [question.id]: questions
        }
      };
    });
  };

  const handleQuestionTypeObjectiveStore = (
    event: any,
    question: QuestionModel
  ) => {
    setState(prevState => ({
      ...prevState,
      questions: {
        ...prevState.questions,
        [question.id]: event.target.value
      }
    }));
  };

  const handleInputToggle = (question: QuestionModel, answer: AnswerModel) => {
    switch (question.type) {
      case QuestionType.OBJECTIVE:
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

      case QuestionType.MULTIPLE:
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
  };

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

          {state.surveys.map(survey => (
            <Accordion key={survey.id}>
              <AccordionSummary
                expandIcon={<ExpandIcon />}
                aria-controls={`${survey.id}-content`}
                id={`${survey.id}-header`}
              >
                <Typography className={classes.title2}>
                  {survey.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {survey.questions?.map((question, i) => (
                  <Box key={question.id}>
                    <FormControl
                      style={{
                        marginLeft: '1.5rem',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <FormLabel
                        id={`${question.id}-buttons-group-label`}
                        style={{
                          fontSize: '1.5rem'
                        }}
                      >
                        {question.content}
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby={`${question.id}-buttons-group-label`}
                        defaultValue='female'
                        name={`${question.id}-radio-buttons-group`}
                      >
                        {question.answers?.map(answer => (
                          <FormControlLabel
                            key={answer.id}
                            value={answer.id}
                            control={handleInputToggle(question, answer)}
                            label={answer.content}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
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
