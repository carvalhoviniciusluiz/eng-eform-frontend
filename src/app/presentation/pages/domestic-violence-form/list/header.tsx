import { Box, Typography } from '@mui/material';
import { MdSegment as FormIcon } from 'react-icons/md';
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components';
import useStyles from './list-styles';

function Header() {
  const classes = useStyles();
  return (
    <BarAction>
      <Box>
        <Breadcrumbs>
          <Typography>Violência Domestica</Typography>
          <Typography>Acompanhamento</Typography>
        </Breadcrumbs>
        <Box
          style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FormIcon size={23} />
          <Typography
            style={{
              fontSize: 24,
              marginLeft: 12
            }}
          >
            Acompanhamento
          </Typography>
        </Box>
      </Box>
      <Link className={classes.btnNew} href='/vdf/new'>
        Novo questionário
      </Link>
    </BarAction>
  );
}

export default Header;
