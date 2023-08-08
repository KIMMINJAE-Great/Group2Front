import React from "react";
import { get, post } from "../../components/api_url/API_URL";
import { styled, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Postcode from "../../components/commons/Postcode";
import dayjs from "dayjs";

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
  
  


  render() {

    console.log("readonlY:"+this.props.readonly);
    const { selectedCompanyCards , selectedRead} = this.props;
    var readonly = selectedRead === "N"; 
    console.log("자식 콘솔 :co_cd:"+this.props.co_cd);
    
    


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
                      <MyTextField onChange={(e) => this.props.handleCoCdChange(e.target.value)}
                        value={selectedCompanyCards?.co_cd || ""}
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
                          onChange={(e) => this.props.handleUseYnChange(e.target.value)}
                          value={selectedCompanyCards?.use_yn || ""}
                          
                          
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
                      <MyTextField  onChange={(e) => this.props.handleCoNmChange(e.target.value)}
                        value={selectedCompanyCards?.co_nm || ""}
                        sx={{ width: '60%', ml: 1, mt: 0, mb: 0, padding: "-15px", }}
                        variant="outlined" 
                        inputProps={{ readOnly: this.props.readonly, style: { backgroundColor: '#FFF0F5' } }}/>
                      
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
                      <MyTextField name="co_nk" onChange={(e) => this.props.handleCoNkChange(e.target.value)}
                        value={selectedCompanyCards?.co_nk || ""}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1" >기본언어</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <Select                     
                        onChange={(e) => this.props.handleLngChange(e.target.value)}
                        value={selectedCompanyCards?.lng || ""}
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
                      <MyTextField 
                        onChange={(e) => this.props.handleAdmCdChange(e.target.value)}
                        value={selectedCompanyCards?.adm_cd || ""}
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
                      <MyTextField
                        value={selectedCompanyCards?.bz_type || ""}
                        onChange={(e) => this.props.handleBzTypeChange(e.target.value)} variant="outlined"
                        inputProps={{style: { backgroundColor: '#FFF0F5' } }} />
                    </Grid>
                    <GridItem3 item xs={2}  >
                      <FieldName variant="subtitle1">종목</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField
                        onChange={(e) => this.props.handleBzItemChange(e.target.value)}
                        value={selectedCompanyCards?.bz_item || ""}
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
                      <MyTextField onChange={(e) => this.props.handleCoTelChange(e.target.value)}
                        value={selectedCompanyCards?.co_tel || ""}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={3} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField onChange={(e) => this.props.handleCoTel2Change(e.target.value)}
                        value={selectedCompanyCards?.co_tel2 || ""}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">대표팩스</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField name="co_fax" onChange={(e) => this.props.handleCoFaxChange(e.target.value)}
                        value={selectedCompanyCards?.co_fax || ""}
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
                      <MyTextField onChange={(e) => this.props.handleRegNbChange(e.target.value)}
                        value={selectedCompanyCards?.reg_nb || ""}
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
                        onChange={(e) => this.props.handleCpCtChange(e.target.value)}
                        value={selectedCompanyCards?.cp_ct || ""}
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
                      <MyTextField name="cp_no" onChange={(e) => this.props.handleCpNoChange(e.target.value)}
                        value={selectedCompanyCards?.cp_no || ""}
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
                      item xs={3.9} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "12px" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: "100%" }}>
                        <DatePicker 
                          variant="outlined"
                          InputProps={{ style: { height: 30, padding: '0 10px' } }}
                          value={dayjs(selectedCompanyCards.est_dt ? selectedCompanyCards.est_dt: '')}
                          name="est_dt"
                          onChange={(value) => {this.props.handleEstDtChange(value); }}
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
                            value={dayjs(selectedCompanyCards?.opn_dt ? selectedCompanyCards?.opn_dt: '')}
                            name="opn_dt"
                            onChange={(value) => {this.props.handleOpnDtChange(value); }}
                            
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
                        <DatePicker 
                          value={dayjs(selectedCompanyCards?.cls_dt ? selectedCompanyCards?.cls_dt: '')}
                          name="cls_dt"
                          onChange={(value) => {this.props.handleClsDtChange(value); }}
                          
                          variant="outlined"
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
                      <MyTextField onChange={(e) => this.props.handleCeoNmChange(e.target.value)}
                        value={selectedCompanyCards?.ceo_nm || ""}
                        variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                      <FieldName variant="subtitle1">주민등록번호</FieldName>
                    </GridItem3>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField onChange={(e) => this.props.handleResNbChange(e.target.value)}
                        value={selectedCompanyCards?.res_nb || ""}
                        variant="outlined" />
                    </Grid>
                    <Grid
                      item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                      <MyTextField onChange={(e) => this.props.handleResNb2Change(e.target.value)}
                        value={selectedCompanyCards?.res_nb2 || ""}
                        variant="outlined" />
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
                          value={this.props.adr_zp || this.props.postcode || (this.props.companyCardData && this.props.companyCardData.length > 0 ? this.props.companyCardData[0].adr_zp :'')}

                          variant="outlined" />
                      </Grid>
                      <Grid xs={0} variant="outlined" style={{marginLeft:'15px' , marginTop:'5px', }}>
                        <Postcode onComplete={this.props.onComplete} />
                      </Grid>
                      

                    </Grid>
                    <Grid item xs={12} container>
                      <Grid
                        item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                        <MyTextField onChange={(e) => this.props.handleAdrInpChange(e.target.value)}
                          value={selectedCompanyCards?.adr_inp || ""}
                        />

                      </Grid>
                      <Grid
                        item xs={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "6px" }} >
                        <MyTextField onChange={(e) => this.props.handleAdrEtcChange(e.target.value)}
                          value={selectedCompanyCards?.adr_etc || ""}
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
                    <MyTextField onChange={(e) => this.props.handleAcPerChange(e.target.value)}
                      value={selectedCompanyCards?.ac_per || ""}
                      variant="outlined" />
                  </Grid>
                  <Grid
                    item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                    <Typography variant="subtitle1">기</Typography>
                  </Grid>
                  <Grid
                    item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker                     
                      value={dayjs(selectedCompanyCards?.ac_dt ? selectedCompanyCards?.ac_dt: '')}
                      name="ac_dt"
                      onChange={(value) => {this.props.handleAcDtChange(value); }}
                      slotProps={{ textField: { size: 'small' } }} />
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
                    <MyTextField name="acc_type" onChange={(e) => this.props.handleAccTypeChange(e.target.value)}
                      value={selectedCompanyCards?.acc_type || ""}
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
                <p style={{ height: '3px' }}></p>

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
