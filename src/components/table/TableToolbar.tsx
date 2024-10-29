import { Toolbar, Typography, FormControlLabel, Switch } from '@mui/material';

interface TableToolbar {
  canEdit: boolean;
  onSwitchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function TableToolbar(props: TableToolbar) {
  const { canEdit, onSwitchChange } = props;
  return (
    <Toolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Subtitle Table
      </Typography>
      <FormControlLabel
        labelPlacement="start"
        label={canEdit ? 'Disable Edit' : 'Enable Edit'}
        control={<Switch value={canEdit} onChange={onSwitchChange} />}
      />
    </Toolbar>
  );
}
