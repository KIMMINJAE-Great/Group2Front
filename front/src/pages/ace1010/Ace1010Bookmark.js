import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Slide,
  Snackbar,
} from "@mui/material";
import { get, post, update } from "../../components/api_url/API_URL";
import { getByQueryString } from "../../components/api_url/API_URL";
import DouzoneContainer from "./../../components/douzonecontainer/DouzoneContainer";
import { lightGreen } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";

class Ace1010Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: "",
      bookmarks: [], // 즐겨찾기 객체들

      isConfirmationModalOpen: false, // 확인 창의 모달

      updatedValue: "",

      addedrows: [],

      // 출발 도착 구분
      startendfg: [],
      // 운행 구분
      usefg: [],
      // 마지막 셀에서 엔터가 이루어 졌을 때 누락되는 정보를 담기 위함
      editedCell: "",

      //즐겨찾기가 저장되면 다시 데이터를 불러오기 위한 state
      selectedRowId: "",

      //  출발구분 용
      selectedRowIdFg: "",
      selectedCellFg: "",
      hour: "",
      minute: "",
      car_cd: "",
      rows: [],
      selectAllCheckbox: false,
      // 출발구분 위해
      inputValueforfg: "",
      // fg 구분에서 직접입력을 위한 state
      showModal: false,
      editingCellName: "",

      selectedRowUseFg: "", //입력구분
      // 일단 플래그
      flag: false,

      openSnackBar: false,
      snackBarMessage: "",
      severity: "success",


      hasArrowDownEvent: false,
      hasArrowUpEvent: false,



    };

    this.DouzoneContainer = React.createRef();
    this.dataGridRef = React.createRef();
  }


  componentDidMount() {
    this.getstartendfg();
    document.addEventListener('keydown', this.handleKeyDown)
    this.getsendyn();
    this.getusefg();

  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  getstartendfg = async () => {
    try {
      const response = await get("/ace1010/startendfg");
      this.setState({ startendfg: response.data });
    } catch (error) { }
  };
  getsendyn = async () => {
    try {
      const response = await get("/ace1010/sendyn");
      this.setState({ sendyn: response.data });
    } catch (error) { }
  };
  getusefg = async () => {
    try {
      const response = await get("/ace1010/usefg");
      this.setState({ usefg: response.data });
    } catch (error) { }
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openConfirmationModal = () => {
    this.setState({ isConfirmationModalOpen: true });
  };

  closeConfirmationModal = () => {
    this.setState({ isConfirmationModalOpen: false });
  };

  saveModalCheckedItems = () => {
    // 확인 모달을 열기
    this.openConfirmationModal();
  };

  // 확인 모달 내부의 "확인" 버튼 클릭을 처리하는 함수
  handleConfirmation = async () => {
    // 확인 모달을 닫기
    this.closeConfirmationModal();
    this.closeModal();

    // const {updatedValue} = this.state;

    //수정

    // 저장 동작 또는 원하는 다른 동작 수행
    try {

      if (this.state.updatedValue.origin === 'Y') {

        const response = await update("/ace1010/updatebookmark", this.state.updatedValue);

        this.setState((prevState) => ({
          // rows: [...prevState.rows, emptyRow],
          updatedValue: "",
        }));




      } else {
        const response = await post("/ace1010/insertbookmark", this.state.addedrows);



        this.setState({ addedrows: [], })


      }




    } catch {

    }
  };



  handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.stopPropagation();
      // ArrowDown 키 이벤트 처리 로직

    } else if (event.key === 'ArrowUp') {
      event.stopPropagation();
      // ArrowUp 키 이벤트 처리 로직

    }
  };


  handleOpen = async (event) => {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const emp_cd = user.emp_cd;
    const co_cd = "1000";


    try {
      const queryString = `?emp_cd=${emp_cd}&co_cd=${co_cd}`;
      const response = await getByQueryString(
        `/ace1010/abizbookmark${queryString}`
      );
      const open = !this.state.isModalOpen;
      this.setState(
        {
          bookmarks: response.data,
          isModalOpen: open,
        },
        () => {

          this.getabizcarbookmark(this.state.bookmarks);
        }
      );
    } catch (error) {
      console.log(error);
    }
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





  getabizcarbookmark = (bookmarks) => {
    // emp_cd 로그인 사원코드
    const user = JSON.parse(sessionStorage.getItem("user"));

    const insertid = user.emp_id;

    const modifyid = user.emp_id;

    const empcd = user.emp_cd;
    const cocd = "1000";

    if (bookmarks && bookmarks.length > 0) {
      const dataWithIds = bookmarks.map((item, index) => {
        return {
          ...item,
          modify_id: modifyid,
          co_cd: cocd,
          emp_cd: empcd,
          id: index + 1,
          origin: "Y",
        };
      });

      const maxId = Math.max(...dataWithIds.map((item) => item.id));

      // 빈 행을 생성
      const emptyRow = {
        id: maxId + 1,
        co_cd: cocd,
        emp_cd: empcd,
        send_yn: "2",
        insert_id: insertid,
        origin: "N",
        use_fg: "",
      };

      this.setState({ rows: [...dataWithIds, emptyRow] });

    } else {
      // 차량등 등록되어 있지만 운행기록이 없을 때
      // 빈 행을 생성
      const emptyRow = {
        id: 1,
        co_cd: cocd,
        emp_cd: empcd,
        insert_id: insertid,
        send_yn: "2",
        origin: "N",
        use_fg: "",
      };
      this.setState({ rows: [emptyRow] });
    }
  };

  // 행이 클릭되면 여러 요소를 저장 하여 활용
  handleRowClick = (params, event) => {

    // 행 클릭시 필수 셀 빨간색 입히는 setState
    this.setState({
      selectedRowId: params.id,
      selectedRowUseFg: params.row.use_fg,
    });
  };
  handleCellClick = (params, event) => {

    this.setState({
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,
      selectedRow: params.row,
    });
  }
  cellkeydown = (params, event) => {

    this.setState({
      editedCell: params.field,
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,
      selectedRow: params.row,

    })

  }


  processRowUpdatefunc = async (updatedRow, originalRow) => {


    const cellFieldName = this.state.editedCell;

    //직전행선지
    if (updatedRow.id === this.state.selectedRowIdFg && (cellFieldName === 'start_fg' || cellFieldName === 'end_fg')) {

      // 현재 셀이 'start_fg'이고 값이 '직전행선지'인 경우
      if (cellFieldName === 'start_fg' && updatedRow.start_fg === '직전행선지') {
        // 이전 행의 인덱스를 찾습니다.
        const previousRowIndex = this.state.rows.findIndex(row => row.id === updatedRow.id - 1);
        if (previousRowIndex !== -1) {
          // 이전 행의 'start_addr' 값을 가져옵니다.
          const previousStartfg = this.state.rows[previousRowIndex].start_fg;
          const previousAddr = this.state.rows[previousRowIndex].start_addr;

          // 현재 행의 'start_addr' 값을 이전 행의 'start_addr'로 업데이트합니다.
          updatedRow.start_fg = previousStartfg;
          updatedRow.start_addr = previousAddr;
        }
      } else if (cellFieldName === 'end_fg' && updatedRow.end_fg === '직전행선지') {
        const previousRowIndex = this.state.rows.findIndex(row => row.id === updatedRow.id - 1);
        if (previousRowIndex !== -1) {
          // 이전 행의 'end_addr' 값을 가져옵니다.
          const previousEndfg = this.state.rows[previousRowIndex].end_fg;
          const previousAddr = this.state.rows[previousRowIndex].end_addr;

          // 현재 행의 'end_addr' 값을 이전 행의 'end_addr'로 업데이트합니다.
          updatedRow.end_fg = previousEndfg;
          updatedRow.end_addr = previousAddr;
        }

      }
    }



    // 업데이트된 값을 새로운 변수에 저장
    this.setState(
      () => ({
        updatedValue: updatedRow,
      }),
      () => {
        console.log('');
      }
    );

    return updatedRow;
  };

  // 유효성 검사 후 빈행을 추가한다,
  handleSaveRowButtonClick = async (params) => {

    const { updatedValue } = this.state;



    const fieldsToCheck = [
      "bookmark_cd",
      "bookmark_nm",
      "use_fg",
      "start_fg",
      "end_fg",
    ];

    const allFieldsHaveValue = fieldsToCheck.every((field) => {
      const value = updatedValue[field];
      return value !== undefined && value !== null && value !== "";
    });


    if (!allFieldsHaveValue) {
      this.handleSnackbarOpen(
        "필수 입력란을 입력 하지 않았습니다.다시 입력 해주세요.",
        "error"
      );
      return;
    }

    if (updatedValue.origin === "N") {


      // bookmark_cd 중복체크
      const isDuplicate = this.state.rows.some(
        (row) => row.bookmark_cd === updatedValue.bookmark_cd
      );

      if (isDuplicate) {
        this.handleSnackbarOpen(
          "이미 존재하는 즐겨찾기 코드입니다.",
          "error"
        );
        return;
      }



      try {
        this.handleSnackbarOpen(
          "새로운 행이 추가 되었습니다.",
          "success"
        );
        updatedValue.origin = "Y";

        // 상태를 업데이트합니다.
        const updatedRows = this.state.rows.map((row) => {
          if (row.id === updatedValue.id) {
            return updatedValue;
          }
          return row;
        });

        this.setState((prevState) => ({
          rows: updatedRows,
          addedrows: [...prevState.addedrows, updatedValue], //추가된 행만 저장한 변수
        }), () => {
          console.log('')
        });

        // 새로운 즐겨찾기 저장시 빈행 추가
        const lastRow = this.state.rows[this.state.rows.length - 1];
        const newId = lastRow.id + 1;
        const user = JSON.parse(sessionStorage.getItem("user"));
        const empid = user.emp_id;
        const cocd = updatedValue.co_cd;

        const emptyRow = {
          id: newId,
          co_cd: cocd,
          insert_id: empid,
          emp_cd: updatedValue.emp_cd,
          send_yn: "2",
          origin: "N",
          use_fg: "",
          // 기타 필요한 초기화 값들...
        };

        this.setState((prevState) => ({
          rows: [...prevState.rows, emptyRow],
          updatedValue: "",
        }));
      } catch (error) {
        console.error(error);
        this.handleSnackbarOpen("문제가 발생했습니다.다시 시도해주세요", "error");
      }
    } else if (updatedValue.origin === "Y") {

      this.handleSnackbarOpen(
        "임시저장 되었습니다.",
        "success"
      );



    }

  }


  render() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const { isModalOpen } = this.state;

    const columns = [
      {
        field: "id",
        headerName: "No",
        width: 30,
        editable: true,
        headerAlign: "center",
        align: "center",
        sortable: false,

        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "bookmark_cd",
        headerName: "코드",
        width: 70,
        editable: true,
        headerAlign: "center",
        align: "center",
        sortable: false,
        // 필수 값 배경색 설정
        cellClassName: (params) => {
          if (this.state.selectedRowId === params.id) {
            return "required-field-style";
          }
          return "";
        },
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "bookmark_nm",
        headerName: "즐겨찾기명",
        type: "string",
        width: 140,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        // 필수 값 배경색 설정
        cellClassName: (params) => {
          if (this.state.selectedRowId === params.id) {
            return "required-field-style";
          }
          return "";
        },
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "use_fg",
        headerName: "운행구분",
        type: "singleSelect",
        valueOptions: this.state.usefg.map((item) => item.d_nm),
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        // 필수 값 배경색 설정
        cellClassName: (params) => {
          if (this.state.selectedRowId === params.id) {
            return "required-field-style";
          }
          return "";
        },
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "start_time",
        headerName: "출발시간",
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        type: "string",
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
        renderCell: (params) => {
          const time = params.value;

          // 값이 "12:00" 형식인지 확인
          if (/^\d{2}:\d{2}$/.test(time)) {
            return time;
          }

          // 값이 "1200" 형식인지 확인하고 포맷팅
          if (time && time.length === 4 && !isNaN(time)) {
            const hours = time.substring(0, 2);
            const minutes = time.substring(2, 4);
            return `${hours}:${minutes}`;
          }

          // 값이 다른 형식이거나 누락된 경우 원래 값을 반환
          return time;
        },
      },

      {
        field: "end_time",
        headerName: "도착시간",
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        type: "string",
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
        renderCell: (params) => {
          const time = params.value;

          // 값이 "12:00" 형식인지 확인
          if (/^\d{2}:\d{2}$/.test(time)) {
            return time;
          }

          // 값이 "1200" 형식인지 확인하고 포맷팅
          if (time && time.length === 4 && !isNaN(time)) {
            const hours = time.substring(0, 2);
            const minutes = time.substring(2, 4);
            return `${hours}:${minutes}`;
          }

          // 값이 다른 형식이거나 누락된 경우 원래 값을 반환
          return time;
        },
      },

      {
        field: "start_fg",
        headerName: "출발구분",
        width: 100,
        type: "singleSelect",
        editable: true,
        valueOptions: this.state.startendfg.map((item) => item.p_nm), // p_nm 값들을 이용하여 valueOptions 구성
        align: "center",
        headerAlign: "center",
        sortable: false,

        // 필수 값 배경색 설정
        cellClassName: (params) => {
          if (this.state.selectedRowId === params.id) {
            return "required-field-style";
          }
          return "";
        },
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "start_addr",
        headerName: "출발지",
        type: "string",
        width: 140,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "end_fg",
        headerName: "도착구분",
        type: "singleSelect",
        valueOptions: this.state.startendfg.map((item) => item.p_nm),
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        // 필수 값 배경색 설정
        cellClassName: (params) => {
          if (this.state.selectedRowId === params.id) {
            return "required-field-style";
          }
          return "";
        },
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "end_addr",
        headerName: "도착지",
        type: "string",
        width: 140,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "mileage_km",
        headerName: "주행(Km)",
        type: "string",
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
    ];

    return (
      <div onKeyDown={this.handleKeyDown}>
        <MenuItem onClick={this.handleOpen}>즐겨찾기</MenuItem>
        <Dialog
          open={isModalOpen}
          close={this.closeModal}
          maxWidth="lg"
          PaperProps={{
            style: {
              width: "100vw",
              height: "70vh",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            즐겨찾기 등록 및 조회
          </DialogTitle>

          <DialogContent sx={{ height: "calc(80vh - 64px)", padding: "0px" }}>
            <div style={{ height: "90%", width: "100%" }}>
              <DataGrid
                ref={this.dataGridRef}
                disableColumnFilter
                disableColumnMenu
                hideFooterPagination
                hideFooter
                processRowUpdate={this.processRowUpdatefunc}
                onCellKeyDown={this.cellkeydown}
                onRowClick={this.handleRowClick}
                onCellClick={this.handleCellClick}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    background: "#cccccc",
                    borderRadius: 0,
                  },
                  borderTop: "2px solid black",
                  height: 500,
                  borderRadius: 0,
                  margin: "5px",
                  overflowY: "auto",
                }}
                rows={this.state.rows}
                columns={columns}
              />
              {/* 행 추가 버튼 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginTop: "10px",
                  marginLeft: "10px"
                }}
              >
                <button
                  onClick={this.handleSaveRowButtonClick}
                  style={{
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #D3D3D3",
                    height: "25px",
                    width: "100px",
                    fontSize: "12px",
                  }}
                >
                  저장
                </button>
              </div>
            </div>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              mt={2}
              mb={0}
              ml={0}
            >
              <Grid item mb={0}>
                <button
                  onClick={this.closeModal}
                  style={{
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #D3D3D3",
                    height: "25px",
                    width: "60px",
                    fontSize: "12px",
                  }}
                >
                  취소
                </button>
              </Grid>
              <Grid item mb={0} ml={1}>
                <button
                  onClick={this.saveModalCheckedItems}
                  style={{
                    background: "#f2f2f2",
                    border: "1px solid #D3D3D3",
                    height: "25px",
                    width: "60px",
                    fontSize: "12px",
                  }}
                >
                  확인
                </button>

                <Dialog
                  open={this.state.isConfirmationModalOpen}
                  onClose={this.closeConfirmationModal}
                  maxWidth="xs"
                  PaperProps={{
                    style: {
                      padding: "16px",
                    },
                  }}
                >
                  <DialogTitle>정말 저장하시겠습니까?</DialogTitle>
                  <DialogContent>
                    <Grid container justifyContent="flex-end">
                      <button
                        onClick={this.closeConfirmationModal}
                        style={{
                          backgroundColor: "#f2f2f2",
                          border: "1px solid #D3D3D3",
                          height: "25px",
                          width: "60px",
                          fontSize: "12px",
                        }}
                      >
                        취소
                      </button>

                      <button
                        onClick={this.handleConfirmation}
                        style={{
                          background: "#f2f2f2",
                          border: "1px solid #D3D3D3",
                          height: "25px",
                          width: "60px",
                          fontSize: "12px",
                        }}
                      >
                        확인
                      </button>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </DialogContent>

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
                backgroundColor: "#FBFBFB",
                ".MuiAlert-icon": {
                  iconColor: "#ffffff",
                },
                // color: "white",
                fontWeight: "bold",
              }}
            >
              {this.state.snackBarMessage}
            </Alert>
          </Snackbar>
        </Dialog>
      </div>
    );
  }
}

export default Ace1010Bookmark;
