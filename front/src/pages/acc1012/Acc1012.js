import React, { Component } from "react";

import Acc1012Con from "./Acc1012Con";
import Acc1012Header from "./Acc1012Header";
import Acc1012Trade from "./Acc1012Trade";
import Acc1012TdManage from "./Acc1012TdManage";

import { get, post, del, update, getByQueryString } from "../../components/api_url/API_URL";
import CardList from "../../components/commons/CardList.js";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer.js";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
// import DeleteDialog from "../../components/commons/DeleteDialog";


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

      postcode: "", /* 우편번호 찾기 저장할 상태 변수 */
      roadAddress: "",
      jibunAddress: "",
      title: '일반거래처 등록',
      showModal: false,

      tr_cd: '',
      tr_nm: '',
      tr_fg: '',
      searchResults: [],
      showAcc1012Con: true,
      showAcc1012Trade: false,
      showAcc1012TdManage: false,

    };
  }

  handleMoveBasic = () => {
    this.setState({
      showAcc1012Con: true,
      showAcc1012Trade: false,
      showAcc1012TdManage: false,
    });
    console.log("handleMoveBasic 실행됨 !!!");
  };

  handleMoveTrade = () => {
    this.setState({
      showAcc1012Con: false,
      showAcc1012Trade: true,
      showAcc1012TdManage: false,
    });
    console.log("handleMoveTrade 실행됨 !!!")
  }

  handleMoveTdManage = () => {
    this.setState({
      showAcc1012Con: false,
      showAcc1012Trade: false,
      showAcc1012TdManage: true,
    });
    console.log("handleMoveTdManage 실행됨 !!!")
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
    this.forRender();
  }
  forRender = () => {
    (async () => {
      try {
        const response = await get('/tradeManagement');

        const stradeCards = response.data.map(card => ({
          ...card,
          newTrade: 'Y',
        }));

        this.setState({ stradeCards });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
    this.firstTradeCard();
  }

  /* 카드를 클릭했을때 */
  handleCardClick = async (tr_cd) => {
    console.log(tr_cd);

    try {
      const response = await post(`/tradeManagement/getst`, {
        tr_cd: tr_cd,

      });
      this.setState({
        selectedSt: {
          ...response.data,
          newTrade: 'N'
        }

      });
    } catch (error) {
      console.log(error);
    }
  };

  firstTradeCard = () => {
    // 기존 selectedSt의 모든 필드 값을 null로 초기화하고 newEmp를 'Y'로 설정

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
        newTrade: 'Y'

      }
    });
  }

  /* 추가 버튼 */
  addCard = () => {
    /* selectedSt 상태를 빈 값으로 업데이트 */

    this.firstTradeCard()
    this.setState({ complete: '', errorMessage: '' })

  };

  handleSaveClick = async (e) => {
    e.preventDefault();
    const { selectedSt } = this.state;
    console.log("handleSaveClick   실행")
    /* 필수값 유효성 검사 */
    if (!selectedSt.tr_fg) {
      alert("거래처구분을 선택해 주세요.");
      return;
    }
    if (!selectedSt.tr_nm) {
      alert("거래처명을 입력해 주세요.");
      return;
    }
    // 거래처약칭이 비어있는지 확인합니다.
    if (!selectedSt.tr_al) {
      alert("거래처약칭을 입력해 주세요.");
      return;
    }
    console.log('.............' + selectedSt.newTrade)
    if (selectedSt.newTrade === 'Y') {
      try {
        const response = await post(`/tradeManagement/insertSt`, selectedSt);

        alert("저장 되었습니다!")

        this.setState((prevState) => ({
          /* 추가된 거래처 정보를 stradeCards에 추가 */
          stradeCards: [...prevState.stradeCards, response.data],
          /* 선택한 거래처 정보를 초기화 합니다 */
          selectedSt: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await update('/tradeManagement/updateSt', selectedSt);
        console.log(response.data);
        this.setState({ complete: '수정되었습니다.' })
        alert("수정 되었습니다!");
      } catch (error) {
        console.log('사원 수정 에러 : ' + error)
      }

    }
  };

  /* 거래처 관리 DELETE , 삭제 버튼 */
  handleDeleteClick = async () => {
    const { selectedSt, stradeCards } = this.state;

    try {
      /* 서버에 DELETE 요청 보내기 */
      const response = await del(
        `/tradeManagement/deleteSt/${selectedSt.tr_cd}`
      );
      console.log("서버 응답", response.data);

      const newCardList = stradeCards.filter(
        (item) => item.tr_cd !== selectedSt.tr_cd
      );

      this.setState({
        stradeCards: newCardList,
        selectedSt: null,
        postcode: "",
        roadAddress: "",
        jibunAddress: "",
      });
    } catch (error) {
      console.log(error);
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

    console.log("handleSearch 기능 실행!!");
    try {
      const queryString = `?tr_cd=${searchSt.tr_cd || ""}&tr_nm=${searchSt.tr_nm || ""}&tr_fg=${searchSt.tr_fg || ""}`;
      const response = await getByQueryString(`/tradeManagement/getSearchData${queryString}`);
      console.log(response.data);
      this.setState({
        stradeCards: response.data,


      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { stradeCards, selectedSt, searchSt, showAcc1012Con, showAcc1012Trade, showAcc1012TdManage } = this.state;

    return (

      <ThemeProvider theme={Acc1012theme} >
        <div style={{ display: "flex", flexDirection: "column" }}>

          <DouzoneContainer


            title={this.state.title}
            delete={this.handleOpenModal}
            openDeleteModal={this.state.showModal}
            handleClose={this.handleCloseModal}
            handleConfirm={this.handleDeleteClick}
            showDelete={''}
            message="정말로 거래처 정보를 삭제하시겠습니까?"
          >

            <Acc1012Header
              searchSt={searchSt}
              handleSc_Tr_fgChange={this.handleSc_Tr_fgChange}
              handleSc_Tr_cdChange={this.handleSc_Tr_cdChange}
              handleSc_Tr_nmChange={this.handleSc_Tr_nmChange}
              handleUwChange={this.handleUwChange}

              handleSearch={this.handleSearch}
            >

            </Acc1012Header>
            <form onSubmit={this.handleSaveClick}>

              <div style={{ display: "flex" }}>

                <CardList
                  content={stradeCards}
                  handleCardClick={this.handleCardClick}
                  handleNewButtonClick={this.addCard}
                ></CardList>

                {showAcc1012Con && <Acc1012Con
                  selectedSt={selectedSt}
                  showAcc1012Con={showAcc1012Con}


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

                ></Acc1012Con>}
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
          </DouzoneContainer>
        </div>
      </ThemeProvider>
    );
  }

}
export default Acc1012;