import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import MonitorIcon from '@mui/icons-material/Monitor';
import { Button, Card, CardContent, IconButton, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from "@mui/system";
import CardList from "../../components/commons/CardList";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Postcode from "../../components/commons/Postcode";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CodePicker from "../../components/codepicker/CodePicker";

const MyTextField = styled(TextField)(({ theme }) => ({
  marginLeft: "8px",
  width: "100%",
  padding: theme.spacing(0.5),
  '& input': {
    height: '8px',
    fontSize: '10px',
    height: '0px',
  },
  '& .MuiOutlinedInput-root': { // TextField의 루트 요소에 스타일 적용
    borderRadius: 0, // 모서리를 완전히 직사각형으로    
  },
}));


const StyledIconButton = styled(IconButton)(() => ({
  backgroundColor: '#F0F0F0', /* 밝은 회색 배경색 */

  borderRadius: '50%',
  marginLeft: 10,
  marginTop: -7,
  pointerEvents: 'none'
}));

class Acd1010BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //     regCarCards: [],
      //     regCarCardData: [],
    }
  }


  render() {
    return (

      <div>
        <div style={{ marginRight: "15px" }}>


          {/* 박스 영역 끝 */}
          {/* 텍스트필드 무리 시작 */}
          <div>
            <Box sx={{ overflowY: "auto", maxHeight: "1000px" }}>
              <Grid container>
                <Grid container>
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                  >
                    {/* 1번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>자산계정</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 0, mb: 0, }}
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: '0px' }}
                        inputProps={{ style: { height: '12px', backgroundColor: '#FFF0F5' } }}
                        type="text"
                        name='acct_cd'
                        onChange={this.props.onInputChange} />
                    </Grid>
                    {/* 2번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>자산정보</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 1, mb: 1, }}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { height: '12px', backgroundColor: '#FFF0F5' } }}
                        type="text"
                        name='asset_cd'
                        onChange={this.props.onInputChange} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                >
                  {/* 3번 째 */}
                  <Grid container>
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>회계단위</Typography>
                    </Grid>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 1, mb: 1 }}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { height: '12px' } }}
                        type="text"
                        name='div_cd'
                        onChange={this.props.onInputChange} />
                    </Grid>
                    {/* 4번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>차량코드</Typography>
                    </Grid>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 1, mb: 1, }}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { height: '12px', backgroundColor: '#FFF0F5' } }}
                        type="text"
                        name='car_cd'
                        onChange={this.props.onInputChange} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                >
                  {/* 5번 째 */}
                  <Grid container>
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>차량번호</Typography>
                    </Grid>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 1, mb: 1, }}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { height: '12px', backgroundColor: '#FFF0F5' } }}
                        type="text"
                        name='car_nb'
                        onChange={this.props.onInputChange} />
                    </Grid>
                    {/* 6번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>차량명</Typography>
                    </Grid>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 1, mb: 1, }}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { height: '12px', backgroundColor: '#FFF0F5' } }}
                        type="text"
                        name='car_nm'
                        onChange={this.props.onInputChange} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                >
                  {/* 7번 째 */}
                  <Grid container>
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>취득일자</Typography>
                    </Grid>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style>
                        <div style={{ padding: "5px 0" }}>
                          <DatePicker
                            name="opn_dt"
                            requierd
                            onChange={(date) => this.props.onInputChange({ target: { name: 'get_dt', value: date } })}
                            variant="outlined"
                            InputProps={{ style: { height: 30, padding: '0 10px' } }}
                            style={{ width: "100%" }}
                            slotProps={{ textField: { size: 'small' } }} />
                        </div>
                      </LocalizationProvider>
                    </Grid>
                    {/* 8번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>처분일자</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style>
                        <div style={{ padding: "5px 0", width: "45%" }}>
                          <DatePicker
                            name="opn_dt"
                            onChange={(date) => this.props.onInputChange({ target: { name: 'disposal_dt', value: date } })}
                            variant="outlined"
                            InputProps={{ style: { height: 30, padding: '0 10px', } }}
                            style={{ width: "100%" }}
                            slotProps={{ textField: { size: 'small' } }} />
                        </div>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>


                <Grid
                  container
                  item
                  xs={12}
                  sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                >
                  {/* 9번 째 */}
                  <Grid container>
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>임차구분</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <Select
                        sx={{ width: '100%', ml: 1, height: '75%' }}
                        variant="outlined"
                        size="small"
                        name="lease_yn"
                        value={this.props.lease_yn}
                        onChange={this.props.onInputChange}
                        displayEmpty
                      >
                        <MenuItem value="owned" >자가</MenuItem>
                        <MenuItem value="rented" >렌트</MenuItem>
                        <MenuItem value="leased" >리스</MenuItem>

                      </Select>
                    </Grid>
                    {/* 10번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>임차기간</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style>
                        <div style={{ padding: "5px 0" }}>
                          <DatePicker
                            name="opn_dt"

                            onChange={(date) => this.props.onInputChange({ target: { name: 'fr_dt', value: date } })}
                            variant="outlined"
                            InputProps={{ style: { height: 30, padding: '0 10px' } }}
                            style={{ width: "100%" }}
                            slotProps={{ textField: { size: 'small' } }} />
                        </div>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>


                <Grid
                  container
                  item
                  xs={12}
                  sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                >
                  {/* 11번 째 */}
                  <Grid container>
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>보험회사</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <MyTextField
                        sx={{ width: '100%', ml: 1, mt: 1, mb: 1 }}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { height: '12px' } }}
                        type="text"
                        name='insur_tr_cd'
                        onChange={this.props.onInputChange} />
                    </Grid>
                    {/* 12번 째 */}
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>보험기간</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style>
                        <div style={{ padding: "5px 0" }}>
                          <DatePicker
                            name="opn_dt"

                            onChange={(date) => this.props.onInputChange({ target: { name: 'ifr_dt', value: date } })}
                            variant="outlined"
                            InputProps={{ style: { height: 30, padding: '0 10px' } }}
                            style={{ width: "100%" }}
                            slotProps={{ textField: { size: 'small' } }} />
                        </div>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>


                <Grid
                  container
                  item
                  xs={12}
                  sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
                >
                  {/* 13번 째 */}
                  <Grid container>
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "#FAFAFA" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }}>사용여부</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <Select
                        sx={{ width: '100%', ml: 1, height: '75%' }}
                        variant="outlined"
                        size="small"
                        name="use_yn"
                        value={this.props.use_yn}
                        onChange={this.props.onInputChange}
                        displayEmpty
                      >
                        <MenuItem value="all" >전체</MenuItem>
                        <MenuItem value="Y" >사용</MenuItem>
                        <MenuItem value="N" >미사용</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>

        </div>
      </div>
    )
  }
}

export default Acd1010BasicInfo;