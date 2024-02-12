import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LoadFullForms } from '~/app/domain/usecases';
import BuildForm from './build-form';

type Props = {
  data: LoadFullForms.Response;
  submit: (value: any) => void;
};

function ShowForms({ data, submit }: Props) {
  const [questions, setQuestions] = useState({});
  useEffect(() => {
    submit(questions);
  }, [questions]);
  return (
    <Box style={{ margin: 80 }}>
      {data.map(form => (
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
          {form.questions.map((question, index) => (
            <BuildForm
              key={index}
              question={question}
              submit={selectedQuestions => {
                setQuestions(prevState => {
                  const updatedQuestions: any = { ...prevState };
                  for (const questionId in selectedQuestions) {
                    if (prevState.hasOwnProperty(form.id)) {
                      updatedQuestions[form.id][questionId] =
                        selectedQuestions[questionId];
                    } else {
                      updatedQuestions[form.id] = {
                        [questionId]: selectedQuestions[questionId]
                      };
                    }
                  }
                  return updatedQuestions;
                });
              }}
            />
          ))}
        </Paper>
      ))}
    </Box>
  );
}

export default ShowForms;
