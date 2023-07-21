import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";

<<<<<<< Updated upstream:front/src/componenets/nav/depManagement/DepManagement.js
class DepManagement extends Component {
    render() {
        return (
           <h1>부서관리</h1>
=======
class Acc1011 extends Component {
  render() {
    const employeeCards = Array.from({ length: 10 }); // 10개의 빈 카드 배열 생성
>>>>>>> Stashed changes:front/src/pages/depManagement/Acc1011.js

    return (
      <form>
        <div>
          <div style={{ padding: "0px" }}>
            <h2 style={{ margin: "0px" }}>부서관리</h2>
            <hr
              style={{
                borderColor: "lightgray",
                float: "left",
                width: "100%",
                padding: "0px",
                margin: "0px",
              }}
            />
            <div>
              <h5 style={{ margin: "10px" }}>
                회사별 조직도(부서)를 등록할 수 있으며,'부서/팀/임시'유형을
                선택하여 등록할 수 있습니다.
              </h5>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "25%" }}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card style={{ backgroundColor: "#ECECEC" }}>
                  <CardContent>
                    <Typography variant="caption">카드 제목</Typography>
                  </CardContent>
                </Card>
                <Box sx={{ overflowY: "auto", maxHeight: "620px" }}>
                  {" "}
                  {/* 스크롤바 영역 설정 */}
                  <Grid container spacing={2}>
                    {employeeCards.map((employee, index) => (
                      <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                        <Card>
                          <CardContent>
                            {/* 여기에 사원 카드의 내용 입력 */}
                            <Typography variant="body2">
                              사원 카드 {index + 1}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              사원 정보 {index + 1}
                            </Typography>
                          </CardContent>
                        </Card>{" "}
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

            <div style={{ width: "90%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>ㆍ상세정보</p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      marginRight: "8px",
                      height: "30px",
                      backgroundColor: "#FBFBFB",
                      color: "black",
                    }}
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
                  >
                    삭제
                  </Button>
                </div>
              </div>

              <Grid
                container
                spacing={0.4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {/* 회사 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>회사</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    sx={{ width: "100%" }}
                    inputProps={{ style: { height: "12px" } }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                {/* 사업장 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>사업장</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                  />
                </Grid>

                {/* 상위부서 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>상위부서</h5>
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <TextField
                    label="-"
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>
                <Grid item xs={0.5} style={{ textAlign: "left" }}>
                  <IconButton
                    color="black"
                    size="small"
                    sx={{
                      borderRadius: 0,
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #D3D3D3",
                      ml: 1,
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>

                {/* 대내수신여부 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>대내수신여부</h5>
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <Select size="small" style={{ width: "15%" }}>
                    <MenuItem value="option1">옵션 1</MenuItem>
                    <MenuItem value="option2">옵션 2</MenuItem>
                    <MenuItem value="option3">옵션 3</MenuItem>
                  </Select>
                </Grid>

                {/* 행정표준코드 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>행정표준코드</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                  />
                </Grid>

                {/* 발신인명 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>발신인명</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                  />
                </Grid>

                {/* 부서코드 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>부서코드</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    label="부서코드"
                    fullWidth
                    variant="outlined"
                    size="small"
                    style={{ background: "#FEF4F4" }}
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>

                {/* 부서유형 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>부서유형</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <Select size="small" style={{ width: "15%" }} label="부서">
                    <MenuItem value="option1">옵션 1</MenuItem>
                    <MenuItem value="option2">옵션 2</MenuItem>
                    <MenuItem value="option3">옵션 3</MenuItem>
                  </Select>
                </Grid>

                {/* 부서명 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>부서명</h5>
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <TextField
                    label="업데이트신"
                    fullWidth
                    variant="outlined"
                    size="small"
                    style={{ background: "#FEF4F4" }}
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>
                <Grid item xs={0.5} style={{ textAlign: "left" }}>
                  <IconButton
                    color="black"
                    size="small"
                    sx={{
                      borderRadius: 0,
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #D3D3D3",
                      ml: 1,
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>

                {/* 부서약칭 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>부서약칭</h5>
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    label="업데이트신"
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>

                {/* 결재 관리자 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>결재 관리자</h5>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="사용자 이름을 입력해주세요"
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <IconButton
                    color="black"
                    size="small"
                    sx={{
                      borderRadius: 0,
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #D3D3D3",
                      ml: 1,
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>

                {/* 부서 관리자 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>부서 관리자</h5>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="사용자 이름을 입력해주세요"
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <IconButton
                    color="black"
                    size="small"
                    sx={{
                      borderRadius: 0,
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #D3D3D3",
                      ml: 1,
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>

                {/* 조직장 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>조직장</h5>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="사용자 이름을 입력해주세요"
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { height: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <IconButton
                    color="black"
                    size="small"
                    sx={{
                      borderRadius: 0,
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #D3D3D3",
                      ml: 1,
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>

                {/* 부서주소 */}
                <Grid container spacing={0.4} alignItems="center">
                  <Grid item xs={1} style={{ textAlign: "right" }}>
                    <Typography>
                      <h5 style={{ margin: "5px" }}>부서주소</h5>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="우편번호 스껄"
                      fullWidth
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: "12px" } }}
                      InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                          marginRight: "8px",
                          height: "30px",
                          width: "100px",
                          backgroundColor: "#FBFBFB",
                          color: "#7A7A7A",
                        }}
                      >
                        우편번호
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={1} style={{ textAlign: "right" }}></Grid>
                  <Grid item xs={5} style={{ textAlign: "right" }}>
                    <TextField
                      label="1"
                      fullWidth
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: "12px" } }}
                      InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="2"
                      fullWidth
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: "12px" } }}
                      InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                  </Grid>
                </Grid>

                {/* 사용여부 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>사용여부</h5>
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <RadioGroup
                    aria-label="usageStatus"
                    style={{ flexDirection: "row" }}
                    // value={usageStatus}
                    // onChange={handleUsageStatusChange}
                  >
                    <FormControlLabel
                      value="사용"
                      control={<Radio size="small" color="primary" />}
                      label="사용"
                    />
                    <FormControlLabel
                      value="미사용"
                      control={<Radio size="small" color="primary" />}
                      label="미사용"
                    />
                  </RadioGroup>
                </Grid>

                {/* 관리부서 */}
                <Grid item xs={1} style={{ textAlign: "right" }}>
                  <Typography>
                    <h5 style={{ margin: "5px" }}>관리부서</h5>
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <RadioGroup
                    aria-label="usageStatus"
                    style={{ flexDirection: "row" }}
                    // value={usageStatus}
                    // onChange={handleUsageStatusChange}
                  >
                    <FormControlLabel
                      value="설정"
                      control={<Radio size="small" color="primary" />}
                      label="설정"
                    />
                    <FormControlLabel
                      value="미설정"
                      control={<Radio size="small" color="primary" />}
                      label="미설정"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

<<<<<<< Updated upstream:front/src/componenets/nav/depManagement/DepManagement.js
export default DepManagement;
=======
export default Acc1011;
>>>>>>> Stashed changes:front/src/pages/depManagement/Acc1011.js
