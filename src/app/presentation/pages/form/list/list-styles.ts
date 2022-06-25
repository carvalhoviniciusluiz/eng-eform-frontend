import { makeStyles } from '@mui/styles';

export default makeStyles({
  title: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '26rem'
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
  },
  line: {
    width: 613,
    border: '1px solid #E9E9E9',
    borderRadius: 6,
    marginTop: 16,
    '&:hover': {
      backgroundColor: '#fafafa'
    }
  },
  action: {
    '&:hover > svg': {
      fill: '#838383'
    }
  },
  delete: {
    margin: '0 20px',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    '&:hover > svg': {
      fill: '#ea7474'
    }
  }
});
