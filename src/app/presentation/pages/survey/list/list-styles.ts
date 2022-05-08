import { makeStyles } from '@mui/styles'

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
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    content: '',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#ea7474',
    right: -12,
    top: -12,
    width: 22,
    height: 22
  }
})
