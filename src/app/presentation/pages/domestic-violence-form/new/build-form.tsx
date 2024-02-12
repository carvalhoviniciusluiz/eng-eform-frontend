import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AiOutlineDoubleRight as ExpandIcon } from 'react-icons/ai';
import { QuestionType } from '~/app/domain/models';
import { LoadFullForms } from '~/app/domain/usecases';
import { TextArea } from '~/app/presentation/components';

type Props = {
  question: LoadFullForms.Question;
  submit?: (value: any) => void;
};

function BuildForm({ question, submit }: Props) {
  const [selectedQuestions, setSelectedQuestions] = useState({});
  useEffect(() => {
    submit && submit(selectedQuestions);
  }, [selectedQuestions]);
  function handleQuestionTypeMultipleStore(
    event: any,
    question: LoadFullForms.Question
  ) {
    setSelectedQuestions((prevState: any) => {
      const updateSelectedQuestions = { ...prevState };
      if (!updateSelectedQuestions[question.id]) {
        updateSelectedQuestions[question.id] = [];
      }
      const { checked, value } = event.target;
      if (checked) {
        updateSelectedQuestions[question.id].push(value);
      } else {
        const index = updateSelectedQuestions[question.id].indexOf(value);
        if (index > -1) {
          updateSelectedQuestions[question.id].splice(index, 1);
        }
      }
      return updateSelectedQuestions;
    });
  }
  function handleQuestionTypeObjectiveStore(
    event: any,
    question: LoadFullForms.Question
  ) {
    setSelectedQuestions((prevState: any) => {
      const updateSelectedQuestions = { ...prevState };
      updateSelectedQuestions[question.id] = event.target.value;
      return updateSelectedQuestions;
    });
  }
  function handleQuestionTypePlainTextStore(
    event: any,
    question: LoadFullForms.Question,
    answer?: LoadFullForms.Answer
  ) {
    const answerSelected = answer
      ? { [answer.id]: event.target.value }
      : { response: event.target.value };
    setSelectedQuestions((prevState: any) => {
      const updateSelectedQuestions = { ...prevState };
      updateSelectedQuestions[question.id] = answerSelected;
      return updateSelectedQuestions;
    });
  }
  function handleInputToggle(
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
      default:
        return <></>;
    }
  }
  function handleQuestionWithAnswers(question: LoadFullForms.Question) {
    if (question.type === QuestionType.PLAIN_TEXT) {
      return handleInputToggle(question);
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
  function handleQuestionWithAnswerChilds(question: LoadFullForms.Question) {
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
    <Accordion key={question.id}>
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        aria-controls={`${question.id}-content`}
        id={`${question.id}-header`}
      >
        <Typography>{question.content}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {handleQuestionWithAnswers(question)}
        {handleQuestionWithAnswerChilds(question)}
      </AccordionDetails>
    </Accordion>
  );
}

export default BuildForm;
