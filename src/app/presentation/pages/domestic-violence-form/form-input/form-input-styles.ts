import Paper from '@mui/material/Paper';
import { makeStyles, styled } from '@mui/styles';

export const Ticket = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  height: 60,
  lineHeight: '60px'
}));

export default makeStyles({
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
