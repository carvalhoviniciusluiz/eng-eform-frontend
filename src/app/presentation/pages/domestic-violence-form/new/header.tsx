import { Box, Typography } from '@mui/material';
import { FaRegSave as SaveIcon } from 'react-icons/fa';
import { BarAction, Breadcrumbs } from '~/app/presentation/components';

function Header() {
  return (
    <BarAction>
      <Box>
        <Breadcrumbs>
          <Typography>Violência Domestica</Typography>
        </Breadcrumbs>
        <Box
          style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <SaveIcon size={24} />
          <Typography
            style={{
              fontSize: 24,
              marginLeft: 12
            }}
          >
            Violência Domestica
          </Typography>
        </Box>
      </Box>
    </BarAction>
  );
}

export default Header;
