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
  title: string;
  message: string;
  open: boolean;
  anchorOrigin?: SnackbarOrigin;
};

export function Toast({
  title,
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
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
      >
        <Alert severity={type} sx={{ width: '100%' }} className={classes.alert}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
