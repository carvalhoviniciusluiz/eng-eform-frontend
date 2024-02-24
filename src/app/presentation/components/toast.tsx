import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  alert: {
    border: '1px solid #1d2438'
  }
});

type Props = {
  type: AlertColor;
  message: string;
  open: boolean;
  anchorOrigin?: SnackbarOrigin;
};

export function Toast({
  message,
  type,
  open,
  anchorOrigin = {
    vertical: 'top',
    horizontal: 'right'
  }
}: Props) {
  const { horizontal, vertical } = anchorOrigin;
  const classes = useStyles();
  function handleTitle() {
    if (type === 'error') {
      return <AlertTitle>Erro</AlertTitle>;
    }
    if (type === 'info') {
      return <AlertTitle>Informação</AlertTitle>;
    }
    if (type === 'success') {
      return <AlertTitle>Sucesso</AlertTitle>;
    }
    return <AlertTitle>Aviso</AlertTitle>;
  }
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert severity={type} sx={{ width: '100%' }} className={classes.alert}>
          {handleTitle()}
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
