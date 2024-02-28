import Box from '@mui/material/Box';
import { useState } from 'react';
import {
  BasicTable,
  Link,
  StyledTableCell,
  StyledTableRow,
  TableColumn
} from '~/app/presentation/components';
import Header from './header';

const columns: TableColumn[] = [
  { id: 'protocol', label: 'Protocolo', minWidth: 170 },
  { id: 'victinName', label: 'Vítima', minWidth: 100, align: 'right' },
  {
    id: 'aggressorName',
    label: 'Agressor',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value
  },
  {
    id: 'createdAd',
    label: 'Data de registro',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value
  },
  {
    id: '-',
    label: 'Profissional capacitado',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value
  }
];

const data = [
  {
    id: '1',
    protocol: 'AVDF1020230000032',
    victinName: 'VITIMA DA PAZ',
    aggressorName: 'AGRESSOR SANTANA',
    createdAd: '26/10/2023 12:08:48'
  },
  {
    id: '2',
    protocol: 'AVDF0820230000020',
    victinName: 'VITIMA DA PAZ',
    aggressorName: 'AGRESSOR SANTANA',
    createdAd: '30/08/2023 00:00:00'
  },
  {
    id: '3',
    protocol: 'AVDF1020230000025',
    victinName: 'VITIMA TEIXEIRA',
    aggressorName: 'VITIMA DA PAZ',
    createdAd: '04/09/2023 00:00:00'
  },
  {
    id: '4',
    protocol: 'AVDF0920230000024',
    victinName: 'VITIMA TEIXEIRA',
    aggressorName: 'VITIMA DA PAZ',
    createdAd: '04/09/2023 00:00:00'
  },
  {
    id: '5',
    protocol: 'AVDF0820230000021',
    victinName: 'VITIMA TEIXEIRA',
    aggressorName: 'VITIMA DA PAZ',
    createdAd: '31/08/2023 00:00:00'
  },
  {
    id: '6',
    protocol: 'AVDF0120240000033',
    victinName: 'VITIMA GONÇALVES',
    aggressorName: 'AGGRESSOR NAME',
    createdAd: '28/01/2024 00:00:00'
  },
  {
    id: '7',
    protocol: 'AVDF0120240000038',
    victinName: 'VITIMA GONÇALVES',
    aggressorName: 'AGGRESSOR NAME',
    createdAd: '26/10/2023 12:08:48	'
  },
  {
    id: '8',
    protocol: 'AVDF0120240000044',
    victinName: 'VITIMA GONÇALVES',
    aggressorName: 'AGGRESSOR NAME',
    createdAd: '30/08/2023 00:00:00'
  },
  {
    id: '9',
    protocol: 'AVDF0120240000053',
    victinName: 'VITIMA DA PAZ',
    aggressorName: 'AGRESSOR SANTANA',
    createdAd: '04/09/2023 00:00:00'
  },
  {
    id: '10',
    protocol: 'AVDF0120240000059',
    victinName: 'VITIMA DA PAZ',
    aggressorName: 'AGRESSOR SANTANA',
    createdAd: '04/09/2023 00:00:00'
  }
];

type Props = {};

export default function ListDomesticViolenceComponent({}: Props) {
  const [inputs] = useState(data);
  return (
    <Box>
      <Header />
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{
          margin: 20
        }}
      >
        <BasicTable columns={columns}>
          {inputs.map(row => (
            <StyledTableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component='th' scope='row'>
                {row.protocol}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.victinName}</StyledTableCell>
              <StyledTableCell align='right'>
                {row.aggressorName}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.createdAd}</StyledTableCell>
              <StyledTableCell align='right'>
                <Link
                  style={{
                    color: '#6082C5',
                    textDecoration: 'none'
                  }}
                  href='#'
                >
                  {'Avaliação >>'}
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </BasicTable>
      </Box>
    </Box>
  );
}
