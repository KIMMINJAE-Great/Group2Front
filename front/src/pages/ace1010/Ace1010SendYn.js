import { Component } from "react";
import {
  Button, Typography,
  Alert,
  Snackbar,
  Slide
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
    console.log('sendYn')
    let selectedCheckedRows = this.props.selectedCheckedRows;
    console.log(selectedCheckedRows)

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
          console.log(response.data)
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
  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };
  render() {
    const { show } = this.state;

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
            onClick={this.setSendYn}
          >

            마감
          </Button>
        )}
      </div>
    )
  }
}



export default Ace1010SendYn;