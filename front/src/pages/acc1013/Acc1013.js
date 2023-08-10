import React from "react";
import { Component } from "react";


import CardList from "../../components/commons/CardList";

import { createTheme, Card, CardContent, Typography, Box, Grid } from "@mui/material";
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
      defaultUse: "use",
      readonly: false,
      title: "회사등록",
      //모달d
      showModal: false,
      // 카드리스트에 보내줄 content 배열
      content: [],
      mauth: [],

      selectedCardIndex: null, // 선택한 카드의 인덱스
      newSelectAllCheckbox:"",
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
  handleCardClick = async (co_cd, index) => {
    console.log('co_cd............' + co_cd)
    try {
      const response = await post("/company/selectCard", { co_cd: co_cd });

      console.log("카드리스트 클릭됨!");
      console.log("co_cd" + co_cd);
      this.setState({
        selectedCompanyCards: response.data,
        selectedRead: "N",
        complete: '',
        selectedCardIndex: index, // 클릭한 카드의 인덱스 저장
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
        let updatedSelectedCompanyCards = {
          ...selectedCompanyCards,
          est_dt: selectedCompanyCards.est_dt || '',
          opn_dt: selectedCompanyCards.opn_dt || '',
          cls_dt: selectedCompanyCards.cls_dt || '',
        };

        this.setState((prevState) => ({
          companyCardData: [...prevState.companyCards, updatedSelectedCompanyCards],
          content: [...prevState.companyCards, updatedSelectedCompanyCards],
          selectedCompanyCards: updatedSelectedCompanyCards,
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
  handleDeleteButton = async (e) => {
    e.preventDefault();
    const { selectedCompanyCards, companyCards } = this.state;
    //필드데이터 // 회사 코드만 있으면 된다.

    // Send data to server
    try {
      const response = await del("/company/delete/${selectedCompanyCards.co_cd}");

      console.log("회사정보(DB) 삭제가 정상 실행" + response.data);
      const newCardList = companyCards.filter(
        (item) => item.co_cd !== selectedCompanyCards.co_cd
      );
      this.setState({
        companyCards: newCardList,
        selectedCompanyCards: '',
        postcode: "",
        roadAddress: "",
        jibunAddress: "",
        content: newCardList,
      });
      this.DouzoneContainer.current.handleSnackbarOpen('회사 정보가 정상적으로 삭제되었습니다.', 'success');

    } catch (error) {
      console.error(error);
      this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 삭제중 에러가 발생했습니다.', 'error');
      console.log("회사정보(DB) 삭제중에 오류발생");
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
    console.log('추가ㅓ 누르기')
    this.setState({
      selectedCompanyCards: '',
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

  handleCoCdChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_cd: value,
      },
    }));
  };

  handleCoNmChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_nm: value,
      },
    }));
  };
  handleCoNkChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_nk: value,
      },
    }));
  };


  handleUseYnChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        use_yn: value,
      },
    }));
  };
  handleLngChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        lng: value,
      },
    }));
  };
  handleAdmCdChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        adm_cd: value,
      },
    }));
  };
  handleBzTypeChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        bz_type: value,
      },
    }));
  };

  handleBzItemChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        bz_item: value,
      },
    }));
  };

  handleCoTelChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_tel: value,
      },
    }));
  };
  handleCoTel2Change = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_tel2: value,
      },
    }));
  };
  handleCoFaxChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_fax: value,
      },
    }));
  };
  handleRegNbChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        reg_nb: value,
      },
    }));
  };
  handleCpCtChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        cp_ct: value,
      },
    }));
  };

  handleCpNoChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        cp_no: value,
      },
    }));
  };
  handleAdrZpChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        adr_zp: value,
      },
    }));
  };


  handleAdrInpChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        adr_inp: value,
      },
    }));
  };
  handleAdrEtcChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        adr_etc: value,
      },
    }));
  };
  handleEstDtChange = (value) => {
    console.log('est_dt찍어보기.... : ' + value);
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        est_dt: value,
      },
    }));
  };

  handleOpnDtChange = (value) => {
    console.log('개업찍어보기.... : ' + value);
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        opn_dt: value,
      },
    }));
  };
  handleClsDtChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        cls_dt: value,
      },
    }));
  };

  handleCeoNmChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        ceo_nm: value,
      },
    }));
  };
  handleResNbChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        res_nb: value,
      },
    }));
  };
  handleResNb2Change = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        res_nb2: value,
      },
    }));
  };
  handleAcPerChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        ac_per: value,
      },
    }));
  };
  handleAcDtChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        ac_dt: value,
      },
    }));
  };
  handleAccTypeChange = (value) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        acc_type: value,
      },
    }));
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
                    border: this.state.selectedCardIndex === index ? "0.5px solid blue" : "0.5px solid lightgrey", // 파란색 테두리 추가
                    marginRight: "2px",
                    display: "flex",
                  }}
                  onClick={() =>
                    this.handleCardClick(this.state.content[index].co_cd, index)
                  }
                >

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
                      marginLeft: "90px",
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
    // const user = JSON.parse(sessionStorage.getItem('user'));
    // console.log("user!@!@!@!@" + JSON.stringify(user));
    // const mauthList = user.mauthList;
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
