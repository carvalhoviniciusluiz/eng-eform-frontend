import { makeStyles } from '@mui/styles'

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
  title: {
    fontSize: 21,
    fontWeight: 700,
    lineHeight: 0,
    color: '#1D2438',
    margin: '0 8px'
  },
  paper: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(29, 36, 56)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden',
    border: '1px solid rgb(229, 234, 242)',
    borderRadius: 8,
    padding: 16,
    boxShadow: 'rgb(0 0 0 / 7%) 0px 0px 21px 1px'
  },
  h3: {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 1.5
  },
  h6: {
    marginBottom: 0,
    marginTop: 4,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.5,
    color: 'rgb(148, 164, 196)',
    '&': {
      textTransform: 'lowercase'
    },
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  },
  link: {
    textDecoration: 'none',
    '& > small': {
      fontSize: 12,
      lineHeight: 1.5,
      backgroundColor: 'rgb(229, 234, 242)',
      padding: '5px 15px',
      borderRadius: 20,
      marginLeft: 8,
      color: 'rgb(148, 164, 196)',
      fontWeight: 600
    },
    '&:hover > small': {
      color: 'white',
      backgroundColor: 'rgb(217 222 230)'
    }
  },
  unpublished: {
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: 'rgb(240 240 240)',
    padding: '5px 15px',
    borderRadius: 20,
    marginLeft: 8,
    color: 'rgb(197 201 209)',
    fontWeight: 600
  }
})
