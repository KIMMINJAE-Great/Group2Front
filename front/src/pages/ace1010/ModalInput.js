
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import Ace1010Bookmark from './Ace1010Bookmark';

class ModalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      
    };
  }

  // handleChange = (e) => {
  //   this.setState({ inputValue: e.target.value });
  // }

  handleConfirm = (bookmarkparams) => {
    this.props.onConfirm(bookmarkparams);
  }

  onRowDoubleClick = (params,event) => {
    console.log(event)
    console.log(params.row)
    console.log("/..............................e더블클릭실행");
    const bookmarkparams = params.row
    this.handleConfirm(bookmarkparams)
  }

  render() {
    const columns = [

      {
        field: "id",
        headerName: "No",
        width: 30,
        editable: false,
        headerAlign: "center",
        align: "center",
        sortable: false,

        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "bookmark_cd",
        headerName: "코드",
        width: 70,
        editable: false,
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
        editable: false,
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
        // valueOptions: this.state.usefg.map((item) => item.d_nm),
        width: 100,
        editable: false,
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
        editable: false,
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
        editable: false,
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
        editable: false,
        // valueOptions: this.state.startendfg.map((item) => item.p_nm), // p_nm 값들을 이용하여 valueOptions 구성
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
        editable: false,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
      {
        field: "end_fg",
        headerName: "도착구분",
        type: "singleSelect",
        // valueOptions: this.state.startendfg.map((item) => item.p_nm),
        width: 100,
        editable: false,
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
        editable: false,
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
        editable: false,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      },
    ];

    


    
    return (
      <div>
        <div >
          <Dialog open={this.props.showModal}
          close={this.props.handleModalNotConfirm}
          maxWidth="lg"
          PaperProps={{
            style: {
              width: "100vw",
              height: "70vh",
            },
          }}>
            <DialogTitle sx={{ fontWeight: "bold" }}>
              즐겨찾기 목록
            </DialogTitle>
            <DialogContent  sx={{ height: "calc(80vh - 64px)", padding: "4px" }}>
              <div style={{ height: "90%", width: "100%" }}>
                <DataGrid
                  ref={this.dataGridRef}
                  onRowDoubleClick={this.onRowDoubleClick}
                  disableColumnFilter
                  disableColumnMenu
                  hideFooterPagination
                  hideFooter
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
                  columns={columns}
                  rows={this.props.rows}  // 여기에 표시할 데이터 행을 설정해야 합니다.
                  // ... (다른 DataGrid 옵션 설정)
                />
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
                  onClick={this.props.onCancel}
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
            </Grid>
              </div>

            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}



export default ModalInput;