import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface IPNotification {
  openAlert?: boolean;
  setOpen: any;
  type: "warning" | "success" | "info";
  text: string;
  title: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogCustom = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(50,50,50,0.3) !important",
  },
  "& .MuiPaper-root": {
    borderRadius: "10px",
    minWidth: 600,
    boxShadow:
      "rgba(255, 255, 255, 0.3) 0px 5rem 14rem 0px, rgba(0, 0, 0, 0.6) 0px 0.8rem 2.3rem, rgba(0, 0, 0, 0.45) 0px 0.2rem 0.3rem",
  },
}));

const DialogAlert: React.FC<IPNotification> = ({
  openAlert,
  setOpen,
  type,
  title,
  text,
}) => {
  // const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogCustom
      open={openAlert || false}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            mb: 1,
            mt: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 100,
            borderRadius: 40,
            background:
              type === "warning"
                ? "rgba(255, 25, 67, 0.1)"
                : type === "success"
                ? "#b6eeb6"
                : "#f0f0c6",
          }}
        >
          {type === "warning" ? (
            <CloseIcon
              className="icon-animation"
              sx={{ color: " rgb(255, 25, 67)" }}
            />
          ) : type === "success" ? (
            <CheckIcon className="icon-animation" sx={{ color: "green" }} />
          ) : (
            <PriorityHighIcon
              className="icon-animation"
              sx={{ color: "#ffa748" }}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: -4 }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "33px",
              fontWeight: 500,
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
      </Box>
      <DialogContent sx={{ display: "flex", justifyContent: "center", mb:2 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography
            sx={{ fontSize: "22px", maxWidth: "560px", textAlign: "center" }}
          >
            {text}
          </Typography>
        </DialogContentText>
      </DialogContent>
      {type === "warning" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            mt: -1,
            mb: 2,
          }}
        >
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleClose}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      )}
    </DialogCustom>
  );
};

export default DialogAlert;
