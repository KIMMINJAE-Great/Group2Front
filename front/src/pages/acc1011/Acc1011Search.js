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
import SearchIcon from '@mui/icons-material/Search';
import { blue } from "@mui/material/colors";
import { getByQueryString } from "../../components/api_url/API_URL";
import { Component } from "react";

class Acc1011Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "1000", //default값을 1000으로
      status: "",

    };
  }
  clearFields = () => {
    this.setState({
      company: "",
      status: "",

    });
  };

  deptSearch = async () => {
    const { company, status } = this.state;

    try {
      const queryString = `?company=${company || ""}&status=${status || ""}`;
      const response = await getByQueryString(`/depmanagement/deptsearch${queryString}`);
      const departmentCards = response.data;
      this.props.deptSearch(departmentCards);
      this.clearFields();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="acc1011search_container" >

        <Grid container item sx={{ padding: '4px' }}>
          <Grid item xs={1.1} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "5px" }}>회사</h5>
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
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

          {/* 유형구분 */}
          <Grid item xs={1.1} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "5px" }}>유형구분</h5>
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
            <Select
              value={this.state.status}
              onChange={event => this.setState({ status: event.target.value })}
              variant="outlined"
              style={{ width: "100%", height: '28px' }}
            >
              <MenuItem value="account">회계과</MenuItem>
              <MenuItem value="humanresource">인사과</MenuItem>
              <MenuItem value="planning">기획과</MenuItem>
              <MenuItem value="sales">영업과</MenuItem>
            </Select>
          </Grid>


        </Grid>
        <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px', marginRight: '10px', marginTop: '5px' }}>
          <SearchIcon onClick={this.deptSearch} />
        </IconButton>
        <Button sx={{ width: 60, fontSize: 10, marginTop: 0.5, marginRight: 0.1 }} onClick={this.clearFields}>비우기</Button>

      </div>
    )
  }

}

export default Acc1011Search;