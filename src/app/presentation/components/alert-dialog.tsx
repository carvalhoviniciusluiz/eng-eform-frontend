import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

type AlertDialogProps = {
  title: string;
  children?: React.ReactNode;
  state: any;
  setState: any;
};

export default function AlertDialog(props: AlertDialogProps) {
  const { title, children, state, setState } = props;

  const handleClose = () => {
    setState((prevState: any) => ({
      ...prevState,
      open: false,
      destroy: false
    }));
  };

  const handleConfirm = () => {
    setState((prevState: any) => ({
      ...prevState,
      open: false,
      destroy: true
    }));
  };

  return (
    <Dialog
      open={state.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancelar</Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
