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
import DeleteDialog from "../../components/commons/DeleteDialog";

class Acc1011Presentation extends Component {




  render() {
    const { selectedDept, selectedRead, open } = this.props;
    var readonly = selectedRead === "N"; // 뉴뎁트를 y로 만들어서 false 값을 만드셈
    return (
      <div style={{ width: "90%", marginRight: "40px", marginLeft: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>ㆍ상세정보</p>
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



            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                height: "30px",
                backgroundColor: "#FBFBFB",
                color: "black",
              }}
              onClick={this.props.handleOpenModal}
            >
              삭제
            </Button>
            {/* 삭제 확인 */}
            <DeleteDialog
              open={open}
              handleClose={this.props.handleCloseModal}
              handleConfirm={this.props.handleDeleteClick}
              title="사원 삭제 확인"
              message="정말로 사원 정보를 삭제하시겠습니까?"
            />
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
                  sx={{ width: "100%", backgroundColor: "white" }}
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
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
                  sx={{ width: "100%", backgroundColor: "white" }}
                  style={{ background: "#FEF4F4" }}
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
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
                  sx={{ width: "100%", backgroundColor: "white" }}
                  label="부서"
                  value={selectedDept?.dept_st || ""}
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
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
                  style={{ background: "#FEF4F4" }}
                  inputProps={{ style: { height: "15px" }, readOnly: readonly }}
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
                  value={selectedDept?.dept_fg || ""}
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