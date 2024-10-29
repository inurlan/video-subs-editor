import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import msConversion from '../helpers/msConversion';
import reverseMsConversion from '../helpers/reverseMsConversion';

interface DebouncedTimeField {
  value: number;
  error?: boolean;
  onUpdate: (inputTime: number) => void;
  delay?: number;
}

export default function DebouncedTimeField(props: DebouncedTimeField) {
  const { value, onUpdate, error = false, delay = 500 } = props;
  const [inputTime, setInputTime] = useState<number>(value);

  useEffect(() => {
    // Create a timer that will execute the callback after the specified delay
    const debounceTimer = setTimeout(() => {
      if (value !== inputTime) onUpdate(inputTime); // Update the debounced text with the latest input
    }, delay);

    // Cleanup function: Clear the timer if the component unmounts or the input changes
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputTime, delay, onUpdate, value]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const c: string | null = (e.nativeEvent as InputEvent).data;

    if (c == null || (c >= '0' && c <= '9')) {
      // check if no more or less than 2 separators present
      if (e.target.value.match(/:/g)?.length == 2) {
        const selectionStart = e.target.selectionStart as number;

        setInputTime(
          reverseMsConversion(
            e.target.value
              .split(':')
              .map((str) => {
                if ([2, 5, 8].includes(selectionStart))
                  return str.substring(0, 2);
                if (str.length === 3) return str[0] + str[2];
                if (str.length === 1 && [1, 4, 7].includes(selectionStart))
                  return str + '0';
                return str;
              })
              .join(':')
          )
        );
      }
    }
  };

  // not that by design text field is rendered twice in mui
  return (
    <TextField
      error={error}
      label={error ? 'Error' : ''}
      fullWidth
      multiline
      maxRows={2}
      value={msConversion(inputTime)}
      onChange={handleTextChange}
      variant="standard"
      size="small"
    />
  );
}
