import { makeStyles } from '@mui/styles';

export default makeStyles({
  btnSearch: {
    backgroundColor: '#2469ce',
    color: 'white',
    fontWeight: 100,
    textAlign: 'center',
    borderRadius: 4,
    letterSpacing: 0.2,
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#1658b8'
    }
  },
  btnNew: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2469ce',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    width: 200,
    height: 56,
    borderRadius: 4,
    letterSpacing: 0.2,
    fontSize: 14,
    '&:hover': {
      backgroundColor: '#1658b8'
    }
  }
});
