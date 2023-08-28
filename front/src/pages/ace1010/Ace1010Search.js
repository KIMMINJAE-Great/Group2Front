import {
  Grid, Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Slide
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SearchIcon from '@mui/icons-material/Search';
import { getByQueryString, post } from "../../components/api_url/API_URL";
import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from "dayjs";
import CodePickerManager from '../../components/codepicker/CodePickerManager';
const theme = createTheme({
  components: {

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
          height: 30,
          width: 170
        },
      },
    },
  },
});

class Ace1010Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car_cd: "",
      carinfo: [],

      firstUse_dt: dayjs().startOf('month'),   // 해당 달의 첫째날
      LastUse_dt: dayjs().endOf('month'),     // 해당 달의 말일
      openSnackBar: false,
      beforeKm: "",
    };
  }





  handleclearFields = () => {
    this.setState({
      car_cd: "",

      carinfo: ""
    });
  };

  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };



  searchcarforabizperson = async (event) => {
    const { car_cd, firstUse_dt, LastUse_dt } = this.state;
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    // if (searchCarResult) {
    //   this.setState({ car_cd: searchCarResult });
    // }
    if (!this.state.firstUse_dt || !this.state.LastUse_dt) {
      this.showErrorSnackbar();
      return;
    }
    const formattedFirstUse = firstUse_dt.format('YYYY-MM-DD');
    const formattedLastUse = LastUse_dt.format('YYYY-MM-DD');
    let carforabizperson
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));

      const co_cd = user.co_cd;
      const use_dt = LastUse_dt.format('YYYYMMDD');
      const queryString2 = `?car_cd=${car_cd}&co_cd=${co_cd}&use_dt=${use_dt}`;
      const reponseForkf = await getByQueryString(`/ace1010/selectLastAfterKm${queryString2}`)
      this.props.setLastAfterKm(reponseForkf.data);

      const queryString = `?car_cd=${car_cd}&startDate=${formattedFirstUse}&endDate=${formattedLastUse}`;
      const response = await getByQueryString(`/ace1010/searchcarforabizperson${queryString}`);

      if (response.data === 'not found') {
        this.props.searchcarforabizperson(null, car_cd);
      } else if (response.data === 'not using') {
        this.props.searchcarforabizperson('none');
      }
      else {
        carforabizperson = response.data;
        this.props.searchcarforabizperson(carforabizperson, car_cd);
      }
      //  기초거리 혹은 기록의 마지막 after_km가져오기




      const response2 = await post('/ace1010/selectStartaccKm', { car_cd }); // 두 번째 엔드포인트 호출
      const startacc_km = response2.data.startacc_km
      this.props.setStartacckm(startacc_km)



      this.setState({
        beforeKm: startacc_km,
      });

      // this.handleclearFields();
    } catch (error) {
      console.log(error);
    }
  };

  //서치 콜백  
  searchCallback = {
    handleCallBackData: (code) => {
      this.setState({ car_cd: code }, () =>
        console.log(""));
    },

  }


  render() {

    const beforeKm = this.props.beforeKm;

    return (
      <form onSubmit={this.searchcarforabizperson}>
        <div className="acc1010search_container" >

          <Grid container item sx={{ padding: '4px', }}>


            <Grid item xs={1.1} style={{ textAlign: "right" }}>
              <Typography>
                <h5 style={{ margin: "5px" }}>차량</h5>
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
              {/* 코드피커 */}
              <CodePickerManager helpId={"DrivingCodePicker"} callback={this.searchCallback} variant="outlined"
                onChange={(e) => {
                  const carInfo = (e || []).length > 0 ? e[0] : undefined
                  this.setState({ car_cd: carInfo.carCd })
                }}
              />

            </Grid>
            <Grid item xs={1.1} style={{ textAlign: "right" }}>
              <Typography>
                <h5 style={{ margin: "5px" }}>운행일</h5>
              </Typography>
            </Grid>
            <ThemeProvider theme={theme}>
              <Grid item xs={6} sx={{ backgroundColor: 'white', paddingLeft: '5px', display: 'flex' }} >

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    value={this.state.firstUse_dt}
                    onChange={(date) => this.setState({ firstUse_dt: date })}
                    sx={{ backgroundColor: '#FEF4F4' }}
                  />
                </LocalizationProvider> &nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp;
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={this.state.LastUse_dt}
                    onChange={(date) => this.setState({ LastUse_dt: date })}
                    sx={{ backgroundColor: '#FEF4F4' }}
                  />
                </LocalizationProvider>
              </Grid>
            </ThemeProvider>

          </Grid>

          <IconButton type="submit" color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px', marginRight: '10px', marginTop: '5px' }}>
            <SearchIcon />
          </IconButton>

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
              운행일자를 선택해 주세요
            </Alert>
          </Snackbar>
        </div>
      </form >
    )
  }

}

export default Ace1010Search;