import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface DebouncedTextField {
  value: string;
  error?: boolean;
  onUpdate: (inputText: string) => void;
  delay?: number;
}

export default function DebouncedTextField(props: DebouncedTextField) {
  const { value, onUpdate, error = false, delay = 500 } = props;
  const [inputText, setInputText] = useState<string>(value);

  useEffect(() => {
    // Create a timer that will execute the callback after the specified delay
    const debounceTimer = setTimeout(() => {
      if (value !== inputText) onUpdate(inputText); // Update the debounced text with the latest input
    }, delay);

    // Cleanup function: Clear the timer if the component unmounts or the input changes
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputText, delay, onUpdate, value]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  // not that by design text field is rendered twice in mui
  return (
    <TextField
      error={error}
      label={error ? 'Error' : ''}
      fullWidth
      multiline
      maxRows={2}
      value={inputText}
      onChange={handleTextChange}
      variant="standard"
      size="small"
    />
  );
}
