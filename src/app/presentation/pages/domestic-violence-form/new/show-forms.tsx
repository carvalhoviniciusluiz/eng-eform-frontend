import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { AiOutlineDoubleRight as ExpandIcon } from 'react-icons/ai';
import { QuestionType } from '~/app/domain/models';
import { LoadFullForms } from '~/app/domain/usecases';
import { TextArea } from '~/app/presentation/components';

type Props = {
  data: LoadFullForms.Response;
};

function ShowForms({ data }: Props) {
  const [state, setState] = useState(() => {
    const listDefault = data.map(form => {
      return {
        [form.id]: {}
      };
    });
    return {
      forms: data,
      formQuestions: { ...listDefault },
      selectedFormQuestions: { ...listDefault }
    };
  });

  function handleQuestionTypeMultipleStore(
    event: any,
    form: LoadFullForms.Form,
    question: LoadFullForms.Question
  ) {
    setState(prevState => {
      let questions = [] as any;
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
        selectedFormQuestions: {
          ...prevState.selectedFormQuestions,
          [form.id]: {
            ...prevState.selectedFormQuestions[form.id as any],
            [question.id]: questions
          }
        }
      };
    });
  }

  function handleQuestionTypeObjectiveStore(
    event: any,
    form: LoadFullForms.Form,
    question: LoadFullForms.Question
  ) {
    setState(prevState => ({
      ...prevState,
      selectedFormQuestions: {
        ...prevState.selectedFormQuestions,
        [form.id]: {
          ...prevState.selectedFormQuestions[form.id as any],
          [question.id]: event.target.value
        }
      }
    }));
  }

  function handleQuestionTypePlainTextStore(
    event: any,
    form: LoadFullForms.Form,
    question: LoadFullForms.Question,
    answer?: LoadFullForms.Answer
  ) {
    const answerSelected = answer
      ? { [answer.id]: event.target.value }
      : { response: event.target.value };
    setState(prevState => ({
      ...prevState,
      selectedFormQuestions: {
        ...prevState.selectedFormQuestions,
        [form.id]: {
          ...prevState.selectedFormQuestions[form.id as any],
          [question.id]: answerSelected
        }
      }
    }));
  }

  function handleInputToggle(
    form: LoadFullForms.Form,
    question: LoadFullForms.Question,
    answer?: LoadFullForms.Answer
  ) {
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
            onClick={event =>
              handleQuestionTypeObjectiveStore(event, form, question)
            }
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
            onClick={event =>
              handleQuestionTypeMultipleStore(event, form, question)
            }
          />
        );
      }
      case QuestionType.PLAIN_TEXT:
        return (
          <TextArea
            placeholder={question.content}
            onChange={event =>
              handleQuestionTypePlainTextStore(event, form, question, answer)
            }
          />
        );
      default:
        return <></>;
    }
  }

  function handleQuestionWithAnswers(
    form: LoadFullForms.Form,
    question: LoadFullForms.Question
  ) {
    if (question.type === QuestionType.PLAIN_TEXT) {
      return handleInputToggle(form, question);
    }
    if (!question.answers) {
      return;
    }
    return (
      <RadioGroup
        aria-labelledby={`${question.id}-buttons-group-label`}
        defaultValue={false}
        name={`${question.id}-radio-buttons-group`}
        style={{ marginBottom: 22 }}
      >
        {question.answers.map(answer => {
          if (answer.hasContent) {
            return (
              <Box key={answer.id}>
                <FormControlLabel
                  value={answer.id}
                  control={handleInputToggle(form, question, answer)}
                  label={answer.content}
                />
                <TextArea
                  placeholder={answer.content}
                  onChange={event =>
                    handleQuestionTypePlainTextStore(
                      event,
                      form,
                      question,
                      answer
                    )
                  }
                />
              </Box>
            );
          }
          return (
            <FormControlLabel
              key={answer.id}
              value={answer.id}
              control={handleInputToggle(form, question, answer)}
              label={answer.content}
            />
          );
        })}
      </RadioGroup>
    );
  }

  function handleQuestionWithAnswerChilds(
    form: LoadFullForms.Form,
    question: LoadFullForms.Question
  ) {
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
              {handleQuestionWithAnswers(form, child)}
            </FormControl>
          </Box>
        ))}
      </>
    );
  }

  function handleAccordion(
    form: LoadFullForms.Form,
    question: LoadFullForms.Question
  ) {
    return (
      <Accordion key={question.id}>
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          aria-controls={`${question.id}-content`}
          id={`${question.id}-header`}
        >
          <Typography>{question.content}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {handleQuestionWithAnswers(form, question)}
          {handleQuestionWithAnswerChilds(form, question)}
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <Box style={{ margin: 80 }}>
      {state.forms.map(form => (
        <Paper
          key={form.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 8,
            background: '#F5F5F5',
            borderRadius: 4,
            marginBottom: 6
          }}
        >
          <Typography variant='h5' style={{ marginBottom: 12 }}>
            {form.name}
          </Typography>
          {form.questions.map(question => handleAccordion(form, question))}
        </Paper>
      ))}
    </Box>
  );
}

export default ShowForms;
