import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";

class Ace1010DivisionDistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: "",
    };
  }

  handleOpen = async () => {
    try {
      const response = "";
      const open = !this.state.isModalOpen;
      this.setState({
        isModalOpen: open,
        //   bookmarks: response.data,
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
      { field: "index", headerName: "No", width: 10 },
      { field: "APER_STARTACC_INFO", headerName: "운행일자", width: 130 },
      { field: "USE_FG", headerName: "운행구분", width: 80 },
      { field: "START_FG", headerName: "출발구분", width: 80 },
      { field: "START_ADDR", headerName: "출발지", width: 100 },
      { field: "END_FG", headerName: "도착구분", width: 90 },
      { field: "END_ADDR", headerName: "도착지", width: 100 },
      { field: "MILEAGE_KM", headerName: "기입력주행(km)", width: 130 },
      { field: "increase", headerName: "증감(km) ", width: 90 },
      { field: "modify", headerName: "수정할주행(km)", width: 130 },
      { field: "before", headerName: "주행전(km)", width: 100 },
      { field: "after", headerName: "주행후(km) ", width: 100 },
    ];

    const rows = [
        {
            id : 1,
            index: 1,
            APER_STARTACC_INFO: "2019/12/02(월)",
            USE_FG: "출근",
            START_FG: "자택",
            START_ADDR: "퇴계로128",
            END_FG: "회사",
            END_ADDR: "더존비즈온",
            MILEAGE_KM: "25",
            increase: "1",
            destination: "26",
            modify: "5,000",
            before: "5,026",
            after: "",
          },
          
      
    ];

    return (
      <div>
        <MenuItem onClick={this.handleOpen}>안분</MenuItem>
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
          <DialogTitle sx={{ fontWeight: "bold" }}>주행거리 안분</DialogTitle>

          <DialogContent  sx={{ overflow: 'hidden'}}>
            <Grid container spacing={2}>
              <Grid item xs={4} display="flex" alignItems="center">
              <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px' }}>현재 주행 후 거리(km) : </Typography>
              <TextField
                      sx={{ width: '50%', ml: 1,  backgroundColor: '#FEF4F4'  }}
                      variant="outlined" size="small"
                      inputProps={{ style: { height: '12px' } }} />
              </Grid>
              <Grid item xs={4} display="flex" alignItems="center">
              <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px' }}>수정할 주행 후 거리(km) : </Typography>
              <TextField
                      sx={{ width: '50%', ml: 1 }}
                      variant="outlined" size="small"
                      inputProps={{ style: { height: '12px' } }} />
              </Grid>
              <Grid item xs={4} display="flex" alignItems="center">
              <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px' }}>안분할 주행 후 거리(km) : </Typography>
              <TextField
                      sx={{ width: '50%', ml: 1, backgroundColor: '#FEF4F4' }}
                      variant="outlined" size="small"
                      inputProps={{ style: { height: '12px' } }} />
              </Grid>
            </Grid>

           

          </DialogContent >

          <DialogContent sx={{ height: "calc(80vh - 64px)", padding: "0px" }}>
            <div style={{ height: "90%", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                hideFooterPagination 
                hideFooter
                sx={{ ml: "6px" }}

                disableColumnFilter
                disableColumnMenu
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

export default Ace1010DivisionDistance;
