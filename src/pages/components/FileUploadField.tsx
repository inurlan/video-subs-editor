import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Paper } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploadField(props: {
  format?: string;
  label: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { format = '.srt', label, onFileUpload } = props;
  return (
    <Paper className="file-upload-container">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          onChange={onFileUpload}
          multiple
          accept={format}
        />
      </Button>
    </Paper>
  );
}
