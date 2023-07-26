import React, { Component } from "react";
import { Button, Card, CardContent, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography, } from "@mui/material";
import { Box } from "@mui/system";
import { get, post, del } from "../../componenets/api_url/API_URL";
import Postcode from './../../componenets/commons/Postcode';

class Acc1011 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCards: [], // 카드리스트 저장할 빈 배열
      selectedDept: null, // 클릭한 부서 정보를 저장할 상태 변수

      postcode: "", //우편번호 찾기 저장할 상태 변수
      roadAddress: "",
      jibunAddress: "",
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const response = await get(`/depmanagement`);
      this.setState({ departmentCards: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  handleCardClick = async (dept_cd) => {

    console.log(dept_cd);

    try {
      const response = await post(`/depmanagement/getdept`, { dept_cd: dept_cd });
      this.setState({
        selectedDept: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };



  //저장버튼에 일단 삽입만 구현(업데이트 아직)
  handleSaveClick = async (e) => {
    e.preventDefault();
    const { selectedDept } = this.state;

    // 선택한 부서가 있는지 확인하기 위해 selectedDept가 null이 아닌지 확인합니다.
    if (selectedDept) {
      // 부서코드가 비어있는지 확인합니다.
      if (!selectedDept.dept_cd) {
        console.log("부서코드를 입력해주세요.");
        return;
      }
      // 부서명이 비엉있는지 확인합니다.
      if (!selectedDept.dept_nm) {
        console.log("부서명을 입력해주세요.");
        return;
      }

      try {
        const response = await post(`/depmanagement/adddept`, selectedDept);
        console.log("서버 응답:", response.data);

        this.setState((prevState) => ({
          // 추가된 부서 정보를 departmentCards에 추가.
          departmentCards: [...prevState.departmentCards, response.data],
          // 선택한 부서 정보를 초기화합니다.
          selectedDept: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  //const newCardList = departmentcards.filter(item => item != dept_cd)


  // 삭제 버튼 눌렀을 때
  handleDeleteClick = async () => {
    const { selectedDept, departmentCards } = this.state;

    try {
      // 서버에 DELETE 요청 보내기
      const response = await del(`/depmanagement/deletedept/${selectedDept.dept_cd}`);
      console.log("서버 응답", response.data);

      // 서버 응답에 따라 삭제된 부서 정보를 departmentCards에서 제거
      const newCardList = departmentCards.filter(
        (item) => item.dept_cd !== selectedDept.dept_cd
      );

      this.setState({
        departmentCards: newCardList,
        selectedDept: null,
        postcode: "",
        roadAddress: "",
        jibunAddress: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //우편번호와 주소를 업데이트
  handlePostComplete = (data) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_addr1: data.zonecode,
        dept_addr2: data.address,
      },
    }));
  };

  // 추가 버튼 
  handleNewButtonClick = () => {
    // selectedDept 상태를 빈 값으로 업데이트
    this.setState({
      selectedDept: null,
    });
  };

  // 입력된 값을 co_cd 필드에 저장(회사명)
  handleCoCdChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        co_cd: value,
      },
    }));
  };

  // 입력된 값을 dept_cd 필드에 저장(부서코드)
  handleDeptCdChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_cd: value,
      },
    }));
  };

  // 입력된 값을 dept_st 필드에 저장(부서유형)
  handleDeptStChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_st: value,
      },
    }));
  };
  // 입력된 값을 dept_nm 필드에 저장(부서명)
  handleDeptNmChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_nm: value,
      },
    }));
  };

  // 입력된 값을 dept_tr 필드에 저장(부서관리자)
  handleDeptTrChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_tr: value,
      },
    }));
  };

  // 입력된 값을 dept_fg 필드에 저장(사용유형)
  handleDeptFgChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_fg: value,
      },
    }));
  };

  render() {
    const { departmentCards, selectedDept } = this.state;

    return (
      <form onSubmit={this.handleSaveClick}>
        <div>
          <div style={{ padding: "0px" }}>


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
                {/* 카드리스트 > */}
                <div
                  className="cardlist-container"
                  style={{
                    maxWidth: "280px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    borderTop: "3px solid black",
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
                            부서: {departmentCards.length}개
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                          </Typography>
                        </CardContent>
                      </Card>
                      <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
                        {/* 스크롤바 영역 설정 */}
                        <Grid container spacing={2}>
                          {departmentCards.map((department, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              key={index}
                            >
                              <Button
                                onClick={() =>
                                  this.handleCardClick(department.dept_cd)
                                } // 카드 클릭 시 이벤트 처리
                                sx={{
                                  padding: 0, // 기본 패딩 제거
                                  display: "block", // 버튼은 블록 요소로 표시되도록 설정
                                  textAlign: "left", // 좌측 정렬
                                  width: "100%", // 버튼을 100% 
                                }}
                              >
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
                                      paddingLeft: "20px",
                                      paddingRight: "80px",
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
                                      {department.dept_st} {/* 부서유형 */}
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
                                      {department.dept_nm} {/* 부서명 */}
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
                                      {department.dept_cd} {/* 부서코드 */}
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
                        onClick={this.handleNewButtonClick} // "추가" 버튼 클릭 시 handleNewButtonClick 함수 호출
                      >
                        추가
                      </Button>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </div>

            <div style={{ width: "90%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>ㆍ상세정보</p>
                {/* <hr
              style={{
                borderColor: "lightgray",
                float: "left",
                width: "100%",
                padding: "0px",
                margin: "0px",
              }}
            /> */}
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
                    onClick={this.handleDeleteClick}
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
                    inputProps={{ style: { height: "15px" } }}
                    variant="outlined"
                    size="small"
                    value={selectedDept?.co_cd || ""}
                    onChange={(e) => this.handleCoCdChange(e.target.value)}
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
                    fullWidth
                    variant="outlined"
                    size="small"
                    style={{ background: "#FEF4F4" }}
                    inputProps={{ style: { height: "15px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                    value={selectedDept?.dept_cd || ""}
                    onChange={(e) => this.handleDeptCdChange(e.target.value)}
                    required
                  />
                </Grid>

                {/* 부서유형 */}
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
                    onChange={(e) => this.handleDeptStChange(e.target.value)}
                  >
                    <MenuItem value="회계과">회계과</MenuItem>
                    <MenuItem value="인사과">인사과</MenuItem>
                    <MenuItem value="기획과">기획과</MenuItem>
                    <MenuItem value="영업과">영업과</MenuItem>
                  </Select>
                </Grid>

                {/* 부서명 */}
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
                    inputProps={{ style: { height: "15px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                    value={selectedDept?.dept_nm || ""}
                    onChange={(e) => this.handleDeptNmChange(e.target.value)}
                    required
                  />
                </Grid>

                {/* 부서 관리자 */}
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
                    inputProps={{ style: { height: "15px" } }}
                    InputLabelProps={{ style: { fontSize: "12px" } }}
                    value={selectedDept?.dept_tr || ""}
                    onChange={(e) => this.handleDeptTrChange(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}></Grid>

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
                        onComplete={this.handlePostComplete}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={1} style={{ textAlign: "right" }}></Grid>
                  <Grid item xs={11} style={{ textAlign: "right" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: "12px" } }}
                      InputLabelProps={{ style: { fontSize: "12px" } }}
                      value={selectedDept?.dept_addr2 || ""}
                    />
                  </Grid>
                </Grid>

                {/* 사용여부 */}
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
                    onChange={(e) => this.handleDeptFgChange(e.target.value)}
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
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Acc1011;
