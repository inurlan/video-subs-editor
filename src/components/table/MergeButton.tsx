import { Merge } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';

interface MergeButton {
  canEdit: boolean;
  onClick: () => void;
}

export default function MergeButton(props: MergeButton) {
  const { onClick, canEdit } = props;

  return (
    <div>
      <Tooltip title="Merge">
        <span>
          <IconButton color="primary" onClick={onClick} disabled={!canEdit}>
            <Merge />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}
