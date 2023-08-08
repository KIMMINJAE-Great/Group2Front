import React from "react";
import { Component } from "react";


import CardList from "../../components/commons/CardList";

import { createTheme, Card, CardContent, Typography, Box, Grid, Checkbox } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { get, post, update, del } from "../../components/api_url/API_URL";
import Acc1013Search from "./Acc1013Search";
import Acc1013BasicInfo from "./Acc1013BasicInfo";
const acc1013theme = createTheme({
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

//회사등록 로직코드 (컨테이너)

class Acc1013 extends Component {
  constructor(props) {
    super(props);
    this.state = {

      postcode: '', //우편번호 5자리
      roadAddress: '',
      jibunAddress: '', //지번 주소
      extraAddress: '', //나머지 주소

      companyCards: [], // 빈 카드리스트
      selectedCompanyCards: '', // 카드리스트 선택된것..?
      companyCardData: [], //카드리스트에서 딱 하나 [0] 배열이다!!
      selectedchecked: [],
      defaultUse: "use",
      readonly: false,
      title: "회사등록",
      //모달d
      showModal: false,
      selectAllCheckbox: false,
      // 카드리스트에 보내줄 content 배열
      content: [],
      mauth: [],
    };
    this.DouzoneContainer = React.createRef();
  }

  //카드리스트 가져오기위해 componentDidMount로 시작하면 바로 미리 가져온다.
  componentDidMount() {
    get(`/company/cardlist`)
      .then((response) => {
        this.setState({ companyCards: response.data, selectedRead: "Y", content: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //  //카드리스트(DB에 접근해서 가져오는것 계속 새로고침을 해야하기에..)
  //  fetchCompanyCards = async (co_cd) => {
  //   try {
  //     const response = await get("/company/cardlist");
  //     this.setState({
  //       companyCards: response.data,
  //       selectedRead: "Y",
  //       content: response.data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 모달 열기
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  // 모달 닫기
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  //카드 클릭시 입력됨 (회사 코드로)
  handleCardClick = async (co_cd) => {

    try {
      const response = await post("/company/selectCard", { co_cd: co_cd });

      console.log("카드리스트 클릭됨!");
      console.log("co_cd" + co_cd);
      this.setState({
        selectedCompanyCards: response.data,
        selectedRead: "N",
        complete: '',
        readonly: true,
      });
      // this.setState({
      //   selectedCompanyCards: {
      //     ...response.data,
      //   }
      // });
      console.log("!!companyCardData!!" + this.state.companyCardData);

    } catch (error) {
      console.error(error);
      console.log("카드리스트 클릭 중에 오류발생");
    }
  };

  //카드리스트(DB에 접근해서 가져오는것 계속 새로고침을 해야하기에..)
  fetchCompanyCards = async () => {
    try {
      const response = await get("/company/cardlist");
      this.setState({
        companyCards: response.data,
        content: response.data,

      });
    } catch (error) {
      console.log(error);
    }
  };

  //입력값의 변화를 저장함
  handleInputChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state[e.target.name]); // 상태 업데이트 확인
      }
    );
  };

  //저장 버튼을 눌렀을 때 실행할 함수 (저장!!)
  handleSaveButton = async (e) => {
    e.preventDefault();

    const { selectedCompanyCards, selectedRead } = this.state;
    /* 필수값 유효성 검사 */
    if (!selectedCompanyCards.co_cd) {
      alert("회사 코드를 입력해주세요.");
      return;
    }
    if (!selectedCompanyCards.co_nm) {
      alert("회사이름을 입력해 주세요.");
      return;
    }



    if (selectedRead === "Y") {

      try {
        const response = await post("/company/save", selectedCompanyCards);
        console.log("post이후" + JSON.stringify(selectedCompanyCards));


        this.setState((prevState) => ({
          companyCardData: [...prevState.companyCards, response.data],
          content: [...prevState.companyCards, response.data],
          selectedCompanyCards: null,
        }));
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 등록이 완료됐습니다', 'success');


        console.log("저장을 누르기 전의 co_cd: " + this.state.co_cd);
      } catch (error) {
        console.log("저장을 눌렀을떄!!는??co_cd" + this.state.co_cd);
        console.error(error);
        this.DouzoneContainer.current.handleSnackbarOpen('회사 등록중 에러가 발생했습니다.', 'error');
        console.log("회사등록(DB) 중에 오류발생");
      }
    } else {
      try {
        const response = await update("/company/update", selectedCompanyCards);
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 수정이 완료됐습니다', 'success');
      } catch (error) {
        console.log(error);
      }
    }
  };

  //삭제 버튼을 눌렀을 때 실행할 함수
  // handleDeleteButton = async (e) => {
  //   e.preventDefault();
  //   const { selectedDept, companyCards, selectedchecked } = this.state;
  //   //필드데이터 // 회사 코드만 있으면 된다.
  //   const data = {
  //     co_cd: this.state.co_cd,
  //   };
  //   // Send data to server
  //   try {
  //     const response = await post("/company/delete", data);
  //     console.log(response);
  //     console.log("회사정보(DB) 삭제가 정상 실행");
  //     this.DouzoneContainer.current.handleSnackbarOpen('회사 정보가 정상적으로 삭제되었습니다.', 'success');
  //     this.fetchCompanyCards();
  //   } catch (error) {
  //     console.error(error);
  //     this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 삭제중 에러가 발생했습니다.', 'error');
  //     console.log("회사정보(DB) 삭제중에 오류발생");
  //   }
  //   this.handleCloseModal();
  // };

  // 휴지통 눌렀을때,삭제
  handleDeleteButton = async (e) => {
    e.preventDefault();
    const { companyCards, selectedchecked } = this.state;

    try {
      if (selectedchecked.length > 0) {
        const response = await del(
          `/company/delete`,
          { data: selectedchecked }
        );
        console.log(response.data);

        const newCardList = companyCards.filter(
          (item) => !selectedchecked.some((checkedItem) => checkedItem.co_cd === item.co_cd)
        );

        this.setState({
          companyCards: newCardList,
          content: newCardList,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          selectedchecked: [], // 선택된 체크박스 초기화
        });
        this.DouzoneContainer.current.handleSnackbarOpen('회사 삭제가 완료됐습니다', 'success');
      } else {

        const data = {
          co_cd: this.state.co_cd,
        };
        // 서버에 DELETE 요청 보내기
        const response = await del(`/company/delete/${this.state.co_cd}`);
        console.log(response);
        console.log("회사정보(DB) 삭제가 정상 실행");
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보가 정상적으로 삭제되었습니다.', 'success');
        this.fetchCompanyCards();

        // 서버 응답에 따라 삭제된 부서 정보를 companyCards에서 제거
        const newCardList = companyCards.filter(
          (item) => item.co_cd !== data
        );

        this.setState({
          companyCards: newCardList,
          content: newCardList,
          selectedDept: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
        });
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 삭제가 완료됐습니다', 'success');
      }
    } catch (error) {
      console.log(error);
    }

    this.handleCloseModal();
  };

  //우편주소 코드
  handlePostComplete = (data) => {
    let extraAddress = "";
    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraAddress +=
        extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
    }
    if (extraAddress !== "") {
      extraAddress = " (" + extraAddress + ")";
    }
    this.setState({
      postcode: data.zonecode,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      extraAddress,
    });
  };




  handleNewButtonClick = () => {
    this.setState({
      selectedCompanyCards: null,
      selectedRead: "Y",
      complete: '',
      readonly: false,
      postcode: '',
      roadAddress: '',
      jibunAddress: '',
      extraAddress: '',
    });
  };

  //강제로전송..
  handleDataChange(value) {
    this.setState({
      co_cd: value.co_cd,
      adr_zp: value.co_nm,
      adr_inp: value.adr_inp,
      adr_etc: value.adr_etc,
    });

  }

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
  handleToggleCheckbox = (co_cd) => {
    this.setState(
      (prevState) => {
        const updatedContent = prevState.content.map((item) =>
          item.co_cd === co_cd ? { ...item, checked: !item.checked } : item
        );
        const selectedchecked = updatedContent.filter((item) => item.checked);

        return { content: updatedContent, selectedchecked: selectedchecked };
      },
      () => {
        console.log(this.state.selectedchecked);
      },
    );
  };



  // 회사 카드리스트를 그려줄 함수
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
              회사 수 : {this.state.content.length}
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
                    border: "0.5px solid lightgrey",
                    marginRight: "2px",
                    display: "flex",
                  }}
                  onClick={() =>
                    this.handleCardClick(this.state.content[index].co_cd)
                  }
                >
                  <Checkbox
                    checked={item.checked || false}
                    onChange={() => this.handleToggleCheckbox(item.co_cd)}
                  />

                  <CardContent sx={{ paddingLeft: "3px", paddingRight: "1px" }}>
                    {/* item1,item2 */}
                    <Typography
                      variant="body2"
                      style={{
                        marginLeft: "10px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "90px",
                        maxWidth: "90px",
                      }}
                    >
                      {item.co_cd}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        marginLeft: "10px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "90px",
                        maxWidth: "90px",
                      }}
                    >
                      {item.co_nm}
                    </Typography>
                    <div> </div>
                  </CardContent>
                  <CardContent
                    style={{
                      marginLeft: "50px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      minWidth: "100px",
                    }}
                  >
                    {/* item3 */}
                    <Typography variant="body2">
                      username
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
                      개인/법인
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
    const { companyCards, companyCardData, defaultUse } = this.state;
    const user = JSON.parse(sessionStorage.getItem('user'));

    const mauthList = user.mauthList;
    //일부러 생성자에서 바인딩, 이 메서드를 콜백으로 사용할때 올바른 컨텍스트가 유지됨
    //또한 컴포넌트의 상태, 다른 메서드에 안전하게 접근가능
    this.handleInputChange = this.handleInputChange.bind(this); //con의 인스턴스와 바인딩하기위해 사용
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);


    return (
      <Router>
        <ThemeProvider theme={acc1013theme}>
          <DouzoneContainer
            ref={this.DouzoneContainer}
            title={this.state.title}
            delete={this.handleOpenModal}
            openDeleteModal={this.state.showModal}
            handleClose={this.handleCloseModal}
            handleConfirm={this.handleDeleteButton}
            message="정말로 회사 정보를 삭제하시겠습니까?"
          >

            <div>
              <Acc1013Search
                defaultUse={defaultUse}
                companyCards={companyCards}
                onInputChange={this.handleInputChange}
                handleSaveButton={this.handleSaveButton}
              ></Acc1013Search>

              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "30px" }}>
                  <CardList
                    handleCardClick={this.handleCardClick}
                    handleNewButtonClick={this.handleNewButtonClick}
                    onCardItemDraw={this.onCardItemDraw}
                    content={this.state.content}
                  ></CardList>
                </div>
                <Acc1013BasicInfo
                  selectedCompanyCards={this.state.selectedCompanyCards}
                  selectedRead={this.state.selectedRead}
                  complete={this.state.complete}
                  onInputChange={this.handleInputChange}
                  handleSaveButton={this.handleSaveButton}
                  handleDeleteButton={this.handleDeleteButton}
                  handleCardClick={this.handleCardClick}
                  co_cd={this.state.co_cd}
                  handleInputChangeReadOnly={this.handleInputChangeReadOnly}
                  // sco={this.state.companyCards} //카드리스트 sco
                  onComplete={this.handlePostComplete}
                  // addOrUpdate={this.addOrUpdate} 사용X
                  onDataChange={this.handleDataChange}
                  readonly={this.state.readonly}

                  handleCoCdChange={this.handleCoCdChange}
                  handleCoNmChange={this.handleCoNmChange}
                  handleCoNkChange={this.handleCoNkChange}
                  handleUseYnChange={this.handleUseYnChange}
                  handleLngChange={this.handleLngChange}
                  handleAdmCdChange={this.handleAdmCdChange}
                  handleBzTypeChange={this.handleBzTypeChange}
                  handleBzItemChange={this.handleBzItemChange}
                  handleCoTelChange={this.handleCoTelChange}
                  handleCoTel2Change={this.handleCoTel2Change}
                  handleCoFaxChange={this.handleCoFaxChange}
                  handleRegNbChange={this.handleRegNbChange}
                  handleCpCtChange={this.handleCpCtChange}
                  handleCpNoChange={this.handleCpNoChange}
                  handleAdrZpChange={this.handleAdrZpChange}
                  handleAdrInpChange={this.handleAdrInpChange}
                  handleAdrEtcChange={this.handleAdrEtcChange}
                  handleEstDtChange={this.handleEstDtChange}
                  handleOpnDtChange={this.handleOpnDtChange}
                  handleClsDtChange={this.handleClsDtChange}
                  handleCeoNmChange={this.handleCeoNmChange}
                  handleResNbChange={this.handleResNbChange}
                  handleResNb2Change={this.handleResNb2Change}
                  handleAcPerChange={this.handleAcPerChange}
                  handleAcDtChange={this.handleAcDtChange}
                  handleAccTypeChange={this.handleAccTypeChange}

                />
              </div>
            </div>
          </DouzoneContainer>
        </ThemeProvider>
      </Router>
    );
  }
}

export default Acc1013;
