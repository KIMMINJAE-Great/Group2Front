import React from "react";
import { get, post } from "../../components/api_url/API_URL";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Postcode from "../../components/commons/Postcode";
import CodePickerManager from "../../components/codepicker/CodePickerManager";

import {
  Button,
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
} from "@mui/material";



//사용자정의함수로 만듦
const GridItem1 = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: "#FAFAFA",
}));

const GridItem3 = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: "#FAFAFA",
}));

const MyTextField = styled(TextField)(({ theme }) => ({
  marginLeft: "8px",
  width: "100%",
  padding: theme.spacing(0.5),
  "& input": {
    height: "8px",
    fontSize: "10px",
    height: "0px",
  },
  "& .MuiOutlinedInput-root": {
    // TextField의 루트 요소에 스타일 적용
    borderRadius: 0, // 모서리를 완전히 직사각형으로
  },
}));

const FieldName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "14px",
}));

class Acc1013Search extends React.Component {

    
 

  render() {
   

    return (
      <div>
        <div style={{  display: "flex" ,padding:"5px"}}>
          <Grid container style={{ height: "40px" }}>
            <GridItem1
              item
              xs={0.6}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FieldName inputProps={{ style:{ marginLeft: "35px" }}} variant="subtitle1">회사</FieldName>
            </GridItem1>
            <Grid
              item
              xs={1.3}
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "15px",
                alignItems: "center",
                height: "40px",
              }}
            >
              <CodePickerManager
                helpId={'CompanyCodePicker'}
                
                variant="outlined"
                
              />
            </Grid>

            <GridItem3 item xs={1.2}>
              <FieldName variant="subtitle1" style={{ marginRight: "5px" }}>
                사용여부
              </FieldName>
            </GridItem3>
            <Grid
              item
              xs={1.3}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Select
                value={this.props.defaultUse}
                onChange={this.props.onInputChange}
                variant="outlined"
                style={{ width: "100%", height: "28px" }}
              >
                <MenuItem value="use">사용</MenuItem>
                <MenuItem value="unused">미사용</MenuItem>
              </Select>
            </Grid>
            <Grid item xs style={{ flexGrow: 1 }} />
            <Grid
              item
              xs={0}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Button
                onClick={(e) =>
                  this.props.handleSaveButton(e, this.props.companyCardData)
                }
                style={{ marginRight: 40, width: "5px" }}
                variant="outlined"
              >
                저장
              </Button>
            </Grid>
          </Grid>
          <hr />
        </div>
      </div>
    );
  }
}

export default Acc1013Search;
