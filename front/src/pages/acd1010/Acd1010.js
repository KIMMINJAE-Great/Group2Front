import React, { Component } from "react";
import { get, post, del, update } from "../../components/api_url/API_URL";
import CardList from "../../components/commons/CardList"; // CardList 컴포넌트 임포트
import Acd1010Presentation from "./Acd1010Presentation"; // Acd1010Presentation 컴포넌트 임포트
import { Card, CardContent, Checkbox, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import Acd1010Search from "./Acd1010Search";
import { DateTime } from 'luxon';


import { Divider, MenuItem, Select, TextField, } from "@mui/material";
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';

import { Box } from "@mui/system";


const acd1010theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "15px",
          fontWeight: "bold",
          height: "15px",
          lineHeight: "15px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginRight: "8px",
          height: "30px",
          backgroundColor: "#FBFBFB",
          color: "black",
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
        fullWidth: true,
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // 모든 Grid 태그에 적용하려면 root를 사용하세요.
          // borderBottom: '1px solid black',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover $notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상으로 유지
          },
          "&.Mui-focused $notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상으로 유지
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "&:hover ": {
            cursor: "pointer",
            border: "1px solid #0f8bff",
          },
          "&.noHoverEffect:hover": {
            cursor: "auto",
            border: "none",
          },
        },
      },
    },
  },
});
class Acd1010 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regcarCards: [], // 카드리스트 저장할 빈 배열
      selectedregcar: '', // 클릭한 부서 정보를 저장할 상태 변수
      contentArray: [], // 카드 안에 콘텐트정보를 담을 빈 배열
      content: [],
      selectedchecked: [],
      selectedCardIndex: null, // 선택한 카드의 인덱스
      newSelectAllCheckbox: "",

      selectedDate: new Date(),


      showModal: false,
      selectAllCheckbox: false,





      title: '차량등록'


    };
    this.DouzoneContainer = React.createRef();
  }

  componentDidMount() {
    get(`/regcar/cardlist`)
      .then((response) => {
        this.setState({ regcarCards: response.data, content: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 카드를 클릭했을때
  handleCardClick = async (car_cd, index) => {

    try {
      const response = await post(`/regcar/getRegcarCard`, {
        car_cd: car_cd,
      });
      this.setState({
        selectedregcar: response.data,
        selectedRead: "N",
        complete: '',
        selectedCardIndex: index, // 클릭한 카드의 인덱스 저장
      });
    } catch (error) {
      console.log(error);
    }
  };

  // componentDidUpdate(){
  //   this.setState({content : response.data});
  // }

  // 모달 열기
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  // 모달 닫기
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };


  // 추가 버튼
  handleNewButtonClick = () => {
    // selectedDept 상태를 빈 값으로 업데이트
    this.setState({
      selectedregcar: '',
      selectedRead: "Y",
      complete: '',

    });
  };

  toLocalISOString = (date) => {
    const off = date.getTimezoneOffset();
    const offset = (off < 0 ? '+' : '-') + String(Math.abs(off / 60)).padStart(2, '0');
    const adjustedDate = new Date(date.getTime() - off * 60 * 1000);
    return (adjustedDate.toISOString().substring(0, 23) + offset + ':00');
  }

  //저장버튼
  handleSaveClick = async (e) => {
    e.preventDefault();
    const { selectedregcar, selectedRead } = this.state;


    // 차량코드가 비어있는지 확인합니다.
    if (!selectedregcar.car_cd) {
      console.log("차량코드를 입력해주세요.");
      return;
    }
    // 차량번호이 비엉있는지 확인합니다.
    if (!selectedregcar.car_nb) {
      console.log("차량번호을 입력해주세요.");
      return;
    }
    // 차량명이 비엉있는지 확인합니다.
    if (!selectedregcar.car_nm) {
      console.log("차량명을 입력해주세요.");
      return;
    }
    // 사원코드가 비어있는지 확인합니다.
    if (!selectedregcar.emp_cd) {
      console.log("사원코드를 입력해주세요.");
      return;
    }
    // 임차구분 비엉있는지 확인합니다.
    if (!selectedregcar.lease_yn) {
      console.log("임차구분을 입력해주세요.");
      return;
    }


    //삽입 기능
    // 선택한 차량이 있는지 확인하기 위해 selectedregcar null이 아닌지 확인합니다.
    if (selectedRead === "Y") {

      try {
        // 모든 날짜 필드를 지역 시간대로 변환
        const transformedCar = {
          ...selectedregcar,
          get_dt: selectedregcar.get_dt ? this.toLocalISOString(new Date(selectedregcar.get_dt)) : null,
          disposal_dt: selectedregcar.disposal_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.disposal_dt).toJSDate()) : null,
          lfr_dt: selectedregcar.lfr_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.lfr_dt).toJSDate()) : null,
          lto_dt: selectedregcar.lto_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.lto_dt).toJSDate()) : null,
          ifr_dt: selectedregcar.ifr_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.ifr_dt).toJSDate()) : null,
          ito_dt: selectedregcar.ito_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.ito_dt).toJSDate()) : null,
        };


        console.log(transformedCar)
        const response = await post(`/regcar/addcar`, transformedCar);
        console.log("서버 응답:", response.data);

        this.setState((prevState) => ({
          // 추가된 부서 정보를 regcarCards에 추가.
          regcarCards: [...prevState.regcarCards, response.data],
          content: [...prevState.regcarCards, response.data],
          // 선택한 부서 정보를 초기화합니다.
          selectedregcar: '',

        }));
        this.DouzoneContainer.current.handleSnackbarOpen('차량정보 등록이 완료됐습니다', 'success');
      } catch (error) {
        console.log(error);
        this.DouzoneContainer.current.handleSnackbarOpen('차량정보 등록 에러', 'error');
      }
    }// 수정 기능
    else if (selectedRead === "N") {

      try {


        // 모든 날짜 필드를 지역 시간대로 변환
        const transformedCar = {
          ...selectedregcar,
          get_dt: selectedregcar.get_dt ? this.toLocalISOString(new Date(selectedregcar.get_dt)) : null,
          disposal_dt: selectedregcar.disposal_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.disposal_dt).toJSDate()) : null,
          lfr_dt: selectedregcar.lfr_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.lfr_dt).toJSDate()) : null,
          lto_dt: selectedregcar.lto_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.lto_dt).toJSDate()) : null,
          ifr_dt: selectedregcar.ifr_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.ifr_dt).toJSDate()) : null,
          ito_dt: selectedregcar.ito_dt ? this.toLocalISOString(DateTime.fromISO(selectedregcar.ito_dt).toJSDate()) : null,
        };



        console.log(selectedregcar);
        const response = await update(`/regcar/updatecar`, transformedCar);
        console.log("서버 응답:", response.data);
        this.DouzoneContainer.current.handleSnackbarOpen('차량정보 수정이 완료됐습니다', 'success');



      } catch (error) {
        console.log(error);
      }
    }
  };

  // 삭제 버튼 눌렀을 때
  handleDeleteClick = async (e) => {
    e.preventDefault();
    const { selectedregcar, regcarCards } = this.state;

    try {
      // 서버에 DELETE 요청 보내기
      const response = await del(
        `/regcar/deletecar/${selectedregcar.car_cd}`
      );
      console.log("서버 응답", response.data);

      // 서버 응답에 따라 삭제된 차량 정보를 regcarCards에서 제거
      const newCardList = regcarCards.filter(
        (item) => item.car_cd !== selectedregcar.car_cd
      );

      this.setState({
        regcarCards: newCardList,
        content: newCardList,
        selectedregcar: '',

      });
      this.DouzoneContainer.current.handleSnackbarOpen('차량정보 삭제가 완료됐습니다', 'success');
    } catch (error) {
      console.log(error);
    }

    this.handleCloseModal();

  };


  // 휴지통 눌렀을때,삭제
  handleDeleteClick = async (e) => {
    e.preventDefault();
    const { selectedregcar, regcarCards, selectedchecked } = this.state;

    try {
      if (selectedchecked.length > 0) {
        const response = await del(
          `/regcar/deletecar`,
          { data: selectedchecked }
        );
        console.log(response.data);

        const newCardList = regcarCards.filter(
          (item) => !selectedchecked.some((checkedItem) => checkedItem.car_cd === item.car_cd)
        );

        this.setState({
          regcarCards: newCardList,
          content: newCardList,
          selectedregcar: "",
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          selectedchecked: [], // 선택된 체크박스 초기화
        });
        this.DouzoneContainer.current.handleSnackbarOpen('차량정보 삭제가 완료됐습니다', 'success');
      } else {
        // 서버에 DELETE 요청 보내기
        const response = await del(
          `/regcar/deletecar/${selectedregcar.car_cd}`
        );
        console.log("서버 응답", response.data);

        // 서버 응답에 따라 삭제된 부서 정보를 regcarCards에서 제거
        const newCardList = regcarCards.filter(
          (item) => item.car_cd !== selectedregcar.car_cd
        );

        this.setState({
          regcarCards: newCardList,
          content: newCardList,
          selectedregcar: "",
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
        });
        this.DouzoneContainer.current.handleSnackbarOpen('차량정보 삭제가 완료됐습니다', 'success');
      }
    } catch (error) {
      console.log(error);
    }

    this.handleCloseModal();
  };



  // @@@@@@@@@@@@@@@ 체크 박스 @@@@@@@@@@@@@@@@@@@@@@
  handleToggleAllCheckboxes = () => {
    this.setState((prevState) => {
      const newSelectAllCheckbox = !prevState.selectAllCheckbox;

      const updatedContent = prevState.content.map((item) => ({
        ...item,
        checked: newSelectAllCheckbox,
      }));

      const selectedchecked = newSelectAllCheckbox
        ? [...updatedContent]
        : [];

      return {
        selectAllCheckbox: newSelectAllCheckbox,
        content: updatedContent,
        selectedchecked: selectedchecked,
      };
    }, () => {
      console.log(this.state.selectedchecked);
    });
  };
  // 체크박스 토글 처리하는 함수
  handleToggleCheckbox = (car_cd) => {
    this.setState(
      (prevState) => {
        const updatedContent = prevState.content.map((item) =>
          item.car_cd === car_cd ? { ...item, checked: !item.checked } : item
        );
        const selectedchecked = updatedContent.filter((item) => item.checked);

        return { content: updatedContent, selectedchecked: selectedchecked };
      },
      () => {
        console.log(this.state.selectedchecked);
      }
    );
  };







  // 입력된 값을 car_cd 필드에 저장(차량코드)
  handleCarCdChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        car_cd: value,
      },
    }));
  };
  // 입력된 값을 car_nb 필드에 저장(차량번호)
  handleCarNbChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        car_nb: value,
      },
    }));
  };
  // 입력된 값을 car_nm 필드에 저장(차량명)
  handleCarNmChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        car_nm: value,
      },
    }));
  };

  // 입력된 값을 emp_cd 필드에 저장(사원번호)
  handleEmpCdChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        emp_cd: value,
      },
    }));
  };

  handleGetDtChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        get_dt: value,
      },
    }));
  }
  handleDisposalDtChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        disposal_dt: value,
      },
    }));
  }

  handleLeaseynChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        lease_yn: value,
      },
    }));
  }

  handleLfrChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        lfr_dt: value,
      },
    }));
  }
  handleLtoChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        lto_dt: value,
      },
    }));
  }

  handleInsurChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        insur_tr_cd: value,
      },
    }));
  }

  handleIfrChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        ifr_dt: value,
      },
    }));
  }
  handleItoChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        ito_dt: value,
      },
    }));
  }

  handleUseynChange = (value) => {
    this.setState((prevState) => ({
      selectedregcar: {
        ...prevState.selectedregcar,
        use_yn: value,
      },
    }));
  }

  // 조회 조건으로 받은 차량정보 카드리스트
  handleRegcarCards = (regcarCards) => {
    this.setState({ regcarCards, content: regcarCards });
  };




  // 부서 카드리스트를 그려줄 함수
  onCardItemDraw = () => {

    return (
      <div>
        <Card
          style={{ backgroundColor: "#ECECEC", marginBottom: "5px" }}
          class="noHoverEffect"
        >
          <CardContent>
            <Checkbox

              onChange={() => this.handleToggleAllCheckboxes()}
            />
            <Typography variant="caption">
              차량 개수 : {this.state.content.length}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ overflowY: "auto", maxHeight: "550px" }}>
          {/* 스크롤바 영역 설정 */}
          <Grid container spacing={2}>
            {this.state.content.map((item, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                <Card
                  sx={{
                    borderRadius: "5px",
                    border: this.state.selectedCardIndex === index ? "0.5px solid blue" : "0.5px solid lightgrey", // 파란색 테두리 추가
                    marginRight: "2px",
                    display: "flex",
                  }}
                  onClick={() =>
                    this.handleCardClick(this.state.content[index].car_cd, index)
                  }
                >
                  {/* 체크박스 */}
                  <Checkbox
                    checked={item.checked || false}
                    onChange={() => this.handleToggleCheckbox(item.car_cd)}
                  />

                  <CardContent sx={{ paddingLeft: "3px", paddingRight: "1px" }}>
                    {/* item1,item2 */}
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
                      {item.car_nm}
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
                      {item.car_nb}
                    </Typography>
                    <div> </div>
                  </CardContent>
                  <CardContent
                    style={{
                      marginLeft: "30px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      minWidth: "100px",
                    }}
                  >
                    {/* item3 */}
                    <Typography variant="body2">
                      {item.car_cd}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    )
  }



  render() {
    const { regcarCards, selectedregcar, selectedRead, showModal, complete } = this.state;

    return (
      <ThemeProvider theme={acd1010theme}>
        <DouzoneContainer ref={this.DouzoneContainer}
          title={this.state.title}
          delete={this.handleOpenModal}
          openDeleteModal={this.state.showModal}
          handleClose={this.handleCloseModal}
          handleConfirm={this.handleDeleteClick}
          showDelete={''}
          message="정말로 차량 정보를 삭제하시겠습니까?">
          <Acd1010Search carSearch={this.handleRegcarCards} ></Acd1010Search>

          <form onSubmit={this.handleSaveClick}>
            <div>
              <div style={{ padding: "0px" }}>
                <div>
                  <h5 style={{ margin: "10px" }}>
                    회사별 차량을 등록할 수 있으며,'차종/기간/보험'유형을
                    선택하여 등록할 수 있습니다.
                  </h5>
                </div>

              </div>
              <div style={{ display: "flex" }}>
                <CardList
                  handleCardClick={this.handleCardClick}
                  handleNewButtonClick={this.handleNewButtonClick}
                  onCardItemDraw={this.onCardItemDraw}
                  content={this.state.content}
                ></CardList>

                <Acd1010Presentation
                  selectedregcar={selectedregcar}
                  selectedRead={selectedRead}
                  open={showModal}
                  handleCloseModal={this.handleCloseModal}
                  handleOpenModal={this.handleOpenModal}


                  handleCarCdChange={this.handleCarCdChange}
                  handleCarNbChange={this.handleCarNbChange}
                  handleCarNmChange={this.handleCarNmChange}
                  handleEmpCdChange={this.handleEmpCdChange}
                  handleGetDtChange={this.handleGetDtChange}
                  handleDisposalDtChange={this.handleDisposalDtChange}
                  handleLeaseynChange={this.handleLeaseynChange}
                  handleLfrChange={this.handleLfrChange}
                  handleLtoChange={this.handleLtoChange}
                  handleInsurChange={this.handleInsurChange}
                  handleIfrChange={this.handleIfrChange}
                  handleItoChange={this.handleItoChange}
                  handleUseynChange={this.handleUseynChange}
                  handleDeleteClick={this.handleDeleteClick}

                ></Acd1010Presentation>
              </div>
            </div>
          </form>
        </DouzoneContainer>
      </ThemeProvider>
    );
  }
}

export default Acd1010;