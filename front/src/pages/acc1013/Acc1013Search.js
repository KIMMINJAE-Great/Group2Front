import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import CodePickerManager from '../../components/codepicker/CodePickerManager';
import {
  Button,
  IconButton,
  MenuItem,
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
        <div style={{ display: "flex", padding: "5px" }}>
          <Grid container style={{ height: "40px" }}>
            <Grid
              item
              xs={0.6}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <FieldName inputProps={{ style: { marginLeft: "35px" } }} variant="subtitle1">회사</FieldName>
            </Grid>
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
                callback={this.props.callback}
                variant="outlined"

              />
            </Grid>

            <Grid item xs={1.2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}>
              <FieldName variant="subtitle1" style={{ marginRight: "5px" }}>
                사용여부
              </FieldName>
            </Grid>
            <Grid item xs={1.7}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "39px",
              }}
            >
              <Select
                // value={this.props.defaultUse}
                name="defaultUse"
                onChange={(e) => this.props.handleDefaultUseChange(e.target.value)}
                value={this.props.searchCom?.defaultUse || ""}
                variant="outlined"
                style={{ width: "100%", height: "36px" }}
              >
                <MenuItem value="Y">사용</MenuItem>
                <MenuItem value="N">미사용</MenuItem>
              </Select>
            </Grid>
            <Grid item xs style={{ flexGrow: 1 }} />
            <Grid 
              item xs={0}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "40px",
              }}
            >
              <IconButton
                color="black"
                size="small"
                sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px' }}
                onClick={this.props.handleSearch}
              >
                <SearchIcon />
              </IconButton>
              <Button
                onClick={(e) =>
                  this.props.handleSaveButton(e)
                }
                style={{ marginLeft: 10,marginRight: 40, width: "5px" }}
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
