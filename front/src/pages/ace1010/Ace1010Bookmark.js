import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
} from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";

class Ace1010Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: "",
      bookmarks: [], // 즐겨찾기 객체들

       // 출발 도착 구분
       startendfg: [],

       // 운행 구분
      usefg: [],





      // 차량에 대해 운행기록부가 저장되면 다시 데이터를 불러오기 위한 state
      selectedRowforbgc: "",
      hour: "",
      minute: "",
      car_cd: "",
      rows: [],

    };
  }

  handleOpen = async () => {
    try {
      const response = "";
      const open = !this.state.isModalOpen;
      this.setState({
        isModalOpen: open,
        bookmarks: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const authority = user.authorities[0].authority;

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
        field: "BOOKMARK_CD",
        headerName: "코드",
        width: 70,
        editable: true,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "BOOKMARK_NM",
        headerName: "즐겨찾기명",
        type: "string",
        width: 140,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "START_TIME",
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
        field: "END_TIME",
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
        field: "USE_FG",
        headerName: "운행구분",
        type: "singleSelect",
        valueOptions: this.state.usefg.map((item) => item.d_nm),
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "START_FG",
        headerName: "출발구분",
        width: 100,
        type: "singleSelect",
        editable: true,
        valueOptions: this.state.startendfg.map((item) => item.p_nm), // p_nm 값들을 이용하여 valueOptions 구성
        align: "center",
        headerAlign: "center",
        sortable: false,
        cellClassName: (params) => {
          if (this.state.selectedRowforbgc === params.id) {
            return "required-field-style";
          }
          return "";
        },
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "START_ADDR",
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
        field: "END_FG",
        headerName: "도착구분",
        type: "singleSelect",
        valueOptions: this.state.startendfg.map((item) => item.p_nm),
        width: 100,
        editable: true,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,

        cellClassName: (params) => {
          if (this.state.selectedRowforbgc === params.id) {
            return "required-field-style";
          }
          return "";
        },
      },
      {
        field: "END_ADDR",
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
        field: "MILEAGE_KM",
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

    const rows = [
        
        { id: 1, index:1,BOOKMARK_CD: "1", BOOKMARK_NM: "즐겨찾기 2", START_TIME: "09:00", END_TIME: "10:00", USE_FG: "운행2", START_FG: "출발2", START_ADDR: "출발지2", END_FG: "도착2", END_ADDR: "도착지2", MILEAGE_KM: 150 },
        { id: 2, BOOKMARK_CD: "2", BOOKMARK_NM: "즐겨찾기 3", START_TIME: "10:00", END_TIME: "11:00", USE_FG: "운행3", START_FG: "출발3", START_ADDR: "출발지3", END_FG: "도착3", END_ADDR: "도착지3", MILEAGE_KM: 200 },
        { id: 3, BOOKMARK_CD: "3", BOOKMARK_NM: "즐겨찾기 4", START_TIME: "11:00", END_TIME: "12:00", USE_FG: "운행4", START_FG: "출발4", START_ADDR: "출발지4", END_FG: "도착4", END_ADDR: "도착지4", MILEAGE_KM: 250 },
        { id: 4, BOOKMARK_CD: "4", BOOKMARK_NM: "즐겨찾기 5", START_TIME: "12:00", END_TIME: "13:00", USE_FG: "운행5", START_FG: "출발5", START_ADDR: "출발지5", END_FG: "도착5", END_ADDR: "도착지5", MILEAGE_KM: 300 },
        { id: 5, BOOKMARK_CD: "5", BOOKMARK_NM: "즐겨찾기 6", START_TIME: "13:00", END_TIME: "14:00", USE_FG: "운행6", START_FG: "출발6", START_ADDR: "출발지6", END_FG: "도착6", END_ADDR: "도착지6", MILEAGE_KM: 350 },
        { id: 6, BOOKMARK_CD: "6", BOOKMARK_NM: "즐겨찾기 7", START_TIME: "14:00", END_TIME: "15:00", USE_FG: "운행7", START_FG: "출발7", START_ADDR: "출발지7", END_FG: "도착7", END_ADDR: "도착지7", MILEAGE_KM: 400 },
        { id: 7, BOOKMARK_CD: "7", BOOKMARK_NM: "즐겨찾기 8", START_TIME: "15:00", END_TIME: "16:00", USE_FG: "운행8", START_FG: "출발8", START_ADDR: "출발지8", END_FG: "도착8", END_ADDR: "도착지8", MILEAGE_KM: 450 },
        { id: 8, BOOKMARK_CD: "8", BOOKMARK_NM: "즐겨찾기 9", START_TIME: "16:00", END_TIME: "17:00", USE_FG: "운행9", START_FG: "출발9", START_ADDR: "출발지9", END_FG: "도착9", END_ADDR: "도착지9", MILEAGE_KM: 500 },
        { id: 9, BOOKMARK_CD: "9", BOOKMARK_NM: "즐겨찾기 8", START_TIME: "15:00", END_TIME: "16:00", USE_FG: "운행8", START_FG: "출발8", START_ADDR: "출발지8", END_FG: "도착8", END_ADDR: "도착지8", MILEAGE_KM: 450 },
        { id: 10, BOOKMARK_CD: "10", BOOKMARK_NM: "즐겨찾기 8", START_TIME: "15:00", END_TIME: "16:00", USE_FG: "운행8", START_FG: "출발8", START_ADDR: "출발지8", END_FG: "도착8", END_ADDR: "도착지8", MILEAGE_KM: 450 },
        { id: 11, BOOKMARK_CD: "1", BOOKMARK_NM: "즐겨찾기 10", START_TIME: "17:00", END_TIME: "18:00", USE_FG: "운행10", START_FG: "출발10", START_ADDR: "출발지10", END_FG: "도착10", END_ADDR: "도착지10", MILEAGE_KM: 550 },
    ];

    return (
      <div>
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
                
                isCellEditable={(params) => {
                  // send_yn 필드만 확인
                  if (params.field === "send_yn") {
                    // userRole이 ADMIN이 아니면 수정 불가
                    return authority === "ROLE_ADMIN";
                  }
                  // 다른 셀은 기본적으로 수정 가능하다고 가정
                  return true;
                }}
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
                rows={rows}
                columns={columns}
              />
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
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Ace1010Bookmark;
