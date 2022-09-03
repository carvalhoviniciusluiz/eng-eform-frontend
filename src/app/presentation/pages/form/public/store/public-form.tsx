import { Box, Checkbox, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import {
  AiOutlineDoubleRight as ExpandIcon,
  AiOutlineLogin as LoginIcon
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
    return {
      form,
      surveys
    };
  });

  const classes = useStyles();

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

        <Box>
          <Typography variant='h5' component='h1' className={classes.title1}>
            {state.form.name}
          </Typography>
          <Typography component='span' className={classes.badge}>
            {state.form.status}
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
            margin: '24px 0'
          }}
        >
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
    </Box>
  );
}