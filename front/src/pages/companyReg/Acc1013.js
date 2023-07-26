import React from "react";
import { get, post } from "../../componenets/api_url/API_URL";
import { styled, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Postcode from "../../componenets/commons/Postcode";

import profile from '../../images/logo.png'
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
import { color, height } from "@mui/system";


//사용자정의함수로 만듦
const GridItem1 = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: "#FAFAFA"
}));

const GridItem3 = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: '#FAFAFA',
}));

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
    borderRadius: 0, // 모서리를 완전히 직사각형으로 만듭니다.    
  },
}));

const FieldName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px'
}));

class Acc1013 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCards: [],
      companyCardData: [],
      cp_ct: '',
    };
  }



  render() {

    console.log("gd", this.props.companyCardData[0]);



    return (
      <form>
        <div>
          <Grid container style={{ height: '40px' }}>
            <GridItem1 item xs={0.3} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
              <FieldName variant="subtitle1">회사</FieldName>
            </GridItem1>
            <Grid
              item xs={1.9} style={{ display: "flex", flexDirection: "row", alignItems: "center", height: '40px' }} >
              <MyTextField variant="outlined" placeholder="회사코드/회사명을 입력하세요." InputProps={{ style: { height: "30px" } }} />
            </Grid>
            <GridItem3 item xs={0.6} >
              <FieldName variant="subtitle1" style={{ marginRight: "5px" }}>사용여부</FieldName>
            </GridItem3>
            <Grid
              item xs={1.3} style={{ display: "flex", flexDirection: "row", alignItems: "center", height: '40px' }} >
              <Select
                value={this.state.defaultUse}
                onChange={e => this.setState({ defaultUse: e.target.value })}
                variant="outlined"
                style={{ width: "100%", height: '28px' }}
              >
                <MenuItem value="use">사용</MenuItem>
                <MenuItem value="unused">미사용</MenuItem>
              </Select>
            </Grid>
            <Grid item xs style={{ flexGrow: 1 }} />
            <Grid
              item xs={1.8} style={{ display: "flex", flexDirection: "row", alignItems: "center", height: '40px' }} >
              {/* <Grid container justify="flex-end">
             <IconButton color="black" size="small" onClick={this.handleSearchClick} sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px' }}>
                  <SearchIcon />
              </IconButton>
              <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 1, width: '30px', height: '30px' }}>
                  <ExpandMoreIcon />
              </IconButton>
            </Grid> */}
              <button>전송</button>
            </Grid>
          </Grid>
          <hr />
        </div>
        {/* <div style={{ display: "flex", float: "left" }}>
          <div style={{ flex:0.7, marginRight:30}}> */}
        <div style={{ display: "flex", float: "left" }}>
          <div style={{ flex: 0.7 }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* 카드리스트 > */}
              <div
                class="cardlist-container"
                style={{
                  maxWidth: "280px",
                  marginLeft: "5px",
                  marginTop: "1px",
                  marginRight: "5px",
                  borderTop: "2px solid black",
                }}
              >
                <div>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card
                      style={{
                        backgroundColor: "#ECECEC",
                        marginBottom: "5px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="caption">
                          회사: Count(*)개

                        </Typography>
                      </CardContent>
                    </Card>
                    <Box sx={{ overflowY: "auto", maxHeight: "600px" }}>
                      {/* 스크롤바 영역 설정 */}
                      <Grid container spacing={2} >
                        {this.props.companyCards.map((sco, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            key={index}
                          ><Button onClick={(e) => {
                            this.props.handleCardClick(sco);
                          }} // 카드 클릭 시 이벤트 처리
                            sx={{
                              padding: 0, // 기본 패딩 제거
                              display: 'block', // 버튼은 블록 요소로 표시되도록 설정
                              textAlign: 'left', // 좌측 정렬
                              width: '100%', // 버튼을 100% 너비로 설정하여 전체 영역에 클릭 영역을 만듦
                            }}>
                              <Card
                                sx={{
                                  borderRadius: "5px",
                                  border: "0.5px solid lightgrey",
                                  marginRight: "2px",
                                  display: "flex",
                                }}
                              >
                                <CardContent
                                  sx={{
                                    paddingLeft: "5px",
                                    paddingRight: "100px", //오른쪽으로가게끔
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      width: "90px",
                                      maxWidth: "90px",
                                    }}
                                  >
                                    {sco.co_cd} {/* 부서코드 */}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      width: "90px",
                                      maxWidth: "90px",
                                    }}
                                  >
                                    {sco.co_nm} {/* 부서명 */}
                                  </Typography>
                                  <div> </div>
                                </CardContent>
                                <CardContent
                                  style={{
                                    marginRight: "10px",
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                  }}
                                >
                                  {sco.ceo_nm}
                                  <Typography
                                    variant="body2"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      width: "90px",
                                      maxWidth: "90px",
                                    }}
                                  >
                                    {sco.co_nk} {/* 부서 닉네임 */}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ backgroundColor: "#FFFFFF", color: "#7A7A7A" }}
                    >
                      추가
                    </Button>
                  </Grid>
                </div>
              </div>
            </Grid>
          </div>
          <div style={{ flex: 2.5, marginRight: "15px" }}>
            <div>
              <div
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  height: '23px',
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ height: '3px', marginTop: '5px' }}>기본정보</p>
                <div>
                  <button onClick={this.props.handleSaveButton}>저장</button>
                  <button onClick={this.props.handleDeleteButton}>삭제</button>
                  <button onClick={this.handleErpActivation}>erp연동활성화</button>
                </div>
              </div>
              <hr style={{ height: '3px', color: 'black' }} />
            </div>
            <div>
              <Box sx={{ overflowY: "auto", maxHeight: "1000px" }}>
                <Grid container>
                  {/* 1번째 */}

                  <Grid container >
                    <GridItem1 item xs={2}>
                      <FieldName variant="body1">회사코드</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_cd" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_cd : this.props.co_cd} variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1" >사용여부</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >

                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="use"
                          value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].use_yn : this.props.use_yn}
                          name="use_yn"
                          onChange={this.props.onInputChange}
                        >
                          <FormControlLabel value="Y" control={<Radio />} label="사용" />
                          <FormControlLabel value="N" control={<Radio />} label="미사용" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>

                  {/* 2번째 */}
                  <Grid container>
                    <GridItem1 item xs={2}>
                      <FieldName variant="subtitle1">회사명</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={10} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_nm" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_nm : this.props.co_nm}
                        sx={{ width: '60%', ml: 1, mt: 1, mb: 1, padding: "-5px", backgroundColor: '#FFF0F5' }}
                        variant="outlined" />
                      <button style={{ height: '35px', marginTop: '2px' }}>▼</button>
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 3번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">회사약칭</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_nk" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_nk : this.props.co_nk}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1" >기본언어</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <Select
                        name="lng"

                        onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].lng : this.props.lng}
                        variant="outlined"
                        style={{ width: "100%", height: "33px", marginLeft: "10px" }}
                      >
                        <MenuItem value="kor">한국어</MenuItem>
                        <MenuItem value="eng">영어</MenuItem>
                        <MenuItem value="jpn">일본어</MenuItem>
                      </Select>
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 4번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">행정표준코드</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={8.3} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="adm_cd" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adm_cd : this.props.adm_cd}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={1.7} style={{ display: "flex", flexDirection: "row", alignItems: "right" }} >
                      <button style={{ height: '31px', width: "130px", marginTop: '5px' }}>타회사 코드참조</button>
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 5번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">업태</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="bz_type"
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].bz_type : this.props.bz_type}
                        onChange={this.props.onInputChange} variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2}  >
                      <FieldName variant="subtitle1">종목</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="bz_item"
                        onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].bz_item : this.props.bz_item}
                        variant="outlined" />
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>

                  {/* 6번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">대표전화</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_tel" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_tel : this.props.co_tel}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={3} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_tel2" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_tel2 : this.props.co_tel2}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">대표팩스</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_fax" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_fax : this.props.co_fax}
                        variant="outlined" />
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 7번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">사업자번호</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="reg_nb" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].reg_nb : this.props.reg_nb}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">법인번호</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <Select
                        name="cp_ct"
                        onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].cp_ct : this.props.cp_ct}
                        variant="outlined"
                        style={{ width: "100%", height: "33px", marginLeft: "10px" }}
                      >
                        <MenuItem value="personal">개인</MenuItem>
                        <MenuItem value="company">법인</MenuItem>
                        <MenuItem value="etc">기타</MenuItem>
                      </Select>
                    </Grid>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="cp_no" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].cp_no : this.props.cp_no}
                        variant="outlined" />
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 8번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">설립일</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={3.83} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "12px" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: "100%" }}>
                        <DatePicker name="est_dt"
                          onChange={(date) => this.props.onInputChange({ target: { name: 'est_dt', value: date } })} variant="outlined"
                          InputProps={{ style: { height: 30, padding: '0 10px' } }}

                          style={{ width: "100%" }}
                          slotProps={{ textField: { size: 'small' } }} />
                      </LocalizationProvider>
                    </Grid>
                    <GridItem3 item xs={2} style={{ marginRight: "5px" }} >
                      <FieldName variant="subtitle1">개/폐업일</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={1.85} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "8px" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style>
                        <div style={{ padding: "5px 0" }}>
                          <DatePicker
                            name="opn_dt"

                            onChange={(date) => this.props.onInputChange({ target: { name: 'opn_dt', value: date } })}
                            variant="outlined"
                            InputProps={{ style: { height: 30, padding: '0 10px' } }}
                            style={{ width: "100%" }}
                            slotProps={{ textField: { size: 'small' } }} />
                        </div>
                      </LocalizationProvider>
                    </Grid>
                    <Grid
                      item xs={1.85} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style>
                        <DatePicker name="cls_dt" onChange={(date) => this.props.onInputChange({ target: { name: 'cls_dt', value: date } })} variant="outlined"
                          InputProps={{ style: { height: 30, padding: '0 10px' } }}
                          style={{ width: "100%" }}
                          slotProps={{ textField: { size: 'small' } }} />
                      </LocalizationProvider>

                    </Grid>

                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 9번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">대표자명</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="ceo_nm" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].ceo_nm : this.props.ceo_nm}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">주민등록번호</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="res_nb" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].res_nb : this.props.res_nb}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField variant="outlined" />
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 10번째 */}
                  <Grid container >
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">기본도메인</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={7} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      @<MyTextField name="domain" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].domain : this.props.domain}
                        variant="outlined" />
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>

                  {/* 10번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">회사주소</FieldName>
                    </GridItem1>
                    <Grid item xs={6} container >
                      <Grid item xs={12} container>
                        <Grid
                          item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                          <MyTextField name="adr_zp" onChange={this.props.onInputChange}
                            value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adr_zp : this.props.postcode}

                            variant="outlined" />
                        </Grid>
                        <Postcode style={{ marginLeft: "10px", height: '40px', marginTop: '5px' }} onComplete={this.props.onComplete} />

                      </Grid>
                      <Grid item xs={12} container>
                        <Grid
                          item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                          <MyTextField name="adr_inp" onChange={this.props.onInputChange}
                            value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adr_inp : this.props.jibunAddress || this.props.roadAddress}
                          />

                        </Grid>
                        <Grid
                          item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                          <MyTextField name="adr_etc" onChange={this.props.onInputChange}
                            value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adr_etc : this.props.adr_etc}
                            variant="outlined" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 12번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">회계기수</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="ac_per" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].ac_per : this.props.ac_per}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <Typography variant="subtitle1">기</Typography>
                    </Grid>
                    <Grid
                      item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="ac_dt" onChange={(date) => this.props.onInputChange({ target: { name: 'ac_dt', value: date } })} slotProps={{ textField: { size: 'small' } }} />
                      </LocalizationProvider>
                    </Grid>
                    <button style={{ marginLeft: "5px", marginTop: "3.5px", height: "35px" }}>회계기수 등록</button>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 13번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">회사계정유형</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={10} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="acc_tp" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].acc_tp : this.props.acc_tp}
                        variant="outlined" label="일반" />
                    </Grid>
                    <Divider sx={{ width: '65vw' }} />
                  </Grid>
                  {/* 14번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">홈페이지주소</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="url" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].url : this.props.url}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">정렬</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="sort" onChange={this.props.onInputChange}
                        value={this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].sort : this.props.sort}
                        variant="outlined" />
                    </Grid>
                  </Grid>

                </Grid>
              </Box>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ height: '3px' }}>인감정보</p>

                </div>
                <hr style={{ height: '3px', color: 'black' }} />
              </div>
            </div>
          </div>

        </div>
      </form>
    );
  }
}

export default Acc1013; 
