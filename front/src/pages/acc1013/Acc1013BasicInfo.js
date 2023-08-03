import React from "react";
import { get, post } from "../../components/api_url/API_URL";
import { styled, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Postcode from "../../components/commons/Postcode";

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
    borderRadius: 0, // 모서리를 완전히 직사각형으로    
  },
}));

const FieldName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px'
}));

class Acc1013BasicInfo extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     companyCards: [],
  //     companyCardData: [],
  //     cp_ct: '',
  //     value:'', 
      
  //   };
  // }
  componentDidUpdate(prevProps) {
    // companyCardData가 업데이트 될 때 co_cd도 업데이트
    if (this.props.companyCardData !== prevProps.companyCardData) {
      if (this.props.companyCardData && this.props.companyCardData.length > 0) {
        this.props.onCoCdChange(this.props.companyCardData[0].co_cd);
      }
    }
  }


  render() {

    console.log("자식 콘솔 :co_cd:"+this.props.co_cd);
    console.log("자식 콘솔 :adm_cd:"+this.props.adm_cd);
    console.log("readonly:"+this.props.readonly);
    


    return (
      
      <div>
       

      <div style={{ display: "flex", float: "left"}}>
          
        <div style={{ flex: 1.5, marginRight: "15px" }}>
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
                
                {/* <button onClick={this.props.handleDeleteButton}>삭제</button> */}
                
                
              </div>
            </div>
            <hr style={{ height: '3px', color: 'black' }} />
          </div>
          <div>
            <Box sx={{ overflowY: "auto", maxHeight: "650px" }}>              
              <Grid container>

                {/* 1번째 */}
                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  <Grid container >
                    <GridItem1 item xs={2}>
                      <FieldName variant="body1">회사코드</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_cd" onChange={this.props.onInputChange}
                        value={this.props.co_cd || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_cd : '')}
                        variant="outlined"  
                        inputProps={{ readOnly: this.props.readonly }}
                        />
                        
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
                          onChange={this.props.onInputChange}
                          value={this.props.use_yn || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].use_yn : '')}
                          name="use_yn"
                          
                        >
                          <FormControlLabel value="Y" control={<Radio />} label="사용" />
                          <FormControlLabel value="N" control={<Radio />} label="미사용" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  
                  </Grid>
                </Grid>


                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 2번째 */}
                  <Grid container>
                    <GridItem1 item xs={2}>
                      <FieldName variant="subtitle1">회사명</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={10} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_nm" onChange={this.props.onInputChange}
                        value={this.props.co_nm || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_nm : '')}
                        sx={{ width: '60%', ml: 1, mt: 0, mb: 0, padding: "-15px", }}
                        variant="outlined" 
                        inputProps={{ readOnly: this.props.readonly, style: { backgroundColor: '#FFF0F5' } }}/>
                      <button style={{ height: '35px', marginTop: '2px' }}>▼</button>
                    </Grid>
                  </Grid>
                </Grid>


                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 3번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">회사약칭</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_nk" onChange={this.props.onInputChange}
                        value={this.props.co_nk || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_nk : '')}
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
          
                  </Grid>
                </Grid>


                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 4번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">행정표준코드</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={8.3} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="adm_cd" 
                        onChange={this.props.onInputChange}
                        value={this.props.adm_cd || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adm_cd : '')}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={1.7} style={{ display: "flex", flexDirection: "row", alignItems: "right" }} >
                      <button style={{ height: '31px', width: "130px", marginTop: '5px' }}>타회사 코드참조</button>
                    </Grid>
      
                  </Grid>
                </Grid>

                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 5번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">업태</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="bz_type"
                        value={this.props.bz_type || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].bz_type :'')}
                        onChange={this.props.onInputChange} variant="outlined"
                        inputProps={{style: { backgroundColor: '#FFF0F5' } }} />
                    </Grid>
                    <GridItem3 item xs={2}  >
                      <FieldName variant="subtitle1">종목</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="bz_item"
                        onChange={this.props.onInputChange}
                        value={this.props.bz_item || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].bz_item :'')}
                        inputProps={{ style: { backgroundColor: '#FFF0F5' } }}
                        variant="outlined" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 6번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">대표전화</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_tel" onChange={this.props.onInputChange}
                        value={this.props.co_tel || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_tel :'')}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={3} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_tel2" onChange={this.props.onInputChange}
                        value={this.props.co_tel2 || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_tel2 :'')}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">대표팩스</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_fax" onChange={this.props.onInputChange}
                        value={this.props.co_fax || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].co_fax :'')}
                        variant="outlined" />
                    </Grid>
                  </Grid>                  
                </Grid>


                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 7번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">사업자번호</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="reg_nb" onChange={this.props.onInputChange}
                        value={this.props.reg_nb || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].reg_nb :'')}
                        inputProps={{style: { backgroundColor: '#FFF0F5' } }}
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
                        value={this.props.cp_ct || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].cp_ct :'')}
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
                        value={this.props.cp_no || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].cp_no :'')}
                        variant="outlined" />
                    </Grid>
                  
                  </Grid>
                </Grid>


                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
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

                    
                  </Grid>
                </Grid>


                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                  {/* 9번째 */}
                  <Grid container>
                    <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <FieldName variant="subtitle1">대표자명</FieldName>
                    </GridItem1>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="ceo_nm" onChange={this.props.onInputChange}
                        value={this.props.reg_nm || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].reg_nb :'')}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">주민등록번호</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="res_nb" onChange={this.props.onInputChange}
                        value={this.props.reg_nb || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].reg_nb :'')}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField variant="outlined" />
                    </Grid>
                  

                  </Grid>
                </Grid>


                

                <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
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
                          value={this.props.reg_nb || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].reg_nb :'')}

                          variant="outlined" />
                      </Grid>
                      <Postcode onComplete={this.props.onComplete} />

                    </Grid>
                    <Grid item xs={12} container>
                      <Grid
                        item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                        <MyTextField name="adr_inp" onChange={this.props.onInputChange}
                          value={this.props.reg_nb || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].reg_nb :'')}
                        />

                      </Grid>
                      <Grid
                        item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                        <MyTextField name="adr_etc" onChange={this.props.onInputChange}
                          value={this.props.adr_etc || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adr_etc :'')}
                          variant="outlined" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                {/* 12번째 */}
                <Grid container>
                  <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                    <FieldName variant="subtitle1">회계기수</FieldName>
                  </GridItem1>
                  <Grid
                    item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                    <MyTextField name="ac_per" onChange={this.props.onInputChange}
                      value={this.props.ac_per || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].ac_per :'')}
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
                </Grid>
              </Grid>

              <Grid container  item xs={12} sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}>
                {/* 13번째 */}
                <Grid container>
                  <GridItem1 item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                    <FieldName variant="subtitle1">회사계정유형</FieldName>
                  </GridItem1>
                  <Grid
                    item xs={10} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                    <MyTextField name="acc_tp" onChange={this.props.onInputChange}
                      value={this.props.acc_tp || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].acc_tp :'')}
                      variant="outlined" label="일반" />
                  </Grid>                  
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
    </div>
        
      
    );
  }
}

export default Acc1013BasicInfo; 
