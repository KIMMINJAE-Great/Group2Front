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
  Typography
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import SearchIcon from '@mui/icons-material/Search';
import { getByQueryString } from "../../components/api_url/API_URL";
import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

      carinfo: ""
    };
  }
  handleclearFields = () => {
    this.setState({
      car_cd: "",

      carinfo: ""
    });
  };


  searchcarforabizperson = async () => {
    const { car_cd } = this.state;

    let carforabizperson
    try {
      const queryString = `?car_cd=${car_cd || ""}`;
      const response = await getByQueryString(`/ace1010/searchcarforabizperson${queryString}`);

      console.log('검색직후 ')
      console.log(response.data)
      if (response.data === 'not found') {
        this.props.searchcarforabizperson(null, car_cd);
      } else if (response.data === 'not using') {
        this.props.searchcarforabizperson('none');
      }
      else {
        carforabizperson = response.data;
        this.props.searchcarforabizperson(carforabizperson, car_cd);
      }

      // this.handleclearFields();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (

      <div className="acc1010search_container" >

        <Grid container item sx={{ padding: '4px' }}>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            </DemoContainer>
          </LocalizationProvider> */}
          {/* <Grid item xs={1.1} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "5px" }}>회사</h5>
            </Typography>
          </Grid> */}
          {/* <Grid item xs={1} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
            <Select
              value={this.state.company}
              onChange={event => this.setState({ company: event.target.value })}
              variant="outlined"
              style={{ width: "100%", height: '28px' }}
            >
              <MenuItem value="1000">1000 </MenuItem>
              <MenuItem value="2000">2000</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={1.1} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "5px" }}>재직구분</h5>
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
            <Select
              value={this.state.status}
              onChange={event => this.setState({ status: event.target.value })}
              variant="outlined"
              style={{ width: "100%", height: '28px' }}
            >
              <MenuItem value="ing">재직 </MenuItem>
              <MenuItem value="done">퇴사</MenuItem>
            </Select>
          </Grid> */}

          <Grid item xs={1.1} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "5px" }}>차량</h5>
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
            <TextField
              fullWidth
              require
              variant="outlined"
              size="small"
              value={this.state.car_cd}
              onChange={event => this.setState({ car_cd: event.target.value })}
              inputProps={{ style: { height: "12px" } }}
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
                <DatePicker />
              </LocalizationProvider> &nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp;
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Grid>
          </ThemeProvider>

        </Grid>
        <IconButton onClick={this.searchcarforabizperson} color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px', marginRight: '10px', marginTop: '5px' }}>
          <SearchIcon />
        </IconButton>
        <Button sx={{ width: 60, fontSize: 10, marginTop: 0.5, marginRight: 0.1 }} onClick={this.handleclearFields}>비우기</Button>

      </div>

    )
  }

}

export default Ace1010Search;