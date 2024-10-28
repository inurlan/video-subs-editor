import msConversion from '@/pages/helpers/msConversion';
import { TableCell } from '@mui/material';
import DebouncedTextField from '../DebouncedTextField';
import DebouncedTimeField from '../DebouncedTimeField';
import MergeButton from './MergeButton';
import { Data, ColumnData, DataError } from '@/pages/types/genericTypes';

export default function RowContent(props: {
  index: number;
  row: Data;
  handleRowsMerge: Function;
  handleRowUpdate: Function;
  canEdit: boolean;
  errors: DataError[] | [];
  columns: ColumnData[];
}) {
  const {
    index,
    canEdit,
    row,
    errors,
    columns,
    handleRowsMerge,
    handleRowUpdate,
  } = props;

  return (
    <>
      {columns.map(({ dataKey }: ColumnData) => (
        <TableCell key={dataKey} align={'left'}>
          {dataKey === 'merge' && index > 0 ? (
            <MergeButton
              onClick={() => handleRowsMerge(index)}
              canEdit={canEdit}
            />
          ) : dataKey === 'text' && canEdit ? (
            <DebouncedTextField
              value={row.text}
              onUpdate={(debouncedText: string) =>
                handleRowUpdate(debouncedText, 'text', index)
              }
            />
          ) : ['start', 'duration'].includes(dataKey) && canEdit ? (
            <DebouncedTimeField
              error={Boolean(
                errors.find(
                  (error: { index: number; dataKey: string }) =>
                    error.index === index && error.dataKey === dataKey
                )
              )}
              value={row[dataKey] as number}
              onUpdate={(debouncedTime: number) =>
                handleRowUpdate(debouncedTime, dataKey, index)
              }
            />
          ) : ['start', 'end', 'duration'].includes(dataKey) ? (
            msConversion(row[dataKey] as number)
          ) : (
            row[dataKey]
          )}
        </TableCell>
      ))}
    </>
  );
}
