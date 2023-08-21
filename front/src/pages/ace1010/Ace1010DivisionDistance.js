import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";
import { get, getByQueryString, post } from "../../components/api_url/API_URL";

class Ace1010DivisionDistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rows: [],
      currentAfterKm: 0,
      divisionDistance: 0,
      startacc_kmForDivison: '',
      openSnackBar: false,

      // researchAfterSaveDivisionDistance: this.props.researchAfterSaveDivisionDistance,
    };

  }
  /**
   * 
   * @param {수정할주행후거리}
  1. 현재 주행거리 - 수정할 주행거리 -> 안분할 주행후 거리
  
  2. 안분할거리를 rows의 mileage_km의 합을 구하고 난뒤 해당 기입력 주행 / 총합계 
  3. 잔여 주행거리 X 2번의 비율 이 증감에 들어가고
  4. 기입력 주행 + 증감이 수정할 주행에 입력.
  5. 수정할 주행  + 주행전 -> 주행 후} value 
   */
  modifyMileageKm = (value) => {
    const currentAfterKm = Number(this.state.currentAfterKm);
    //1. 현재 주행 후 거리 - 수정할 주행 후 거리  음수가 반환 될 수 있기에 절대값을 반환
    const divisionDistanceAbsolute = Math.abs(currentAfterKm - Number(value));

    // 2. 안분할 운행기록의 기입력 주행의 합을 구함
    const sumMileageKm = this.state.rows.reduce((acc, item) => acc + item.mileage_km, 0);
    // 3. 증감을 구해 한 운행기록마다 입력, 만약 소수점 첫째 자리가 5이상일 경우 올림 아니라면 내림
    // 그리고 만약 현재주행거리 - 수정할 주행거리의 값이 안분할 운행기록에 정수로 정확하게 나누어
    // 줄수 없는 상황이 있기 때문에 오차값을 포함시켜 임시 배열에 저장
    let tempIncreases = this.state.rows.map((row) => {
      let increaseValue = row.mileage_km / sumMileageKm * divisionDistanceAbsolute;

      // 소수점 첫째 자리가 5이상인지 확인
      if (increaseValue % 1 >= 0.5) {
        increaseValue = Math.ceil(increaseValue);
      } else {
        increaseValue = Math.floor(increaseValue);
      }

      return increaseValue;
    });

    // 4.임시배열의 증가값들을 먼저 더하여 안분할 거리에서 뺀다.
    // 그 뒤 임시배열의 마지막 값에 그 값을 연산한다.
    // 만약 divisionDistanceAbsolute 가 10일 때 tempIncease 값이 9일 경우 혹은 11일 경우 그 차를 마지막에 더하거나 뺸다.
    tempIncreases[tempIncreases.length - 1] += divisionDistanceAbsolute - tempIncreases.reduce((acc, r) => acc + r, 0);

    // 5. 모든 안분 계산이 끝난 임시 배열을  현재주행보다 수정할 주행후 거리가
    // 작거나 클 경우 상황에 맞게 수정할 주행의 값을 연산하여 값을 추가한다.
    const updatedRows = this.state.rows.map((row, index) => {
      const increaseValue = tempIncreases[index];
      let modifiedValue;

      if (currentAfterKm > value) {
        modifiedValue = row.mileage_km - increaseValue;
      } else {
        modifiedValue = row.mileage_km + increaseValue;
      }
      // 6. 수정할 주행과 주행전을 더하여 새로운 주행후 거리 값을 추가한다.
      let after_km = modifiedValue + row.before_km

      return { ...row, increase: increaseValue, modify_mileage_km: modifiedValue, after_km: after_km };
    });

    this.setState({ rows: updatedRows, divisionDistance: divisionDistanceAbsolute });
  };




  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.modifyMileageKm(event.target.value);
    }
  };

  handleBlur = (event) => {
    this.modifyMileageKm(event.target.value);
  };

  handleOpen = (rows) => {
    console.log('안분열림')
    console.log(rows)
    if (rows.length === 0) {
      this.showErrorSnackbar()
      return
    }
    console.log('안분 열림')
    console.log(rows)
    this.setState({
      isModalOpen: true,
      cureentAfterKm: '',
    })

    rows.sort((a, b) => a.seq_nb - b.seq_nb);


    const car_cd = rows[0].car_cd

    //const response = await getByQueryString(`/ace1010/searchcarforabizperson${queryString}`);
    getByQueryString(`/ace1010/getstartaccfordivision?car_cd=${car_cd}`)
      .then((response) => {
        console.log('안분에서 기초거리 갖고오기')
        console.log(response.data)

        let accumulatedMileage = response.data;

        const newRows = rows.map((row, index) => {
          if (index === 0) {
            row.before_km = accumulatedMileage;
            row.after_km = response.data + row.mileage_km;
          } else {
            accumulatedMileage += Number(rows[index - 1].mileage_km);
            row.before_km = accumulatedMileage;
            row.after_km = row.before_km + row.mileage_km;
          }
          return row;
        });
        const currentAfterKm = newRows[newRows.length - 1].after_km;
        // 업데이트 된 rows를 state에 반영
        this.setState({ rows: newRows, currentAfterKm: currentAfterKm });

      })
      .catch((error) => {
        console.error(error)
      })


    // this.setState({ rows: rows })
  };
  // 안분 요청
  onConfirm = () => {
    console.log('안분 요청시작')
    const updateRowsForDivisionDistance = [...this.state.rows];

    updateRowsForDivisionDistance.sort((a, b) => a.seq_nb - b.seq_nb);

    const data = updateRowsForDivisionDistance.map((row) => {
      return {
        seq_nb: row.seq_nb,
        mileage_km: row.modify_mileage_km,
        car_cd: row.car_cd,
      }
    })
    this.props.updateLoadingStateTrue();
    post(`/ace1010/savedivisiondistance`, data)
      .then(response => {
        console.log(response.data)
        this.props.researchAfterSaveDivisionDistance()
        this.closeModal()
        setTimeout(() => {
          this.props.updateLoadingStateFalse()
        }, 1000)

      })
      .catch(error => {
        console.error(error)
        this.props.updateLoadingStateFalse()
      })
  }


  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };

  columns = () => {
    return [
      {
        field: 'id', headerName: 'No', width: 30, headerAlign: 'center', align: 'center', sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
      },
      {
        field: 'use_dt',
        headerName: '운행일자',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          return this.formatDate(params.value);
        },
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'use_fg',
        headerName: '운행구분',
        type: 'singleSelect',

        width: 80,

        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },

      {
        field: 'start_fg',
        headerName: '출발구분',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
        //onCellEditStart: this.handleCellEditStart,
      },

      {
        field: 'start_addr',
        headerName: '출발지',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'end_fg',
        headerName: '도착구분',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
      },
      {
        field: 'end_addr',
        headerName: '도착지',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'mileage_km',
        headerName: '기입력주행(Km)',
        width: 140,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'increase',
        headerName: '증감(Km)',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
      },
      {
        field: 'modify_mileage_km',
        headerName: '수정할주행(Km)',
        width: 150,
        align: 'center',
        editable: "true",
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'before_km',
        headerName: '주행전(km)',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
      },
      {
        field: 'after_km',
        headerName: '주행후(km)',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
      },

    ]
  }
  render() {
    const { isModalOpen } = this.state;
    const { selectedCheckedRows, } = this.props;
    console.log('안분 실행')
    console.log(selectedCheckedRows)

    return (
      <div>

        <MenuItem onClick={() => this.handleOpen(selectedCheckedRows)}>안분</MenuItem>
        <Dialog
          open={isModalOpen}
          close={this.closeModal}
          maxWidth="lg"
          PaperProps={{
            style: {
              width: "100vw",
              height: "80vh",
              borderRadius: 0,
              zIndex: '9990'
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", borderBottom: '1px solid black', marginBottom: '15px' }}>주행거리 안분</DialogTitle>

          <DialogContent sx={{ overflow: 'hidden' }}>
            <Grid container spacing={2}>
              <Grid item xs={4} display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px', fontWeight: 'bold', }} >현재 주행 후 거리(km) : </Typography>
                <TextField
                  sx={{ width: '50%', ml: 1, backgroundColor: '#FEF4F4' }}
                  variant="outlined" size="small"
                  inputProps={{ style: { height: '12px' } }}
                  value={this.state.currentAfterKm}
                  InputProps={{
                    readOnly: true
                  }} />
              </Grid>
              <Grid item xs={4} display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px', fontWeight: 'bold' }}>수정할 주행 후 거리(km) : </Typography>
                <TextField
                  sx={{ width: '50%', ml: 1 }}
                  variant="outlined" size="small"
                  inputProps={{ style: { height: '12px' } }}
                  onKeyDown={this.handleKeyDown}
                  onBlur={this.handleBlur}
                />
              </Grid>
              <Grid item xs={4} display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px', fontWeight: 'bold' }} >안분할 주행 후 거리(km) : </Typography>
                <TextField
                  sx={{ width: '50%', ml: 1, backgroundColor: '#FEF4F4' }}
                  variant="outlined" size="small"
                  inputProps={{ style: { height: '12px' } }}
                  value={this.state.divisionDistance}
                  InputProps={{
                    readOnly: true
                  }} />
              </Grid>
            </Grid>



          </DialogContent >

          <DialogContent sx={{ height: "calc(80vh - 64px)", padding: "0px" }}>
            <div style={{ height: "90%", width: "100%" }}>
              <DataGrid
                rows={this.state.rows}
                columns={this.columns()}
                pageSize={5}
                hideFooterPagination
                hideFooter
                sx={{
                  "& .MuiDataGrid-columnHeaders": { background: "#cccccc", borderRadius: 0, borderRight: '1px solid black' },
                  "& .MuiDataGrid-cell ": { borderRight: '1px solid #cccccc' },
                  borderTop: '2px solid black',
                  height: 500, borderRadius: 0, margin: '5px', overflowY: 'auto'
                }}

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
                  onClick={this.onConfirm}
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

        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={1000}
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
            먼저 안분할 운행기록을 선택해 주세요.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Ace1010DivisionDistance;
