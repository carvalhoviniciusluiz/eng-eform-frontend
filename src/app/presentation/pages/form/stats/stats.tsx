import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import {
  MdKeyboardArrowRight as ArrowRightIcon,
  MdSegment as FormIcon
} from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { GetFormStats } from '~/app/domain/usecases';
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components';
import useStyles from './stats-styles';

type FormStatsComponentProps = GetFormStats.Response & {};

export default function FormStatsComponent({
  form,
  data
}: FormStatsComponentProps) {
  const classes = useStyles();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.black,
      fontSize: 22
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Typography>Estatisticas</Typography>
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
              display='flex'
              alignItems='center'
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              {form?.name} <ArrowRightIcon /> Estatisticas
            </Typography>
          </Box>
        </Box>
        <Link className={classes.btnNew} href='#'>
          Exportar
        </Link>
      </BarAction>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Pergunta</StyledTableCell>
                <StyledTableCell align='right'>Resposta</StyledTableCell>
                <StyledTableCell align='right'>Quantidade</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <StyledTableRow
                  key={uuid()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell />
                  <StyledTableCell component='th' scope='row'>
                    {row.question}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.answer}</StyledTableCell>
                  <StyledTableCell align='right'>{row.count}</StyledTableCell>
                  <StyledTableCell />
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
