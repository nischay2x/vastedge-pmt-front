import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateDialog({ open, setOpen, rowId, setUpdateId, children}) {

  const [showLoader, setShowLoader] = useState(false);
  const handleUpdate = () => {
    setUpdateId(rowId);
    setShowLoader(true);
  };

  const handleCancel = () => {
    setUpdateId(-1);
    setOpen(false);
  }

  useEffect(() => {
    if(!open) { setShowLoader(false) } 
  }, [open])
  

  return (
    <div>
      <Dialog open={open} onClose={() => { setOpen(false); setUpdateId(-1); }}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will update data on row with id: {rowId}
          </DialogContentText>
          { showLoader ? <><br/><CircularProgress/></> : <></> }
          <br />
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
