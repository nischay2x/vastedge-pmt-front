import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateDialog({ open, setOpen, onSubmit, children}) {

  const [showLoader, setShowLoader] = useState(false);
  const handleSubmit = () => {
    setShowLoader(true);
    onSubmit();
  };


  useEffect(() => {
    if(!open) { setShowLoader(false) } 
  }, [open])
  

  return (
    <div>
      <Dialog open={open} onClose={() => { setOpen(false); }}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Will Create A New Row
          </DialogContentText>
          { showLoader ? <><br/><CircularProgress/></> : <></> }
          <br />
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
