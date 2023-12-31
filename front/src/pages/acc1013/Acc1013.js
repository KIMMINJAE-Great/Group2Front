import React from "react";
import { Component } from "react";
import { get, post, update, del, getByQueryString } from "../../components/api_url/API_URL";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createTheme, Card, CardContent, Checkbox, Typography, Box, Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import Acc1013Search from "./Acc1013Search";
import Acc1013BasicInfo from "./Acc1013BasicInfo";
import CardList from "../../components/commons/CardList";

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

      searchCom: null, //검색에필요
      companyCards: [], // 빈 카드리스트
      selectedCompanyCards: '', // 카드리스트 선택된것..?
      companyCardData: [], //카드리스트에서 딱 하나 [0] 배열이다!!
      defaultUse: "",// search 에서 사용여부
      readonly: false,
      title: "회사등록",
      //모달d
      showModal: false,
      // 카드리스트에 보내줄 content 배열
      content: [],
      mauth: [],

      selectedchecked: [], // 체크박스 선택한 배열의 정보 
      selectAllCheckbox: false, // 체크박스 모두 선택 


      selectedCardIndex: null, // 선택한 카드의 인덱스
      newSelectAllCheckbox: "",

      emp_nm: null,
    };
    this.DouzoneContainer = React.createRef();
  }

  //카드리스트 가져오기위해 componentDidMount로 시작하면 바로 미리 가져온다.
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user')); //세션스토리지에 있는 현재 로그인 정보
    if (user && user.emp_nm) {
      this.setState({ emp_nm: user.emp_nm });
    }

    this.getCardList(); //카드리스트 가져오기
  }

  getCardList = async () => {
    try {
      const response = await get(`/company/cardlist`);
      this.setState({ companyCards: response.data, selectedRead: "Y", content: response.data });
    } catch (error) {
      console.log(error);
    }
  }

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
    try {
      const response = await post("/company/selectCard", { co_cd: co_cd });

      this.setState({
        selectedCompanyCards: response.data,
        selectedRead: "N",
        complete: '',
        selectedCardIndex: index, // 클릭한 카드의 인덱스 저장
        readonly: true,
      });


    } catch (error) {
      console.error(error);
    }
  };



  //입력값의 변화를 저장함
  handleInputChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(''); // 상태 업데이트 확인
      }
    );
  };

  //저장 버튼을 눌렀을 때 실행할 함수 (저장!!)
  handleSaveButton = async (e) => {
    e.preventDefault();

    const { selectedCompanyCards, selectedRead, companyCards } = this.state;
    /* 필수값 유효성 검사 */
    if (!selectedCompanyCards.co_cd) {
      this.DouzoneContainer.current.handleSnackbarOpen('회사코드를 입력해 주세요.', 'error');
      return;
    }
    if (!selectedCompanyCards.co_nm) {
      this.DouzoneContainer.current.handleSnackbarOpen('회사명을 입력해 주세요.', 'error');
      return;
    }
    if (selectedCompanyCards.co_cd.length <= 3 || selectedCompanyCards.co_cd.length >= 5) {
      this.DouzoneContainer.current.handleSnackbarOpen("회사코드는 4자이어야 합니다. ex) 1000", 'error');
      return;
    }
    if (companyCards.includes(selectedCompanyCards.co_cd)) {
      this.DouzoneContainer.current.handleSnackbarOpen('이미 존재합니다.', 'error');
      return;
    }


    if (selectedRead === "Y") {
      try {
        const response = await post("/company/save", selectedCompanyCards);
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

      } catch (error) {
        console.error(error);
        //같은 회사 코드 등 입력했을경우
        this.DouzoneContainer.current.handleSnackbarOpen('회사 등록중 에러가 발생했습니다.', 'error');
      }
    } else {
      try {
        const response = await update("/company/update", selectedCompanyCards);
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 수정이 완료됐습니다', 'success');
      } catch (error) {
        console.log(error);
      }
    }
    this.getCardList();
    this.handleResetBasicInfo();
  };

  //삭제 버튼을 눌렀을 때 실행할 함수
  handleDeleteButton = async (e) => {
    e.preventDefault();
    const { selectedCompanyCards, companyCards, selectedchecked } = this.state;
    //필드데이터 // 회사 코드만 있으면 된다.

    try {
      if (selectedchecked.length > 1) {
        // const response = await del("/company/delete/${selectedCompanyCards.co_cd}");
        const response = await del("/company/delete",
          { data: selectedchecked }
        );

        const newCardList = companyCards.filter(
          (item) => !selectedchecked.some((checkedItem) => checkedItem.co_cd === item.co_cd)
        );
        this.setState({
          companyCards: newCardList,
          selectedCompanyCards: '',
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          content: newCardList,
          selectedchecked: [], // 선택된 체크박스 초기화
          selectAllCheckbox: false,
        });
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보가 정상적으로 삭제되었습니다.', 'success');

      } else if (selectedchecked.length == 1) {
        // 서버에 DELETE 요청 보내기
        const response = await del(`/company/delete/${selectedCompanyCards.co_cd}`);

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
        this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 삭제가 완료됐습니다', 'success');
      }
    }

    catch (error) {
      console.error(error);
      this.DouzoneContainer.current.handleSnackbarOpen('회사 정보 삭제중 에러가 발생했습니다.', 'error');
    }
    this.handleCloseModal();
  };

  //우편주소 코드
  handlePostComplete = (data) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        adr_zp: data.zonecode,
        adr_inp: data.roadAddress,
        adr_inp: data.jibunAddress,

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
  handleNewButtonClick = () => {
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

  //서치 콜백  
  searchCallback = {
    handleCallBackData: (code) => {
      this.setState({ co_cd: code, use_yn: '' });
    },
  }

  /* 조회 했을 때 기능 */
  handleSearch = async () => {
    const { selectedCompanyCards, searchCom } = this.state;
    try {
      const queryString = `?co_cd=${this.state.co_cd || ""}&use_yn=${searchCom?.defaultUse || ""}`;
      const response = await getByQueryString(`/company/getSearchData${queryString}`);
      this.setState({
        selectedCompanyCards: response.data,
        content: response.data,

      });
    } catch (error) {
      console.log(error);
    }
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
      console.log('');
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
      })
  }

  handleResetBasicInfo = () => {

    this.setState({
      selectedCompanyCards: {
        co_cd: '',
        co_nm: '',
        co_nk: '',
        emp_nm: '',
        use_yn: '',
        lng: '',
        adm_cd: '',
        bz_type: '',
        bz_item: '',
        co_tel: '',
        co_fax: '',
        reg_nb: '',
        cp_ct: '',
        cp_no: '',
        adr_zp: '',
        adr_inp: '',
        adr_etc: '',
        est_dt: '',
        opn_dt: '',
        cls_dt: '',
        ceo_nm: '',
        res_nb: '',
        ac_per: '',
        ac_dt: '',
        acc_type: '',
      }
    });
  }



  //onChange핸들함수
  handleCoCdChange = (value, emp) => {
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        co_cd: value,
        emp_nm: emp,
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
    this.setState((prevState) => ({
      selectedCompanyCards: {
        ...prevState.selectedCompanyCards,
        est_dt: value,
      },
    }));
  };
  handleOpnDtChange = (value) => {
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

  handleDefaultUseChange = (value) => {
    this.setState((prevState) => ({
      searchCom: {
        ...prevState.searchCom,
        defaultUse: value,
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
          <Checkbox checked={this.state.selectAllCheckbox} onChange={() => this.handleToggleAllCheckboxes()} />
        </Card>
        <Box sx={{ overflowY: "auto", maxHeight: "550px" }}>
          {/* 스크롤바 영역 설정 */}
          <Grid container spacing={2}>
            {Array.isArray(this.state.content) && this.state.content.map((item, index) => (
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
                  <Checkbox
                    checked={item.checked || false}
                    onChange={() => this.handleToggleCheckbox(item.co_cd)}
                  />

                  <CardContent sx={{ paddingLeft: "3px", paddingRight: "1px", }}>
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
                      width: "80px",
                    }}
                  >
                    {/* item3 */}
                    <Typography variant="body2">
                      {item.emp_nm}
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
                      {item.cp_ct}
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
    // this.handleInputChange = this.handleInputChange.bind(this); //con의 인스턴스와 바인딩하기위해 사용
    // this.handleSaveButton = this.handleSaveButton.bind(this);



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
                handleDefaultUseChange={this.handleDefaultUseChange}
                handleSearch={this.handleSearch}
                callback={this.searchCallback}
                searchCom={this.state.searchCom}
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
                  emp_nm={this.state.emp_nm}
                  handleInputChangeReadOnly={this.handleInputChangeReadOnly}
                  // sco={this.state.companyCards} //카드리스트 sco
                  onPostComplete={this.handlePostComplete}
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

                  handleDeleteClick={this.handleDeleteClick}

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
