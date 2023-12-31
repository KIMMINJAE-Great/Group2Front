import React, { Component } from "react";

import Acc1012BasicInfo from "./Acc1012BasicInfo";
import Acc1012Search from "./Acc1012Search";
import Acc1012Trade from "./Acc1012Trade";
import Acc1012TdManage from "./Acc1012TdManage";

import { get, post, del, update, getByQueryString } from "../../components/api_url/API_URL";
import CardList from "../../components/commons/CardList.js";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer.js";
import { createTheme, Card, CardContent, Checkbox, Typography, Box, Grid, } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const Acc1012theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '15px',
          fontWeight: 'bold',
          height: '15px',
          lineHeight: '15px'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "30px",
          backgroundColor: "#FBFBFB",
          color: "black",
        }
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
        fullWidth: true,
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {

        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover $notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&.Mui-focused $notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover ': {
            cursor: 'pointer',
            border: '1px solid #0f8bff',
          }, '&.noHoverEffect:hover': {
            cursor: 'auto',
            border: 'none',
          },
        },
      },
    }

  },
});
class Acc1012 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stradeCards: [], /* 카드리스트 저장할 빈 배열 */
      selectedSt: null,    /* 거래처 단일 행 정보 */
      searchSt: null, /* 거래처 검색 행 정보 */
      selectedchecked: [], /* 체크박스 선택한 배열의 정보 */

      postcode: "", /* 우편번호 찾기 저장할 상태 변수 */
      roadAddress: "",
      jibunAddress: "",
      title: '일반거래처 등록',
      showModal: false,
      content: [],
      tr_cd: '',
      tr_nm: '',
      tr_fg: '',
      searchResults: [],
      showAcc1012Con: true,
      showAcc1012Trade: false,
      showAcc1012TdManage: false,

      selectedCardIndex: null, // 선택한 카드의 인덱스
      newSelectAllCheckbox: "",

    };
    this.DouzoneContainer = React.createRef();
  }

  handleMoveBasic = () => {
    this.setState({
      showAcc1012Con: true,
      showAcc1012Trade: false,
      showAcc1012TdManage: false,
    });
  };

  handleMoveTrade = () => {
    this.setState({
      showAcc1012Con: false,
      showAcc1012Trade: true,
      showAcc1012TdManage: false,
    });
  }

  handleMoveTdManage = () => {
    this.setState({
      showAcc1012Con: false,
      showAcc1012Trade: false,
      showAcc1012TdManage: true,
    });
  }

  // 모달 열기
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  // 모달 닫기
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    get(`/tradeManagement`)
      .then((response) => {
        this.setState({ stradeCards: response.data, newTrade: "Y", content: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* 카드를 클릭했을때 */
  handleCardClick = async (tr_cd, index) => {

    try {
      const response = await post(`/tradeManagement/getst`, {
        tr_cd: tr_cd,
      });

      this.setState({
        selectedSt: response.data,
        newTrade: "N",
        complete: '',
        selectedCardIndex: index, // 클릭한 카드의 인덱스 저장

      });
    } catch (error) {
      console.log(error);
    }
  };

  firstTradeCard = () => {

    this.setState({
      selectedSt: {
        tr_fg: '',
        tr_nm: '',
        tr_cd: '',
        tr_al: '',
        reg_nb: '',

        tr_na: '',
        re_id: '',
        tr_ceo_nm: '',
        tr_bt: '',
        tr_bc: '',

        tr_ps_cd: '',
        tr_ad1: '',
        tr_ad2: '',
        tr_pn: '',
        tr_fn: '',

        tr_hp: '',
        tr_email: '',
        tr_mn_cd: '',
        tr_ct_cd: '',
        newTrade: "Y"

      }
    });
  }

  /* 추가 버튼 */
  addCard = () => {
    /* selectedSt 상태를 빈 값으로 업데이트 */

    this.firstTradeCard()
    this.setState({ complete: '', errorMessage: '', newTrade: "Y" })

  };

  handleSaveClick = async (e) => {
    e.preventDefault();
    const { selectedSt, newTrade } = this.state;
    /* 필수값 유효성 검사 */
    if (!selectedSt.tr_fg) {
      this.DouzoneContainer.current.handleSnackbarOpen('거래처구분을 선택해 주세요.', 'error');
      return;
    }
    if (!selectedSt.tr_nm) {
      this.DouzoneContainer.current.handleSnackbarOpen('거래처명을 입력해 주세요.', 'error');
      return;
    }
    // 거래처약칭이 비어있는지 확인합니다.
    if (!selectedSt.tr_al) {
      this.DouzoneContainer.current.handleSnackbarOpen('거래처 약칭을 입력해 주세요.', 'error');
      return;
    }
    if (newTrade === 'Y') {
      try {
        const response = await post(`/tradeManagement/insertSt`, selectedSt);

        this.DouzoneContainer.current.handleSnackbarOpen('거래처 등록이 완료되었습니다.', 'success');
        this.setState((prevState) => ({
          /* 추가된 거래처 정보를 stradeCards에 추가 */
          stradeCards: [...prevState.stradeCards, response.data],
          /* 선택한 거래처 정보를 초기화 합니다 */
          selectedSt: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          content: [...this.state.stradeCards, response.data]
        }));
      } catch (error) {
        console.log(error);
        this.DouzoneContainer.current.handleSnackbarOpen('거래처 등록중 에러가 발생했습니다.', 'error');
      }
    } else {
      try {
        const response = await update('/tradeManagement/updateSt', selectedSt);
        //this.setState({ complete: '수정되었습니다.' })
        this.DouzoneContainer.current.handleSnackbarOpen('거래처 수정이 완료되었습니다.', 'success');

      } catch (error) {
        this.DouzoneContainer.current.handleSnackbarOpen('거래처 수정중 에러가 발생했습니다.', 'error');
      }

    }
  };

  /* 거래처 관리 DELETE , 삭제 버튼 */
  handleDeleteClick = async () => {
    const { selectedSt, stradeCards, selectedchecked } = this.state;

    try {
      /* 서버에 DELETE 요청 보내기 */
      if (selectedchecked.length > 1) {
        const response = await del(
          `/tradeManagement/deleteSt`,
          { data: selectedchecked }
        );

        const newCardList = stradeCards.filter(
          (item) => !selectedchecked.some((checkedItem) => checkedItem.tr_cd === item.tr_cd)
        );

        this.setState({
          stradeCards: newCardList,
          selectedSt: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          content: newCardList,
          selectedchecked: [], // 선택된 체크박스 초기화
          selectAllCheckbox: false,
        });
        this.DouzoneContainer.current.handleSnackbarOpen('거래처 정보가 정상적으로 삭제되었습니다.', 'success');
      } else if (selectedchecked.length == 1) {
        // 서버에 DELETE 요청 보내기
        const response = await del(
          `/tradeManagement/deleteSt/${selectedSt.tr_cd}`
        );

        // 서버 응답에 따라 삭제된 부서 정보를 departmentCards에서 제거
        const newCardList = stradeCards.filter(
          (item) => item.tr_cd !== selectedSt.tr_cd
        );

        this.setState({
          stradeCards: newCardList,
          selectedSt: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          content: newCardList,
        });
        this.DouzoneContainer.current.handleSnackbarOpen('거래처 정보 삭제가 완료됐습니다', 'success');
      }
    }
    catch (error) {
      console.log(error);
      this.DouzoneContainer.current.handleSnackbarOpen('거래처 정보 삭제중 에러가 발생했습니다.', 'error');
    }
    this.handleCloseModal();
  };



  /* 변경된 값 필드에 저장 => 거래처구분 */
  handleTr_fgChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_fg: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 거래처명 */
  handleTr_nmChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_nm: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 거래처코드 */
  handleTr_cdChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_cd: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 거래처약칭 */
  handleTr_alChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_al: value,
      },
    }));
  }
  /* 변경된 값 필드에 저장 => 사업자등록번호 */
  handleReg_nbChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        reg_nb: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 주민등록번호(국적) */
  handleTr_naChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_na: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 주민등록번호(숫자) */
  handleRe_idChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        re_id: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 대표자명 */
  handleTr_ceo_nmChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_ceo_nm: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 업태 */
  handleTr_btChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_bt: value,
      },
    }));
  };/* 변경된 값 필드에 저장 => 업종 */
  handleTr_bcChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_bc: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 우편번호 (우편번호 + 기본주소)  */
  handlePostComplete = (data) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_ps_cd: data.zonecode,
        tr_ad1: data.address,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 우편번호 (상세주소)  */
  handleTr_ad2Change = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_ad2: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 전화번호 */
  handleTr_pnChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_pn: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 팩스번호 */
  handleTr_fnChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_fn: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 홈페이지 */
  handleTr_hpChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_hp: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 메일주소 */
  handleTr_emailChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_email: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 주류코드 */
  handleTr_mn_cdChange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_mn_cd: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 국가코드 */
  handleTr_ct_cdchange = (value) => {
    this.setState((inputState) => ({
      selectedSt: {
        ...inputState.selectedSt,
        tr_ct_cd: value,
      },
    }));
  };
  /* 아래는 SEARCH 에 필요한 값들 this.setState */
  /* 변경된 값 필드에 저장 => 거래처 구분 */
  handleSc_Tr_fgChange = (value) => {
    this.setState((inputState) => ({
      searchSt: {
        ...inputState.searchSt,
        tr_fg: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 거래처 코드 */
  handleSc_Tr_cdChange = (value) => {
    this.setState((inputState) => ({
      searchSt: {
        ...inputState.searchSt,
        tr_cd: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 거래처명 */
  handleSc_Tr_nmChange = (value) => {
    this.setState((inputState) => ({
      searchSt: {
        ...inputState.searchSt,
        tr_nm: value,
      },
    }));
  };
  /* 변경된 값 필드에 저장 => 사용여부 */
  handleUwChange = (value) => {
    this.setState((inputState) => ({
      searchSt: {
        ...inputState.searchSt,
        useYN: value,
      },
    }));
  };

  /* 조회 했을 때 기능 */
  handleSearch = async () => {
    const { searchSt } = this.state;

    try {
      const queryString = `?tr_cd=${this.state.tr_cd || searchSt.tr_cd || ""}&tr_nm=${searchSt.tr_nm || ""}&tr_fg=${searchSt.tr_fg || ""}`;
      const response = await getByQueryString(`/tradeManagement/getSearchData${queryString}`);
      this.setState({
        stradeCards: response.data,
        content: response.data,

      });
    } catch (error) {
      console.log(error);
    }
  };

  //서치 콜백  
  searchCallback = {
    handleCallBackData: (code) => {
      this.setState({ tr_cd: code, searchSt: "", tr_fg: "" }, () => { console.log("") });
    },
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
      console.log('');
    });
  };
  // 체크박스 토글 처리하는 함수
  handleToggleCheckbox = (tr_cd) => {
    this.setState(
      (prevState) => {
        const updatedContent = prevState.content.map((item) =>
          item.tr_cd === tr_cd ? { ...item, checked: !item.checked } : item
        );
        const selectedchecked = updatedContent.filter((item) => item.checked);

        return { content: updatedContent, selectedchecked: selectedchecked };
      },
      () => {
        console.log('');
      }
    );
  };
  // 거래처 카드리스트를 그려줄 함수
  onCardItemDraw = () => {

    return (
      <div>
        <Card
          style={{ backgroundColor: "#ECECEC", marginBottom: "5px", height: '50px' }}
          class="noHoverEffect"
        >
          <CardContent>
            <Checkbox checked={this.state.selectAllCheckbox} onChange={() => this.handleToggleAllCheckboxes()} />
            <Typography variant="caption">
              <span style={{ fontWeight: 'bold' }}>거래처</span>{" "}
              <span style={{ color: 'blue', fontWeight: 'bold' }}>{this.state.content.length}</span>{" "}
              <span style={{ fontWeight: 'bold' }}>건</span>

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
                    this.handleCardClick(this.state.content[index].tr_cd, index)
                  }
                >
                  <Checkbox
                    checked={item.checked || false}
                    onChange={() => this.handleToggleCheckbox(item.tr_cd)}
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
                      {item.tr_cd + '.'}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "90px",
                        maxWidth: "90px",
                        color: '#a0a0a0'
                      }}
                    >
                      {item.reg_nb}
                    </Typography>
                    <div> </div>
                  </CardContent>
                  <CardContent
                    style={{
                      marginLeft: "0px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      minWidth: "100px",
                    }}
                  >
                    {/* item3 */}
                    <Typography variant="body2">
                      {item.tr_nm}
                    </Typography>
                    {/* item4 */}
                    <Typography variant="body2"
                      style={{
                        color: '#a0a0a0'
                      }}>
                      {'/' + item.tr_fg}
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
    const { stradeCards, selectedSt, searchSt, showAcc1012Con, showAcc1012Trade, showAcc1012TdManage, newTrade } = this.state;

    return (

      <ThemeProvider theme={Acc1012theme} >
        <div style={{ display: "flex", flexDirection: "column" }}>

          <DouzoneContainer

            ref={this.DouzoneContainer}
            title={this.state.title}
            delete={this.handleOpenModal}
            openDeleteModal={this.state.showModal}
            handleClose={this.handleCloseModal}
            handleConfirm={this.handleDeleteClick}
            showDelete={''}
            message="정말로 거래처 정보를 삭제하시겠습니까?"
          >

            <Acc1012Search
              searchSt={searchSt}
              handleSc_Tr_fgChange={this.handleSc_Tr_fgChange}
              handleSc_Tr_cdChange={this.handleSc_Tr_cdChange}
              handleSc_Tr_nmChange={this.handleSc_Tr_nmChange}

              handleUwChange={this.handleUwChange}

              handleSearch={this.handleSearch}
              callback={this.searchCallback}
            >

            </Acc1012Search>

            <div style={{ display: 'flex' }}>
              <CardList
                onCardItemDraw={this.onCardItemDraw}
                handleCardClick={this.handleCardClick}
                handleNewButtonClick={this.addCard}
              ></CardList>

              <form onSubmit={this.handleSaveClick}>

                <div style={{ display: "flex" }}>



                  {showAcc1012Con && <Acc1012BasicInfo
                    selectedSt={selectedSt}
                    showAcc1012Con={showAcc1012Con}
                    newTrade={newTrade}


                    handleTr_fgChange={this.handleTr_fgChange}
                    handleTr_nmChange={this.handleTr_nmChange}
                    handleTr_cdChange={this.handleTr_cdChange}
                    handleTr_alChange={this.handleTr_alChange}
                    handleReg_nbChange={this.handleReg_nbChange}

                    handleTr_naChange={this.handleTr_naChange}
                    handleRe_idChange={this.handleRe_idChange}
                    handleTr_ceo_nmChange={this.handleTr_ceo_nmChange}
                    handleTr_btChange={this.handleTr_btChange}
                    handleTr_bcChange={this.handleTr_bcChange}

                    handlePostComplete={this.handlePostComplete}
                    handleTr_ad2Change={this.handleTr_ad2Change}
                    handleTr_hpChange={this.handleTr_hpChange}
                    handleTr_pnChange={this.handleTr_pnChange}
                    handleTr_fnChange={this.handleTr_fnChange}


                    handleTr_emailChange={this.handleTr_emailChange}
                    handleTr_mn_cdChange={this.handleTr_mn_cdChange}
                    handleTr_ct_cdchange={this.handleTr_ct_cdchange}

                    handleSearch={this.handleSearch}

                    handleSaveClick={this.handleSaveClick}

                    handleMoveBasic={this.handleMoveBasic}
                    handleMoveTrade={this.handleMoveTrade}
                    handleMoveTdManage={this.handleMoveTdManage}

                    handleDeleteClick={this.handleDeleteClick}

                  ></Acc1012BasicInfo>}
                  {showAcc1012Trade && <Acc1012Trade
                    handleMoveBasic={this.handleMoveBasic}
                    handleMoveTdManage={this.handleMoveTdManage}
                  />}
                  {showAcc1012TdManage && <Acc1012TdManage
                    handleMoveBasic={this.handleMoveBasic}
                    handleMoveTrade={this.handleMoveTrade}
                    handleMoveTdManage={this.handleMoveTdManage} />}







                </div>
              </form>
            </div>
          </DouzoneContainer>
        </div>
      </ThemeProvider>
    );
  }

}
export default Acc1012;