import Snackbar from "@mui/material/Snackbar";
import { green, red } from "@mui/material/colors";

interface IProps {
  open: boolean;
  message: string;
  handleCloseAlert: () => void;
}
const SimpleSnackbar = ({ open, message, handleCloseAlert }: IProps) => {
  const color =
    message.includes("Success") || message.includes("success")
      ? green[700]
      : red[800];
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={1200}
        onClose={handleCloseAlert}
        message={message}
        sx={{
          "& .MuiPaper-root.MuiSnackbarContent-root": {
            background: color,
            minWidth: "180px",
          },
        }}
      />
    </div>
  );
};
export default SimpleSnackbar;
