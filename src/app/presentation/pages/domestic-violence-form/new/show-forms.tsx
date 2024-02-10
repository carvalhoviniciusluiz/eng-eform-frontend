import { Box, Paper, Typography } from '@mui/material';
import { LoadFullForms } from '~/app/domain/usecases';
import BuildForm from './build-form';

type Props = {
  data: LoadFullForms.Response;
};

function ShowForms({ data }: Props) {
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
            <BuildForm key={index} form={form} question={question} />
          ))}
        </Paper>
      ))}
    </Box>
  );
}

export default ShowForms;
