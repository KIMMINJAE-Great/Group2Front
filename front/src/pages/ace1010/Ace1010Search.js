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

    try {
      const queryString = `?car_cd=${car_cd || ""}`;
      const response = await getByQueryString(`/ace1010/searchcarforabizperson${queryString}`);
      const carforabizperson = response.data;
      console.log('=======================================')
      console.log(carforabizperson)
      console.log('=======================================')
      if (this.props.searchcarforabizperson) {
        console.log('있다')
      } else {
        console.log('없다')
      }

      this.props.searchcarforabizperson(carforabizperson);
      // this.handleclearFields();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="acc1010search_container" >

        <Grid container item sx={{ padding: '4px' }}>
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
        </Grid>
        <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px', marginRight: '10px', marginTop: '5px' }}>
          <SearchIcon onClick={this.searchcarforabizperson} />
        </IconButton>
        <Button sx={{ width: 60, fontSize: 10, marginTop: 0.5, marginRight: 0.1 }} onClick={this.handleclearFields}>비우기</Button>

      </div>
    )
  }

}

export default Ace1010Search;