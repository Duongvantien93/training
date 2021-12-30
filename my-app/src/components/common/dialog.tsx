import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function DialogDeleteItem({
  id,
  openDialog,
  handleDeleteItem,
  handleOpenDialog,
  title,
}: {
  id: string;
  openDialog: boolean;
  handleDeleteItem: (id: string) => void;
  handleOpenDialog: (open: boolean) => void;
  title: string;
}) {
  return (
    <Box>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => handleOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`You want to delete ${title}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeleteItem(id);
              handleOpenDialog(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
