import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onContinue: () => void;
  children: React.ReactNode;
}

export default function DialogComponent({
  title,
  open = false,
  setOpen,
  onContinue,
  children
}: Props) {
  function handleClose() {
    setOpen(false);
  }
  function handleClick() {
    setOpen(false);
    onContinue();
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ cursor: 'move' }}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleClick}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
