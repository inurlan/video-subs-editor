import React, { useContext } from 'react';
import { useState, useRef } from 'react';
import {
  Paper,
  Table as MaterialTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableRowOwnProps,
} from '@mui/material';
import {
  TableVirtuoso,
  TableComponents,
  TableVirtuosoHandle,
} from 'react-virtuoso';

import TableToolbar from './TableToolbar';

import RowContent from './RowContent';
import FixedHeaderContent from './FixedHeaderContent';
import { MediaSyncContext } from '@/context/MediaSyncProvider';
import { Data, ColumnData, DataError } from '@/types/genericTypes';

const columns: ColumnData[] = [
  {
    width: 10,
    label: '',
    dataKey: 'merge',
  },
  {
    width: 40,
    label: 'Line',
    dataKey: 'id',
    numeric: true,
  },
  {
    width: 60,
    label: 'Start',
    dataKey: 'start',
    numeric: true,
  },
  {
    width: 60,
    label: 'End',
    dataKey: 'end',
    numeric: true,
  },
  {
    width: 60,
    label: 'Duration',
    dataKey: 'duration',
    numeric: true,
  },
  {
    width: 200,
    label: 'Text',
    dataKey: 'text',
  },
];

export default function Table() {
  const { rows, setRows, playbackState, videoRef } =
    useContext(MediaSyncContext);
  const tableRef = useRef<TableVirtuosoHandle>(null);

  const [errors, setErrors] = useState<DataError[]>([]);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  tableRef?.current?.scrollToIndex({
    index: playbackState?.currentSubIndex,
    behavior: 'smooth',
  });

  function Row(
    props: TableRowOwnProps & {
      item: Data;
    }
  ) {
    const handleClick = () => {
      if (videoRef.current)
        videoRef.current.currentTime = props.item.start / 1000;
    };

    return (
      <TableRow
        hover
        onClick={handleClick}
        selected={props.item.id - 1 === playbackState?.currentSubIndex}
        {...props}
      />
    );
  }

  const handleRowUpdate = (
    value: string | number,
    dataKey: string,
    currentRowIndex: number
  ) => {
    let isValid = true;
    // handle validation of start and duration

    const newStart = Number(value);
    // check the difference between new start and current start
    const startDiff = newStart - rows[currentRowIndex].start;
    let newEnd = newStart + rows[currentRowIndex].duration;
    const prevEnd = currentRowIndex > 0 ? rows[currentRowIndex - 1].end : 0;
    const nextStart =
      currentRowIndex < rows.length - 1
        ? rows[currentRowIndex + 1]?.start
        : Math.round(playbackState.videoDuration * 1000);

    // Case 1: if the diff is positive then start is incremented
    // hence need to shift new end by diff amount and check with the next start

    let newDuration = Number(value);
    const currentDuration = rows[currentRowIndex].duration;

    let isDurationValid = true;
    if (dataKey === 'start') {
      // otherwise drop update and throw validation error
      if (startDiff > 0) {
        const overflow = newEnd - nextStart;
        // in case of overflow need to decrease duration by overflow amount
        newDuration =
          overflow > 0 ? currentDuration - overflow : currentDuration;

        isDurationValid = newDuration >= 0;

        // if decrease is possible update current start and end with new values
        if (isDurationValid) {
          newEnd = newStart + newDuration;
        }
      }

      // Case 2: if the diff is negative then start is decremented
      // hence need to check with prev end value and if ok update new start and duration
      else if (startDiff < 0) {
        newDuration = newEnd - newStart;
      }

      isValid = isValid && newStart >= prevEnd && isDurationValid;
    }

    if (dataKey === 'duration') {
      // case 1: if the diff is positive then duration is incremented
      // hence need to shift new end by diff amount and check with the next start
      newEnd = rows[currentRowIndex].start + newDuration;
      isValid = newDuration >= 0 && newEnd <= nextStart;
    }

    if (isValid) {
      let props = {};
      if (['start', 'duration'].includes(dataKey)) {
        props = { end: newEnd, duration: newDuration };
        setErrors(
          errors.filter(
            (error) =>
              !(error.dataKey === dataKey && error.index === currentRowIndex)
          )
        );
      }
      setRows(
        rows.map((row: Data, index: number) => {
          if (index === currentRowIndex) {
            // if current row update with a new value
            return {
              ...row,
              [dataKey]: value,
              ...props,
            };
          }

          // all other rows update nothing
          return row;
        })
      );
    } else {
      const newError: DataError = { index: currentRowIndex, dataKey };
      setErrors([...errors, newError]);
    }
  };

  const handleRowsMerge = (currentRowIndex: number) => {
    // copy upper row from the tablev
    const upperRow = rows[currentRowIndex - 1];

    // merge upper and current rows
    setRows(
      rows
        .map((row: Data, index: number) => {
          if (index === currentRowIndex) {
            // if current row merge with upper row
            return {
              ...upperRow,
              end: row.end,
              duration: row.end - upperRow.start,
              text: upperRow.text + ' ' + row.text,
            };
          } else if (index > currentRowIndex) {
            // all rows below update only id
            return { ...row, id: row.id - 1 };
          }

          // all rows above update nothing
          return row;
        })
        // remove upper row from the table
        .filter((row: Data, index: number) => index !== currentRowIndex - 1)
    );
  };

  return (
    <Paper className="table-container">
      <TableToolbar
        canEdit={canEdit}
        onSwitchChange={() => setCanEdit(!canEdit)}
      />
      <Paper className="table-wrapper">
        <TableVirtuoso
          ref={tableRef}
          data={rows}
          components={{ ...VirtuosoTableComponents, TableRow: Row }}
          fixedHeaderContent={() => <FixedHeaderContent columns={columns} />}
          itemContent={(_index: number, row: Data) => (
            <RowContent
              index={_index}
              row={row}
              handleRowsMerge={handleRowsMerge}
              handleRowUpdate={handleRowUpdate}
              canEdit={canEdit}
              errors={errors}
              columns={columns}
            />
          )}
        />
      </Paper>
    </Paper>
  );
}

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>(function Scroller(props, ref) {
    return <TableContainer component={Paper} {...props} ref={ref} />;
  }),
  Table: function Table(props) {
    return (
      <MaterialTable
        {...props}
        sx={{
          borderCollapse: 'separate',
          tableLayout: 'fixed',
          '.MuiTableRow-root.Mui-selected': {
            backgroundColor: '#faebfc',
          },
        }}
      />
    );
  },
  TableHead: React.forwardRef<HTMLTableSectionElement>(
    function THead(props, ref) {
      return <TableHead {...props} ref={ref} />;
    }
  ),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>(
    function TBody(props, ref) {
      return <TableBody {...props} ref={ref} />;
    }
  ),
};
