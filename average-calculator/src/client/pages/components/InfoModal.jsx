import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

const useStyles = makeStyles(() => ({
  dialogTitle: {
    marginRight: "1.3rem",
  },
}));

function InfoModal({ setOpen, open, title, children, width }) {
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const fullScreen = width === "xs" || width === "sm";

  return (
    <Dialog fullScreen={fullScreen} maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default withWidth()(InfoModal);
