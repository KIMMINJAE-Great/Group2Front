import React, { Component } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Postcode from "../../components/commons/Postcode";
import "./acd1010.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { style } from "@mui/system";

class Acd1010Presentation extends Component {
  render() {
    const { selectedregcar,selectedRead } = this.props;
    var readonly = selectedRead === "N";

    return (
      <div style={{ width: "100%", marginRight: "40px", marginLeft: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>ㆍ상세정보</p>
          <span style={{ fontWeight: "bold", color: "red" }}>
            {" "}
            {this.props.complete}
          </span>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginRight: "8px",
                height: "30px",
                backgroundColor: "#FBFBFB",
                color: "black",
              }}
              // onClick={this.handleSaveClick} // "저장" 버튼 클릭 시 handleSaveClick 함수 호출
            >
              저장
            </Button>

            
          </div>
        </div>
        <div className="acd1010-input-container">
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            sx={{
              borderBottom: "1px solid lightgray",
              borderTop: "3px solid black",
            }}
          >
            {/* 1째줄 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "15px" }}
            >
              {/* 차량 코드 */}
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>차량코드</h5>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedregcar?.car_cd ||""}
                  onChange={(e) => this.props.handleCarCdChange(e.target.value)}
                  required
                />
              </Grid>

              {/* 차량 번호 */}
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>차량번호</h5>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: readonly ? 'white' : '#FEF4F4' }}
                  
                  inputProps={{ style: { height: "15px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedregcar?.car_nb ||""}
                    onChange={(e) =>
                  this.props.handleCarNbChange(e.target.value)
                    }
                  required
                />
              </Grid>
            </Grid>

            {/* 2째줄 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "15px" }}
            >
              {/* 차량 명 */}
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>차량명</h5>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: readonly ? 'white' : '#FEF4F4' }}
                
                  inputProps={{ style: { height: "15px" }}}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedregcar?.car_nm ||""}
                  onChange={(e) => this.props.handleCarNmChange(e.target.value)}
                  required
                />
              </Grid>

               {/* 사원번호 */}
               <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>사원번호</h5>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: readonly ? 'white' : '#FEF4F4' }}
                
                  inputProps={{ style: { height: "15px" }}}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedregcar?.emp_cd ||""}
                  onChange={(e) => this.props.handleEmpCdChange(e.target.value)}
                  required
                />
              </Grid>

            </Grid>

            {/* 3째줄 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "15px" }}
            >
              {/* 취득 일자 */}
              <Grid
                item
                xs={1}
                style={{ textAlign: "right", position: "relative", top: "5px" }}
              >
                <Typography>
                  <h5 style={{ margin: "5px" }}>취득일자</h5>
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ paddingLeft: "5px" }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ width: "50px" }}
                >
                  <DatePicker
                    variant="outlined"
                    slotProps={{ textField: { size: "small" } }}
                    value={dayjs(selectedregcar.get_dt ? selectedregcar.get_dt: '')}
                    name="get_dt"
                    onChange={(value) => {this.props.handleGetDtChange(value); }} 
                  
                  />
                </LocalizationProvider>
              </Grid>

              {/* 처분 일자 */}
              <Grid
                item
                xs={1}
                style={{ textAlign: "right", position: "relative", top: "5px" }}
              >
                <Typography>
                  <h5 style={{ margin: "5px" }}>처분일자</h5>
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ paddingLeft: "5px" }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ width: "50px" }}
                >
                  <DatePicker
                    variant="outlined"
                    slotProps={{ textField: { size: "small" } }}
                    value={dayjs(selectedregcar.disposal_dt ? selectedregcar.disposal_dt: '')}

                    name="disposal_dt"
                    
                    onChange={(value) => {this.props.handleDisposalDtChange(value); }} 
                    
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* 4째줄 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "15px" }}
            >
              {/* 임차 구분 */}
              <Grid
                item
                xs={1}
                style={{ textAlign: "right", position: "relative", top: "5px" }}
              >
                <Typography>
                  <h5 style={{ margin: "5px" }}>임차구분</h5>
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ paddingLeft: "5px" }}>
                <Select
                  size="small"
                  style={{ width: "53%" }}
                  sx={{ width: "100%", backgroundColor: readonly ? 'white' : '#FEF4F4' }}
                  label="부서"
                  required
                  value={selectedregcar?.lease_yn ||""}
                  inputProps={{ style: { height: "15px" } }}
                  onChange={(e) =>
                    this.props.handleLeaseynChange(e.target.value)
                  }
                  
                >
                  <MenuItem value="1">1. 자가</MenuItem>
                  <MenuItem value="2">2. 렌트</MenuItem>
                  <MenuItem value="3">3. 리스</MenuItem>
                </Select>
              </Grid>

              {/* 임차기간 */}
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>임차기간</h5>
                </Typography>
              </Grid>
              <Grid item xs={2} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    variant="outlined"
                    slotProps={{ textField: { size: "small" } }}
                    value={dayjs(selectedregcar.lfr_dt ? selectedregcar.lfr_dt: '')}
                    name="lfr_dt"
                    onChange={(value) => {this.props.handleLfrChange(value); }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    variant="outlined"
                    slotProps={{ textField: { size: "small" } }}
                    value={dayjs(selectedregcar.lto_dt ? selectedregcar.lto_dt: '')}
                    name="lto_dt"
                    onChange={(value) => {this.props.handleLtoChange(value); }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {/* 5째줄 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "15px" }}
            >
              {/* 보험회사 */}
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>보험회사</h5>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: "white" }}
                  value={selectedregcar?.insur_tr_cd ||""}
                  inputProps={{ style: { height: "15px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  onChange={(e) => this.props.handleInsurChange(e.target.value)}
                />
              </Grid>

              {/* 보험기간 */}
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>보험기간</h5>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    variant="outlined"
                    slotProps={{ textField: { size: "small" } }}
                    value={dayjs(selectedregcar.ifr_dt ? selectedregcar.ifr_dt: '')}
                    name="ifr_dt"
                    onChange={(value) => {this.props.handleIfrChange(value); }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    variant="outlined"
                    slotProps={{ textField: { size: "small" } }}
                    value={dayjs(selectedregcar.ito_dt ? selectedregcar.ito_dt: '')}
                    name="ito_dt"
                    onChange={(value) => {this.props.handleItoChange(value); }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* 6째줄 */}

            {/* 사용여부*/}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "15px" }}
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>사용여부</h5>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Select
                  size="small"
                  style={{ width: "25%" }}
                  sx={{ width: "100%", backgroundColor: "white" }}
                  label="차량사용"
                  value={selectedregcar?.use_yn ||"Y"}
                  inputProps={{ style: { height: "15px" } }}
                  onChange={(e) =>
                    this.props.handleUseynChange(e.target.value)
                  }
                >
                  <MenuItem value="Y">YES</MenuItem>
                  <MenuItem value="N">NO</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Acd1010Presentation;