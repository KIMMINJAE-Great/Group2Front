import { Component } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import MonitorIcon from "@mui/icons-material/Monitor";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box } from "@mui/system";
import CardList from "../../components/commons/CardList";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Postcode from "../../components/commons/Postcode";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CodePicker from "../../components/CodePicker/CodePicker";
import CodePickerManager from "../../components/CodePicker/CodePickerManager";
import { getByQueryString } from "../../components/api_url/API_URL";

const StyledIconButton = styled(IconButton)(() => ({
  backgroundColor: "#F0F0F0" /* 밝은 회색 배경색 */,

  borderRadius: "50%",
  marginLeft: 10,
  marginTop: -7,
  pointerEvents: "none",
}));

class Acd1010Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lease_yn: "all",
    };
  }
  clearFields = () => {
    this.setState({

      lease_yn: "",

    });
  };

  carSearch = async () => {
    const { lease_yn } = this.state;

    try {
      const queryString = `?lease_yn=${lease_yn || ""}`;
      const response = await getByQueryString(`/regcar/carsearch${queryString}`);
      const carCards = response.data;
      console.log(carCards)
      this.props.carSearch(carCards);
      // this.clearFields();
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    return (
      <div className="acd1010search_container">
        <Grid container item sx={{ padding: "4px" }}>
          <Grid item xs={1.1} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "9px" }}>차량</h5>
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ backgroundColor: "white", paddingLeft: "5px" }}
          >
            <CodePickerManager helpId={"CarCodePicker"} variant="outlined" />
          </Grid>




          {/* 임차구분 */}
          <Grid item xs={3} style={{ textAlign: "right" }}>
            <Typography>
              <h5 style={{ margin: "9px" }}>임차구분</h5>
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ backgroundColor: "white", paddingLeft: "5px" }}
          >
            <Select
              value={this.state.lease_yn}
              onChange={event => this.setState({ lease_yn: event.target.value })}
              variant="outlined"
              style={{ width: "100%", height: "36px" }}
            >
              <MenuItem value="all">0.전체</MenuItem>
              <MenuItem value="owned">1.자가</MenuItem>
              <MenuItem value="rented">2.렌트</MenuItem>
              <MenuItem value="leased">3.리스</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <IconButton
          color="black"
          size="small"
          sx={{
            borderRadius: 0,
            backgroundColor: "#FAFAFA",
            border: "1px solid #D3D3D3",
            ml: 3,
            width: "30px",
            height: "30px",
            marginRight: "10px",
            marginTop: "5px",
          }}
        >
          <SearchIcon onClick={this.carSearch} />
        </IconButton>
        <Button sx={{ width: 60, fontSize: 10, marginTop: 0.5, marginRight: 0.1 }} onClick={this.clearFields}>비우기</Button>
      </div>
    );
  }
}

export default Acd1010Search;
