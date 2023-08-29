import { Component } from "react";
import {
  Button, Typography,
  Alert,
  Snackbar,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { update } from "../../components/api_url/API_URL";

class Ace1010SendYn extends Component {
  constructor(props) {
    super(props)


    const user = JSON.parse(sessionStorage.getItem('user'));

    const authority = user.authorities[0].authority
    this.state = {
      show: authority === "ROLE_ADMIN", // 여기에서 `show` 초기화
      snackBarMessage: '',
    };

  }
  setSendYn = () => {

    let selectedCheckedRows = this.props.selectedCheckedRows;

    console.log('aaaaaaaaaaaaaaaaaaa')
    console.log(selectedCheckedRows)

    if (selectedCheckedRows[0].seq_nb === 0) {
      this.setState({ snackBarMessage: '운행기록을 입력 후 마감해 주십시오.' });
      this.showErrorSnackbar();
      return;
    }
    if (selectedCheckedRows.length < 1) {
      this.setState({ snackBarMessage: '마감할 운행기록을 선택해 주십시오.' });
      this.showErrorSnackbar();
      return;
    }




    selectedCheckedRows.sort((a, b) => a.id - b.id);
    let isConsecutive = true;
    for (let i = 0; i < selectedCheckedRows.length - 1; i++) {
      if (selectedCheckedRows[i].id + 1 !== selectedCheckedRows[i + 1].id) {
        isConsecutive = false;
        break;
      }
    }

    if (!isConsecutive || selectedCheckedRows.length < 1) {
      this.setState({ snackBarMessage: '마감할 운행기록을 순차적으로 선택하여 주십시오.' });
      this.showErrorSnackbar();
      return;
    }
    else {
      update('/ace1010/updatesendyn', selectedCheckedRows)
        .then((response) => {
          this.props.updateSendYnSnackBar()
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error("Server responded with:", error.response.data); // "can not"이 출력될 것입니다.
            this.setState({ snackBarMessage: '마감은 전 기록이 마감상태여야 가능합니다.' });
            this.showErrorSnackbar();
          } else {
            console.error(error);
          }
        })

    }
  }

  // Dialog 열기 함수
  handleOpenDialog = () => {
    this.setState({ openDeleteModal: true });
  };

  // Dialog 닫기 함수
  handleCloseDialog = () => {
    this.setState({ openDeleteModal: false });
  };

  onConfirm = () => {
    this.setSendYn();
    this.handleCloseDialog(); // Dialog 닫기
  };
  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };
  render() {
    const { show, openDeleteModal } = this.state;

    return (
      <div style={{ marginRight: '10px' }}>

        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert

            severity="error"
            sx={{
              width: "100%",
              bgcolor: "error.main",
              ".MuiAlert-icon": {
                color: "#ffffff",
              },
              color: "white",
              fontWeight: "bold",
            }}

          >
            {this.state.snackBarMessage}
          </Alert>
        </Snackbar>
        {show && (
          <Button sx={{ marginRight: '10px' }}
            onClick={this.handleOpenDialog}
          >

            마감
          </Button>
        )}

        <Dialog
          open={openDeleteModal}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"마감 하시겠습니까?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              선택한 운행기록을 마감하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog}>아니오</Button>
            <Button onClick={this.onConfirm} autoFocus>
              네
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}



export default Ace1010SendYn;