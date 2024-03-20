import Box from '@mui/material/Box';
import { useState } from 'react';
import { GetFormInputs } from '~/app/domain/usecases';
import {
  BasicTable,
  Link,
  StyledTableCell,
  StyledTableRow,
  TableColumn
} from '~/app/presentation/components';
import Header from './header';
import TableFilter from './table-filter';

const columns: TableColumn[] = [
  { id: 'protocol', label: 'Protocolo', minWidth: 170 },
  { id: 'victinName', label: 'Vítima', minWidth: 100, align: 'right' },
  {
    id: 'aggressorName',
    label: 'Agressor',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'createdAt',
    label: 'Data de registro',
    minWidth: 170,
    align: 'right'
  },
  {
    id: '-',
    label: 'Profissional capacitado',
    minWidth: 170,
    align: 'right'
  }
];

type RowData = {
  id: string;
  protocol: string;
  victinName: string;
  aggressorName: string;
  createdAt: string;
  format: (value: any) => any;
};

type Props = {
  getFormInputs: GetFormInputs;
};

export default function ListDomesticViolenceComponent({
  getFormInputs
}: Props) {
  const [inputs, setInputs] = useState<RowData[]>([]);
  function handleFilterApply(param: {
    protocolNumber: string;
    aggressorId: string;
    victimId: string;
  }) {
    getFormInputs
      .execute(param)
      .then(formInputs => {
        const inputs = formInputs.map(formInput => ({
          id: formInput.id,
          protocol: formInput.number,
          createdAt: formInput.createdAt,
          victinName: formInput.details.find(
            person => person.personType === 'VICTIM'
          )?.person.name,
          aggressorName: formInput.details.find(
            person => person.personType === 'AGGRESSOR'
          )?.person.name,
          format: (value: string) => {
            const formatter = new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'long'
            });
            return formatter.format(new Date(value));
          }
        }));
        setInputs(inputs as any);
      })
      .catch(console.error);
  }
  function handleOnClean() {
    setInputs([]);
  }
  return (
    <Box>
      <Header />
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{
          margin: 50
        }}
      >
        <TableFilter hasData={!!inputs.length} onSubmit={handleFilterApply} />
        <BasicTable
          hasData={!!inputs.length}
          columns={columns}
          onClean={handleOnClean}
        >
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
              <StyledTableCell align='right'>
                {row.format(row.createdAt)}
              </StyledTableCell>
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
