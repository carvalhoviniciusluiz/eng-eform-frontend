import { makeStyles } from '@mui/styles';

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
  },
  line: {
    position: 'relative',
    border: '2px solid #e9e9e9',
    backgroundColor: '#fbfbfb',
    padding: 6,
    borderRadius: 4,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f6f6f6'
    }
  },
  action: {
    padding: '1px 6px',
    '&:hover > svg': {
      fill: '#838383'
    }
  },
  delete: {
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    '&:hover > svg': {
      fill: '#ea7474'
    }
  },
  fieldIcon: {
    '& > path, path': {
      color: '#C8C8C8'
    },
    '&:hover': {
      '& > path, path': {
        color: '#838383'
      }
    }
  }
});
