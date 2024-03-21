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
import { GetPerson, LoadFullForms } from '~/app/domain/usecases';
import { Editor, TextArea } from '~/app/presentation/components';

type Props = {
  defaultExpanded?: boolean;
  question: LoadFullForms.Question;
  questionsResponse?: GetPerson.Question[];
  submit?: (value: any) => void;
};

function BuildForm({
  question,
  questionsResponse,
  submit,
  defaultExpanded = false
}: Props) {
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [questions, setQuestions] = useState<GetPerson.Question[]>([]);
  useEffect(() => {
    submit && submit(selectedQuestions);
  }, [selectedQuestions]);
  useEffect(() => {
    const hasResponse = !!questionsResponse?.length;
    if (hasResponse) {
      setQuestions([...questionsResponse]);
    }
  }, [questionsResponse]);
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
    setQuestions(prevState => {
      const index = prevState.findIndex(prev => prev[question.id]);
      if (index === -1) {
        return prevState;
      }
      prevState.splice(index, 1);
      prevState.push({
        [question.id]: event.target.value
      } as GetPerson.Question);
      return prevState;
    });
  }
  function handleQuestionTypePlainTextStore(
    event: any,
    question: LoadFullForms.Question,
    answer?: LoadFullForms.Answer
  ) {
    const isObject = typeof event === 'object';
    let answerSelected: any = null;
    if (isObject) {
      answerSelected = answer
        ? { [answer.id]: event.target.value }
        : { response: event.target.value };
    } else {
      answerSelected = answer ? { [answer.id]: event } : { response: event };
    }
    setSelectedQuestions((prevState: any) => {
      const updateSelectedQuestions = { ...prevState };
      updateSelectedQuestions[question.id] = answerSelected;
      return updateSelectedQuestions;
    });
    setQuestions(prevState => {
      const index = prevState.findIndex(prev => prev[question.id]);
      if (index === -1) {
        return prevState;
      }
      prevState.splice(index, 1);
      prevState.push({ [question.id]: answerSelected } as GetPerson.Question);
      return prevState;
    });
  }
  function getId(obj: any): any {
    if (!obj) return;
    const [id] = Object.keys(obj);
    return id;
  }
  function getFirstValue(obj: any): any {
    if (!obj) return;
    const [value] = Object.values(obj);
    return value;
  }
  function handleInputToggle(
    question: LoadFullForms.Question,
    answer?: LoadFullForms.Answer
  ) {
    const questionFound = questions?.find(qtr => getId(qtr) === question.id);
    const answerId = getFirstValue(questionFound);
    switch (question.type) {
      case QuestionType.OBJECTIVE: {
        if (!answer) {
          return <></>;
        }
        const checked = (answerId: string, targetId: any) => {
          if (typeof targetId === 'object') {
            return answerId === getId(targetId);
          }
          if (targetId) {
            return answerId === targetId;
          }
        };
        return (
          <Radio
            key={answer.id}
            checked={checked(answer.id, answerId)}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 22
              }
            }}
            onClick={event => handleQuestionTypeObjectiveStore(event, question)}
          />
        );
      }
      // TODO:
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
        const defaultValue = getFirstValue(questionFound)?.response;
        return (
          <Editor
            onChange={value =>
              handleQuestionTypePlainTextStore(value, question, answer)
            }
          />
          // <TextArea
          //   defaultValue={defaultValue}
          //   placeholder={question.content}
          //   onChange={event =>
          //     handleQuestionTypePlainTextStore(event, question, answer)
          //   }
          // />
        );
      default:
        return <Box style={{ marginLeft: 10 }} />;
    }
  }
  function handleQuestionWithAnswers(question: LoadFullForms.Question) {
    if (question.type === QuestionType.PLAIN_TEXT) {
      return handleInputToggle(question);
    }
    if (!question.answers) {
      return;
    }
    const questionFound = questions?.find(qtr => getId(qtr) === question.id);
    let defaultValue = '';
    if (questionFound) {
      const [value] = Object.values(questionFound);
      if (typeof value === 'object') {
        [defaultValue] = Object.values(value);
      }
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
                  defaultValue={defaultValue}
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
                marginBottom: '1.5rem',
                display: 'flex'
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
    <Accordion key={question.id} defaultExpanded={defaultExpanded}>
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
