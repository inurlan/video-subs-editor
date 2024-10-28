import { ColumnData } from '@/types/genericTypes';
import { TableRow, TableCell } from '@mui/material';

export default function FixedHeaderContent(props: { columns: ColumnData[] }) {
  const { columns } = props;
  return (
    <TableRow>
      {columns.map(({ dataKey, width, label }: ColumnData) => (
        <TableCell
          key={dataKey}
          variant="head"
          align={'left'}
          style={{ width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {label}
        </TableCell>
      ))}
    </TableRow>
  );
}
