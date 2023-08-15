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
import "./acc1011.css";

class Acc1011Presentation extends Component {




  render() {
    const { selectedDept, selectedRead, open } = this.props;
    var readonly = selectedRead === "N"; // 뉴뎁트를 y로 만들어서 false 값을 만드셈
    return (
      <div style={{ width: "90%", marginRight: "40px", marginLeft: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>ㆍ상세정보</p>
          <span style={{ fontWeight: 'bold', color: 'red' }}> {this.props.complete}</span>
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
        <div className="acc1011-input-container">
          <Grid
            container
            spacing={0.4}
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
            {/* 회사 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>회사</h5>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
                  sx={{ width: "100%", backgroundColor: readonly ? '#F2F2F2' : 'white' }}
                  variant="outlined"
                  size="small"
                  value={selectedDept?.co_cd || ""}
                  onChange={(e) => this.props.handleCoCdChange(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* 부서코드 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서코드</h5>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"         
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
                  sx={{ width: "100%", backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedDept?.dept_cd || ""}
                  onChange={(e) =>
                    this.props.handleDeptCdChange(e.target.value)
                  }
                  required
                />
              </Grid>
            </Grid>

            {/* 부서유형 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서유형</h5>
                </Typography>
              </Grid>
              <Grid item xs={11} style={{ backgroundColor: "white" }}>
                <Select
                  size="small"
                  style={{ width: "20%" }}
                  label="부서"
                  value={selectedDept?.dept_st || ""}
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
                  sx={{ width: "100%", backgroundColor: readonly ? '#F2F2F2' : 'white' }}
                  onChange={(e) =>
                    this.props.handleDeptStChange(e.target.value)
                  }
                >
                  <MenuItem value="회계과">회계과</MenuItem>
                  <MenuItem value="인사과">인사과</MenuItem>
                  <MenuItem value="기획과">기획과</MenuItem>
                  <MenuItem value="영업과">영업과</MenuItem>
                </Select>
              </Grid>
            </Grid>

            {/* 부서명 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서명</h5>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
                  sx={{ width: "100%", backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedDept?.dept_nm || ""}
                  onChange={(e) =>
                    this.props.handleDeptNmChange(e.target.value)
                  }
                  required
                />
              </Grid>
            </Grid>

            {/* 부서 관리자 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서 관리자</h5>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: "white" }}
                  inputProps={{ style: { height: "15px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedDept?.dept_tr || ""}
                  onChange={(e) =>
                    this.props.handleDeptTrChange(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={7}></Grid>
            </Grid>

            {/* 부서주소 */}

            <Grid container spacing={0.4} style={{ margin: "1px" }}>
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서주소</h5>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: "white" }}
                  inputProps={{ style: { height: "15px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedDept?.dept_addr1 || ""}
                />
              </Grid>
              <Grid item xs={7}>
                <div style={{ display: "flex" }}>
                  <Postcode
                    style={{
                      marginRight: "8px",
                      height: "30px",
                      width: "100px",
                      backgroundColor: "#FBFBFB",
                      color: "#7A7A7A",
                    }}
                    onComplete={this.props.handlePostComplete}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={1}
                style={{ textAlign: "right" }}
                sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
              ></Grid>
              <Grid
                item
                xs={11}
                style={{ textAlign: "right" }}
                sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", backgroundColor: "white" }}
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  value={selectedDept?.dept_addr2 || ""}
                />
              </Grid>
            </Grid>

            {/* 사용여부 */}
            <Grid
              container
              item
              xs={12}
              sx={{ borderBottom: "1px solid lightgray", padding: "4px" }}
              required
            >
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>사용여부</h5>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <RadioGroup
                  aria-label="usageStatus"
                  style={{ flexDirection: "row" }}
                  value={selectedDept?.dept_fg || "Y"}
                  onChange={(e) =>
                    this.props.handleDeptFgChange(e.target.value)
                  }
                >
                  <FormControlLabel
                    value="Y"
                    control={<Radio size="small" color="primary" />}
                    label="사용"
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio size="small" color="primary" />}
                    label="미사용"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Acc1011Presentation;