import { Button, Select } from "@mui/material";
import { Component } from "react"
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import "./douzonecontainer.css"
class DouzoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      funcVowel: null,
      openSnackBar: false,
      snackBarMessage: '',
      severity: 'success',
    };
  }
  // 기능 모음 열기 닫기
  handleClick = (event) => {
    this.setState({ funcVowel: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ funcVowel: null });
  };

  //  스낵바 닫기
  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      openSnackBar: false
    });
  };
  handleSnackbarOpen = (message, severity = 'success') => {
    this.setState({
      openSnackBar: true,
      snackBarMessage: message,
      severity: severity
    });
  };

  render() {
    //const open = Boolean(this.state.funcVowel);
    const { severity } = this.state;
    const { openDeleteModal, handleClose, handleConfirm, title, message, showDelete } = this.props;

    let backgroundColor = 'success.main';  // 초록색 배경
    let iconColor = '#ffffff';  // 아이콘 색상
    if (severity === 'error') {
      backgroundColor = 'error.main';  // 빨간색 배경
      iconColor = '#ffffff';  // 아이콘 색상
    }
    //const showDelete = this.props.onDelete
    return (
      <div className="douzone-container">
        <div className="container-header">
          <div className="container-header-left" >
            {this.props.title}
          </div>
          <div className="container-header-right">
            <div className="functionButton">
              <Button
                id="basic-button"
                // aria-controls={open ? 'basic-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                onClick={this.handleClick}
              >
                기능모음
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={this.state.funcVowel}
                open={Boolean(this.state.funcVowel)}
                onClose={this.handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
            <span style={{ color: 'lightgrey' }}>|</span>
            <DeleteIcon style={{ display: showDelete }} className="deleteIcon" onClick={this.props.delete} sx={{ fontSize: 30 }}></DeleteIcon>


          </div>
        </div>

        <div className="children" style={{ marginTop: '10px' }}>
          {this.props.children}
        </div>

        <Dialog
          open={openDeleteModal}
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

        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={this.handleSnackbarClose} severity={this.state.severity} sx={{
            width: '100%',
            bgcolor: backgroundColor,
            '.MuiAlert-icon': {
              color: iconColor
            },
            color: 'white',
            fontWeight: 'bold',
          }}>
            {this.state.snackBarMessage}
          </Alert>
        </Snackbar>
      </div >
    )
  }
}

export default DouzoneContainer;