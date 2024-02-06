import { makeStyles } from '@mui/styles';

export default makeStyles({
  btnSave: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    border: 0,
    borderRadius: 4,
    padding: '0 24px 0 17px',
    backgroundColor: '#2469ce',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#1658b8'
    }
  }
});
