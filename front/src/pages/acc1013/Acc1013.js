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
      co_cd: '', //회사 코드
      co_nm: '', //회사 이름
      co_nk: '', //회사 약칭
      use_yn: '',
      lng: '',
      adm_cd: '',
      bz_type: '',
      bz_item: '',
      co_tel: '',
      co_tel2: '',
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
      domain: '',
      ac_per: '',
      ac_dt: '',
      acc_tp: '',
      url: '',
      sort: '',
      defaultLange: '',

      postcode: '', //우편번호 5자리
      roadAddress: '',
      jibunAddress: '', //지번 주소
      extraAddress: '', //나머지 주소

      companyCards: [], //카드리스트
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
    };
    this.DouzoneContainer = React.createRef();
  }

  //카드리스트 가져오기위해 componentDidMount로 시작하면 바로 미리 가져온다.
  componentDidMount() {
    this.fetchCompanyCards();
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
  handleCardClick = async (co_cd) => {
    const data = { co_cd };
    try {
      const response = await post("/company/selectCard", data);
      console.log(response);
      console.log("카드리스트 클릭됨!");
      this.setState({
        companyCardData: response.data,
        co_cd: response.data.co_cd,
        co_nm: response.data.co_nm,
        co_nk: response.data.co_nk,
        adm_cd: response.data.adm_cd,
        use_yn: response.data.use_yn,
        lng: response.data.lng,
        bz_type: response.data.bz_type,
        bz_item: response.data.bz_item,
        co_tel: response.data.co_tel,
        co_tel2: response.data.co_tel2,
        co_fax: response.data.co_fax,
        reg_nb: response.data.reg_nb,
        cp_ct: response.data.cp_ct,
        cp_no: response.data.cp_no,
        adr_zp: response.data.adr_zp,
        adr_inp: response.data.adr_inp,
        adr_etc: response.data.adr_etc,
        est_dt: response.data.est_dt,
        opn_dt: response.data.opn_dt,
        cls_dt: response.data.cls_dt,
        ceo_nm: response.data.ceo_nm,
        res_nb: response.data.res_nb,
        domain: response.data.domain,
        ac_per: response.data.ac_per,
        ac_dt: response.data.ac_dt,
        acc_tp: response.data.acc_tp,
        url: response.data.url,
        sort: response.data.sort,
        defaultLange: response.data.defaultLange,

        readonly: "true",
      });
      console.log("!!companyCardData!!" + this.state.companyCardData);

      //this.fetchCompanyCards();
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
  handleSaveButton = async (e, companyCardData) => {
    e.preventDefault();

    const {
      co_cd,      co_nm,      co_nk,      use_yn,      lng,      adm_cd,      bz_type,
      bz_item,      co_tel,      co_tel2,      co_fax,      reg_nb,      cp_ct,
      cp_no,      adr_zp,      adr_inp,      adr_etc,      est_dt,      opn_dt,
      cls_dt,      ceo_nm,      res_nb,      domain,      ac_per,      ac_dt,      acc_tp,
      url,      sort,      
      companyCards,    
    } = this.state;
    //필드데이터f
    const data = {
      co_cd,      co_nm,      co_nk,      use_yn,      lng,      adm_cd,      bz_type,      bz_item,
      co_tel,      co_tel2,      co_fax,      reg_nb,      cp_ct,      cp_no,      adr_zp,      adr_inp,
      adr_etc,      est_dt,      opn_dt,      cls_dt,      ceo_nm,      res_nb,      domain,      ac_per,
      ac_dt,      acc_tp,      url,      sort,
      companyCards,
    };

    try {
      if (companyCardData) {
        this.setState({
          co_cd: companyCardData.co_cd,
        });
        await post("/company/save", data);
        console.log("post이후" + JSON.stringify(companyCardData));
      } else {
        await post("/company/save", data);
      }
      this.DouzoneContainer.current.handleSnackbarOpen('회사 등록이 완료됐습니다', 'success');
      this.fetchCompanyCards(); //카드리스트 새로고침됨!
      console.log("저장을 누르기 전의 co_cd: " + this.state.co_cd);
    } catch (error) {
      console.log("저장을 눌렀을떄!!는??co_cd" + this.state.co_cd);
      console.error(error);
      this.DouzoneContainer.current.handleSnackbarOpen('회사 등록중 에러가 발생했습니다.', 'error');
      console.log("회사등록(DB) 중에 오류발생");
    }
  };

  //삭제 버튼을 눌렀을 때 실행할 함수
  handleDeleteButton = async (e) => {
    e.preventDefault();
    //필드데이터 // 회사 코드만 있으면 된다.
    const data = {
      co_cd: this.state.co_cd,
    };
    // Send data to server
    try {
      const response = await post("/company/delete", data);
      console.log(response);
      console.log("회사정보(DB) 삭제가 정상 실행");
      //this.setState({ showModal: false });
      this.DouzoneContainer.current.handleSnackbarOpen('회사 정보가 정상적으로 삭제되었습니다.', 'success');
      this.fetchCompanyCards();
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


  

  handleNewButtonClick = () =>{
    this.setState({
      co_cd:'',co_nm: '',co_nk: '',use_yn: '',lng: '',adm_cd: '',bz_type: '',
      bz_item: '',co_tel: '',co_tel2: '',co_fax: '',reg_nb: '',cp_ct: '',cp_no: '',
      adr_zp: '',adr_inp: '',adr_etc: '',est_dt: '',opn_dt: '',cls_dt: '',
      ceo_nm: '',res_nb: '',domain: '',ac_per: '',ac_dt: '',acc_tp: '',url: '',sort: '',
      companyCardData:null,
      readonly:false,    
    });
  };
  

  handleCoCdChange(value) {
    this.setState({ co_cd: value });
  }



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
                    border: "0.5px solid lightgrey",
                    marginRight: "2px",
                    display: "flex",
                  }}
                  onClick={() =>
                    this.handleCardClick(this.state.content[index].co_cd)
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
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("user!@!@!@!@"+JSON.stringify(user));
    const mauthList = user.mauthList;
    //일부러 생성자에서 바인딩, 이 메서드를 콜백으로 사용할때 올바른 컨텍스트가 유지됨
    //또한 컴포넌트의 상태, 다른 메서드에 안전하게 접근가능
    this.handleInputChange = this.handleInputChange.bind(this); //con의 인스턴스와 바인딩하기위해 사용
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCoCdChange = this.handleCoCdChange.bind(this);
   

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
                  {...this.state}
                  companyCardData={this.state.companyCardData}
                  onInputChange={this.handleInputChange}
                  handleSaveButton={this.handleSaveButton}
                  handleDeleteButton={this.handleDeleteButton}
                  handleCardClick={this.handleCardClick}
                  co_cd={this.state.co_cd}
                  handleInputChangeReadOnly={this.handleInputChangeReadOnly}
                  // sco={this.state.companyCards} //카드리스트 sco
                  onComplete={this.handlePostComplete}
                  // addOrUpdate={this.addOrUpdate} 사용X
                  onCoCdChange={this.handleCoCdChange}
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
