import { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,

} from "@mui/material";
import profile from "../../images/profile.png";
import SearchIcon from "@mui/icons-material/Search";
import { Box, height } from "@mui/system";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import acc1010 from "./acc1010.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import Postcode from "../../components/commons/Postcode";
class Acc1010Basic extends Component {
  state = {
    mobileError: false,

  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCard !== this.props.selectedCard) {
      this.setState({ mobileError: false });
    }
  }


  validateMobile = (phoneNumber) => {
    const regex = /^\d{3}-\d{3,4}-\d{4}$/;
    return regex.test(phoneNumber);
  }

  handleMobileChange = (e) => {
    const value = e.target.value;
    this.props.handleEmpMobileChange(value);
  }

  handleMobileBlur = (e) => {
    const value = e.target.value;
    const isValidMobile = this.validateMobile(value);
    this.setState({ mobileError: !isValidMobile });
  }

  render() {
    const { selectedCard, errorMessage } = this.props;
    const { mobileError } = this.state;

    var readonly = selectedCard.newEmp === 'N';
    // { selectedCard } = this.props;
    //const email = selectedCard.emp_email ? selectedCard.emp_email.split('@') : ['', ''];
    //const semail = selectedCard.emp_semail ? selectedCard.emp_semail.split('@') : ['', ''];
    //const lang = selectedCard.emp_lang ? selectedCard.emp_lang : ''; //안나와서 극약처방

    return (


      <div className="" style={{}}>
        {/* Form Container < */}


        {/* submenu > */}

        {/* input container < */}
        <div className="acc1010-input-container" >
          <Grid
            container
            spacing={0.4}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* 사진*/}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', borderTop: '3px solid black' }}>
              <Grid item xs={1.1} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>사진</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
                <img src={profile} style={{ width: '100px', height: '100px', marginTop: '10px', borderRadius: '3px' }}></img>
              </Grid>
            </Grid>

            {/* 이름 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>이름</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
                <TextField


                  value={selectedCard.emp_nm ? selectedCard.emp_nm : ''}
                  sx={{ backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  fullWidth
                  required
                  variant="outlined"
                  size="small"
                  //={selectedCard.emp_nm ? selectedCard.emp_nm : ''}
                  onChange={(e) => this.props.handleEmpNmChange(e.target.value)}
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                />
              </Grid>
            </Grid>
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>사원번호</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
                <TextField
                  placeholder="미입력시 회사코드를 기준으로 자동 채번됩니다."
                  name="emp_cd"
                  value={selectedCard.emp_cd ? selectedCard.emp_cd : ''}
                  sx={{ backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  //={selectedCard.emp_nm ? selectedCard.emp_nm : ''}
                  onChange={(e) => this.props.handleEmpEmpCdChange(e.target.value)}
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                />
              </Grid>
            </Grid>
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>회사코드</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  placeholder="ex) 1000, 2000, 3000 ...."
                  name="co_cd"
                  sx={{ backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpCoCdChange(e.target.value)}
                  value={selectedCard.co_cd ? selectedCard.co_cd : ''}
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서코드</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="dept_cd"
                  required
                  sx={{ backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  value={selectedCard.dept_cd ? selectedCard.dept_cd : ''}
                  size="small"
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                  onChange={(e) => this.props.handleEmpDeptChange(e.target.value)}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
            </Grid>


            {/* 로그인 ID, 메일 ID */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>로그인 ID</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_id"
                  required
                  // helperText={errorMessage == '' ? '' : errorMessage}
                  sx={{ backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpIdChange(e.target.value)}
                  value={selectedCard.emp_id ? selectedCard.emp_id : ''}
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>메일 ID</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  //sx={{ backgroundColor: '#F2F2F2' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
            </Grid>

            {/* 로그인 비밀번호, 결재 비밀번호 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>로그인 비밀번호</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  required
                  name="password"
                  sx={{ backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={selectedCard.password ? selectedCard.password : ''}
                  onChange={(e) => this.props.handleEmpPwChange(e.target.value)}
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>결재 비밀번호</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  //required
                  name="app_password"
                  sx={{ backgroundColor: '' }}
                  fullWidth
                  variant="outlined"
                  value={selectedCard.app_password ? selectedCard.app_password : ''}
                  size="small"
                  onChange={(e) => this.props.handleEmpAppPwChange(e.target.value)}
                  inputProps={{ style: { height: "12px" }, readOnly: readonly }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
            </Grid>

            {/* 성별, 사용언어 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right", position: 'relative', top: '6px' }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>성별</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} >
                <Box display="flex" alignItems="center" > {/* 추가된 부분 */}
                  <RadioGroup
                    name="gender"
                    sx={{ backgroundColor: 'white', paddingLeft: '5px', width: "100%" }}
                    row
                    value={selectedCard.gender === 'M' ? 'M' : 'F'}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    onChange={(e) => this.props.handleEmpGenderChange(e.target.value)}
                  >
                    <FormControlLabel value="F" control={<Radio />} label="여성" />
                    <FormControlLabel value="M" control={<Radio />} label="남성" />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px", lineHeight: '30px' }}>사용언어</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
                <Box display="flex" alignItems="center" >
                  <Select
                    name="emp_lang"
                    value={selectedCard.emp_lang || ''}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    required
                    onChange={(e) => this.props.handleEmpLangChange(e.target.value)}
                    sx={{ width: '100%', height: '30px', marginTop: '5px', backgroundColor: readonly ? 'white' : '#FEF4F4' }}
                  >
                    <MenuItem value={'KOR'}>한국어</MenuItem>
                    <MenuItem value={'ENG'}>English</MenuItem>
                    <MenuItem value={'JPN'}>日本語</MenuItem>
                    <MenuItem value={'CHI'}>中文</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
            {/* 개인메일 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>개인메일</h5>
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_email1"
                  value={selectedCard.emp_email1 ? selectedCard.emp_email1 : ''}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpEmail1Change(e.target.value)}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
              &nbsp; <p style={{ lineHeight: '0px' }}>@</p>
              <Grid item xs={2} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_email2"
                  value={selectedCard.emp_email2 ? selectedCard.emp_email2 : ''}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpEmail2Change(e.target.value)}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>

              <Grid item xs sx={{ backgroundColor: 'white', paddingLeft: '5px', flexGrow: 1 }}>
                <Box display="flex" alignItems="center" >


                  <Select
                    value="선택"
                    name="emp_email2"
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    //value={age}
                    onChange={(e) => this.props.handleEmpEmail2Change(e.target.value)}
                    sx={{ width: '100%', height: '30px', }}

                  >
                    <MenuItem value="" disabled>선택</MenuItem>
                    <MenuItem value={``} >직접입력</MenuItem>
                    <MenuItem value={`naver.com`}>naver.com</MenuItem>
                    <MenuItem value={`gmail.com`}>gmail.com</MenuItem>
                    <MenuItem value={`hanmail.com`}>hanmail.com</MenuItem>
                    <MenuItem value={`yahoo.com`}>yahoo.com</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>


            {/* 급여메일 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>급여메일</h5>
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_semail1"
                  value={selectedCard.emp_semail1 ? selectedCard.emp_semail1 : ''}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpSEmail1Change(e.target.value)}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
              &nbsp; <p style={{ lineHeight: '0px' }}>@</p>
              <Grid item xs={2} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_semail2"
                  value={selectedCard.emp_semail2 ? selectedCard.emp_semail2 : ''}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpSEmail2Change(e.target.value)}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>

              <Grid item xs sx={{ backgroundColor: 'white', paddingLeft: '5px', flexGrow: 1 }}>
                <Box display="flex" alignItems="center" >
                  <Select
                    value="{email}"
                    name="emp_semail2"
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={(e) => this.props.handleEmpSEmail2Change(e.target.value)}
                    sx={{ width: '100%', height: '30px', }}

                  >
                    <MenuItem value="" disabled>선택</MenuItem>
                    <MenuItem value={``} >직접입력</MenuItem>
                    <MenuItem value={`naver.com`}>naver.com</MenuItem>
                    <MenuItem value={`gmail.com`}>gmail.com</MenuItem>
                    <MenuItem value={`hanmail.com`}>hanmail.com</MenuItem>
                    <MenuItem value={`yahoo.com`}>yahoo.com</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>


            {/* 휴대전화 , 전화번호 집*/}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>

              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>휴대전화</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_mobile"
                  value={selectedCard.emp_mobile ? selectedCard.emp_mobile : ''}
                  fullWidth
                  onChange={this.handleMobileChange}
                  onBlur={this.handleMobileBlur}
                  variant="outlined"
                  size="small"
                  error={mobileError}
                  helperText={mobileError ? "올바른 휴대전화 형식을 입력하세요" : ""}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>전화번호(집)</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_hphone"
                  value={selectedCard.emp_hphone ? selectedCard.emp_hphone : ''}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpHPhoneChange(e.target.value)}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
            </Grid>


            {/* 주소 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray' }}>

              <Grid container item xs={12}>
                <Grid item xs={1.1} style={{ textAlign: "right", position: 'relative', top: '20px' }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>주소</h5>
                  </Typography>
                </Grid>
                {/* 우편번호 */}
                <Grid item xs={1.2} sx={{ backgroundColor: 'white', paddingLeft: '5px', }}>
                  <TextField
                    name="emp_post"
                    value={selectedCard.emp_post ? selectedCard.emp_post : ''}
                    //onChange={(e) => this.props.empPostChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"

                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>

                <Grid item xs={1} sx={{ backgroundColor: 'white', paddingLeft: '5px', }}>
                  <Postcode onComplete={this.props.handlePostComplete} />

                </Grid>
                <Grid container>
                  <Grid item xs={1.1} style={{ textAlign: "right" }}>

                  </Grid>
                  {/* 주소 */}
                  <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px', marginBottom: '5px' }}>
                    <TextField
                      name="emp_add"
                      value={selectedCard.emp_add ? selectedCard.emp_add : ''}
                      // onChange={(e) => this.props.empAddChange(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: "12px" } }}
                      InputLabelProps={{ style: { fontSize: "12px" } }}
                    />

                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            {/* 최초입사일, 퇴사일 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right", position: 'relative', top: '5px' }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>최초 입사일</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: "50px" }}>
                  <DatePicker variant="outlined" slotProps={{ textField: { size: 'small' } }}
                    value={dayjs(selectedCard.emp_hrd ? selectedCard.emp_hrd : '')}
                    name="emp_hrd"
                    onChange={(value) => {
                      // dayjs 객체를 ISO 형식의 문자열로 변환
                      const isoValue = value ? dayjs(value).format('YYYY-MM-DD') : '';
                      this.props.handleEmpHrdChange(isoValue);
                    }} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={1.1} style={{ textAlign: "right", position: 'relative', top: '5px' }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>퇴사일</h5>
                </Typography>
              </Grid>
              <Grid item xs={4.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  name="emp_resi"
                  value={selectedCard.emp_resi}
                  sx={{ backgroundColor: '#F2F2F2', position: 'relative' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.props.handleEmpResiChange(e.target.value)}
                  inputProps={{ style: { height: "20px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>
            </Grid>



            {/* 마지막 Grid */}
          </Grid>

        </div>
        {/* input container < */}
      </div>
    )
  }

}

export default withRouter(Acc1010Basic);