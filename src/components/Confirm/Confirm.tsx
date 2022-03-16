import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
interface IConfirm {
  isOpen?: boolean;
  isConfirm?: (value: boolean) => void;
  title?: string;
  content?: string;
}
const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});
const Confirm: React.FC<IConfirm> = (props) => {
  const classes = useStyles();
  const handleConfirm = (value: boolean) => {
    props.isConfirm?.(value);
  };
  const { t } = useTranslation();
  return (
    <Dialog
      open={props?.isOpen || false}
      onClose={() => handleConfirm(false)}
      maxWidth="lg"
    >
      <IconButton
        className={classes.closeButton}
        onClick={() => handleConfirm(false)}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ mr: 4 }}>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleConfirm(false)}
          variant="outlined"
          sx={{ border: "1px solid #1976d2" }}
          size="small"
        >
          {t("confirm_delete.cancel")}
        </Button>
        <Button
          onClick={() => handleConfirm(true)}
          variant="contained"
          autoFocus
          sx={{ color: "#fff" }}
          size="small"
        >
          {t("confirm_delete.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Confirm;
