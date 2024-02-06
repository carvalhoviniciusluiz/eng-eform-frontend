import { makeStyles } from '@mui/styles';

export default makeStyles({
  input: {
    width: '100%',
    padding: 12,
    '&:before': {
      borderBottom: '0 !important'
    },
    '&:after': {
      borderBottom: '0 !important'
    }
  }
});
