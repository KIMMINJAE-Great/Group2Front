import { Button, Select } from "@mui/material";
import { Component } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import "./douzonecontainer.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Ace1010BasicDistance from "../../pages/ace1010/Ace1010BasicDistance";
import Ace1010Bookmark from "../../pages/ace1010/Ace1010Bookmark";
import Ace1010DivisionDistance from "../../pages/ace1010/Ace1010DivisionDistance";
import MileageModal from "../mileagesearch/MileageModal";
import DrivingRecordCopy from "../../pages/ace1010/DrivingRecordCopy";




const douzonecontainertheme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "15px",
          fontWeight: "bold",
          height: "15px",
          lineHeight: "15px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "30px",
          backgroundColor: "#FBFBFB",
          color: "black",
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
        fullWidth: true,
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // 모든 Grid 태그에 적용하려면 root를 사용하세요.
          // borderBottom: '1px solid black',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover $notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상으로 유지
          },
          "&.Mui-focused $notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상으로 유지
          },
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "&:hover ": {
            cursor: "pointer",
            border: "1px solid #0f8bff",
          },
          "&.noHoverEffect:hover": {
            cursor: "auto",
            border: "none",
          },
        },
      },
    },
  },
});
class DouzoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      funcVowel: null,
      openSnackBar: false,
      snackBarMessage: "",
      severity: "success",
      isModalOpen: '',
    };
  }
  // 기능 모음 열기 닫기
  handleClick = (event) => {
    this.setState({ funcVowel: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ funcVowel: null });
  };

  state = {
    isModalOpen: false,
  };

  handleOpenBd = () => {
    this.setState({ isModalOpen: true });
    console.log("handleOpenBd 실행됨!!!")
  };
  closeModal = () => {
    this.setState({ isModalOpen: false }); // isModalOpen 상태를 false로 변경하여 모달 닫기
  };








  //  스낵바 닫기
  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      openSnackBar: false,
    });
  };
  handleSnackbarOpen = (message, severity = "success") => {
    this.setState({
      openSnackBar: true,
      snackBarMessage: message,
      severity: severity,
    });
  };

  render() {
    //const open = Boolean(this.state.funcVowel);
    const { severity, isModalOpen } = this.state;
    const {
      openDeleteModal,
      handleClose,
      handleConfirm,
      title,
      message,
      showDelete,
      handleOpenBd,
    } = this.props;

    const { isAce1010Open } = this.props; // Ace1010.js의 상태 가져오기

    let backgroundColor = "success.main"; // 초록색 배경
    let iconColor = "#ffffff"; // 아이콘 색상
    if (severity === "error") {
      backgroundColor = "error.main"; // 빨간색 배경
      iconColor = "#ffffff"; // 아이콘 색상
    }
    //const showDelete = this.props.onDelete
    return (
      <ThemeProvider theme={douzonecontainertheme}>

        <div className="douzone-container">

          <div className="container-header">
            <div className="container-header-left">{this.props.title}</div>
            <div className="container-header-right">
            {isAce1010Open && ( // Ace1010.js 상태에 따라 버튼 조건부 렌더링
              <div style={{ display: 'flex'}}>
                  {/* 복사 TEST  위치 이동하여도 됨! */}
                  <DrivingRecordCopy>
                    
                  </DrivingRecordCopy>
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
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem><Ace1010BasicDistance>기초거리입력</Ace1010BasicDistance></MenuItem>
                    <MenuItem><Ace1010DivisionDistance>안분</Ace1010DivisionDistance></MenuItem>
                    <MenuItem><MileageModal>주행거리 검색</MileageModal></MenuItem>
                    <MenuItem><Ace1010Bookmark>즐겨찾기</Ace1010Bookmark></MenuItem>
                  </Menu>
                
              </div>
               )} 
              <span style={{ color: "lightgrey" }}>|</span>
              <DeleteIcon
                style={{ display: showDelete }}
                className="deleteIcon"
                onClick={this.props.delete}
                sx={{ fontSize: 30 }}
              ></DeleteIcon>
            </div>
          </div>

          <div className="children" style={{ marginTop: "10px" }}>
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
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={this.handleSnackbarClose}
              severity={this.state.severity}
              sx={{
                width: "100%",
                bgcolor: backgroundColor,
                ".MuiAlert-icon": {
                  color: iconColor,
                },
                color: "white",
                fontWeight: "bold",
              }}
            >
              {this.state.snackBarMessage}
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    );
  }
}

export default DouzoneContainer;
