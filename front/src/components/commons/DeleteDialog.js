import React, { Component } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

class DeleteDialog extends Component {
  render() {
    const { open, handleClose, handleConfirm, title, message } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>아니오</Button>
          <Button onClick={handleConfirm} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteDialog;