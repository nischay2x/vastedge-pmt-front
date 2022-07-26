import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteAlertDialog({ open, setOpen, setDeleteId, rowId }) {

  const agree = () => {
    setDeleteId(rowId);
  }

  const disagree = () => {
    setDeleteId(-1);
    setOpen(false);
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={() => { setOpen(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Row?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete the row with id: {rowId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree}>Cancel</Button>
          <Button onClick={agree} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
