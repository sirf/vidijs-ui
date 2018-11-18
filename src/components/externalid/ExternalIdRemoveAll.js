import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { externalid as api } from '@vidijs/vidijs-api';
import withUI from '../../hoc/withUI';

function ExternalIdRemoveAll({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  entityType,
  entityId,
}) {
  const onRemove = () => {
    api.removeAllExternalId({
      entityType,
      entityId,
    })
      .then(() => {
        const messageContent = 'All External IDs Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing External IDs';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove All External IDs For "${entityId}"?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="raised"
          onClick={onRemove}
          color="secondary"
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(ExternalIdRemoveAll);
