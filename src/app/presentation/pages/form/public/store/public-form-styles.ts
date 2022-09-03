import { makeStyles } from '@mui/styles';

export default makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    zIndex: 11,
    position: 'sticky',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    backdropFilter: 'blur(6px)',
    margin: '0px 18px',
    '& > a:hover > svg': {
      fill: 'rgb(36, 153, 239) !important',
      cursor: 'pointer',
      transition: '0.2s'
    }
  },
  logo: {
    fontSize: 21,
    fontWeight: 700,
    lineHeight: 0,
    color: '#1D2438',
    margin: '0 8px'
  },
  title1: {
    maxWidth: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  title2: {
    maxWidth: 650,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  badge: {
    color: '#b8d935',
    backgroundColor: '#f4fbdb',
    padding: 4,
    borderRadius: 6
  }
});
