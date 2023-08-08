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
    const { isModalOpen } = this.state;

    const columns = [
      { field: "index", headerName: "No", width: 70 },
      { field: "BOOKMARK_CD", headerName: "코드", width: 70 },
      { field: "BOOKMARK_NM", headerName: "즐겨찾기명", width: 140 },
      { field: "START_TIME", headerName: "출발시간", width: 100 },
      { field: "END_TIME", headerName: "도착시간", width: 100 },
      { field: "USE_FG", headerName: "운행구분", width: 100 },
      { field: "START_FG", headerName: "출발구분", width: 100 },
      { field: "START_ADDR", headerName: "출발지", width: 140 },
      { field: "END_FG", headerName: "도착구분", width: 100 },
      { field: "END_ADDR", headerName: "도착지", width: 140 },
      { field: "MILEAGE_KM", headerName: "주행(Km)", width: 100 },
    ];

    const rows = [
        
        { id: 1, index:1,BOOKMARK_CD: "Code2", BOOKMARK_NM: "즐겨찾기 2", START_TIME: "09:00", END_TIME: "10:00", USE_FG: "운행2", START_FG: "출발2", START_ADDR: "출발지2", END_FG: "도착2", END_ADDR: "도착지2", MILEAGE_KM: 150 },
        { id: 2, BOOKMARK_CD: "Code3", BOOKMARK_NM: "즐겨찾기 3", START_TIME: "10:00", END_TIME: "11:00", USE_FG: "운행3", START_FG: "출발3", START_ADDR: "출발지3", END_FG: "도착3", END_ADDR: "도착지3", MILEAGE_KM: 200 },
        { id: 3, BOOKMARK_CD: "Code4", BOOKMARK_NM: "즐겨찾기 4", START_TIME: "11:00", END_TIME: "12:00", USE_FG: "운행4", START_FG: "출발4", START_ADDR: "출발지4", END_FG: "도착4", END_ADDR: "도착지4", MILEAGE_KM: 250 },
        { id: 4, BOOKMARK_CD: "Code5", BOOKMARK_NM: "즐겨찾기 5", START_TIME: "12:00", END_TIME: "13:00", USE_FG: "운행5", START_FG: "출발5", START_ADDR: "출발지5", END_FG: "도착5", END_ADDR: "도착지5", MILEAGE_KM: 300 },
        { id: 5, BOOKMARK_CD: "Code6", BOOKMARK_NM: "즐겨찾기 6", START_TIME: "13:00", END_TIME: "14:00", USE_FG: "운행6", START_FG: "출발6", START_ADDR: "출발지6", END_FG: "도착6", END_ADDR: "도착지6", MILEAGE_KM: 350 },
        { id: 6, BOOKMARK_CD: "Code7", BOOKMARK_NM: "즐겨찾기 7", START_TIME: "14:00", END_TIME: "15:00", USE_FG: "운행7", START_FG: "출발7", START_ADDR: "출발지7", END_FG: "도착7", END_ADDR: "도착지7", MILEAGE_KM: 400 },
        { id: 7, BOOKMARK_CD: "Code8", BOOKMARK_NM: "즐겨찾기 8", START_TIME: "15:00", END_TIME: "16:00", USE_FG: "운행8", START_FG: "출발8", START_ADDR: "출발지8", END_FG: "도착8", END_ADDR: "도착지8", MILEAGE_KM: 450 },
        { id: 8, BOOKMARK_CD: "Code9", BOOKMARK_NM: "즐겨찾기 9", START_TIME: "16:00", END_TIME: "17:00", USE_FG: "운행9", START_FG: "출발9", START_ADDR: "출발지9", END_FG: "도착9", END_ADDR: "도착지9", MILEAGE_KM: 500 },
        { id: 9, BOOKMARK_CD: "Code8", BOOKMARK_NM: "즐겨찾기 8", START_TIME: "15:00", END_TIME: "16:00", USE_FG: "운행8", START_FG: "출발8", START_ADDR: "출발지8", END_FG: "도착8", END_ADDR: "도착지8", MILEAGE_KM: 450 },
        { id: 10, BOOKMARK_CD: "Code8", BOOKMARK_NM: "즐겨찾기 8", START_TIME: "15:00", END_TIME: "16:00", USE_FG: "운행8", START_FG: "출발8", START_ADDR: "출발지8", END_FG: "도착8", END_ADDR: "도착지8", MILEAGE_KM: 450 },
        { id: 11, BOOKMARK_CD: "Code10", BOOKMARK_NM: "즐겨찾기 10", START_TIME: "17:00", END_TIME: "18:00", USE_FG: "운행10", START_FG: "출발10", START_ADDR: "출발지10", END_FG: "도착10", END_ADDR: "도착지10", MILEAGE_KM: 550 },
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
                rows={rows}
                columns={columns}
                pageSize={5}
                hideFooterPagination
                hideFooter
                sx={{ ml: "6px" }}
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
