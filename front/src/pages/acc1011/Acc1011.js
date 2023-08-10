import React, { Component } from "react";
import { get, post, del, update } from "../../components/api_url/API_URL";
import CardList from "../../components/commons/CardList"; // CardList 컴포넌트 임포트
import Acc1011Presentation from "./Acc1011Presentation"; // Acc1011Presentation 컴포넌트 임포트
import { Card, CardContent, Checkbox, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import Acc1011Search from "./Acc1011Search";
import { Box } from "@mui/system";

const acc1011theme = createTheme({
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
          '&:hover $notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)', // 기본 테두리 색상으로 유지
          },
          '&.Mui-focused $notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)', // 기본 테두리 색상으로 유지
          },
          borderRadius: 0,
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
class Acc1011 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCards: [], // 카드리스트 저장할 빈 배열
      selectedDept: null, // 클릭한 부서 정보를 저장할 상태 변수
      contentArray: [], // 카드 안에 콘텐트정보를 담을 빈 배열
      content: [],
      selectedchecked:[],
      selectedCardIndex: null, // 선택한 카드의 인덱스
      newSelectAllCheckbox:"",

      postcode: "", //우편번호 찾기 저장할 상태 변수
      roadAddress: "",
      jibunAddress: "",

      showModal: false,
      selectAllCheckbox : false,

      //완료 확인
      complete: '',

      title: '부서관리',






    };
    this.DouzoneContainer = React.createRef();
  }

  componentDidMount() {
    get(`/depmanagement`)
      .then((response) => {
        this.setState({ departmentCards: response.data, selectedRead: "Y", content: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // 카드를 클릭했을때
  handleCardClick = async (dept_cd, index) => {
    console.log(dept_cd);

    try {
      const response = await post(`/depmanagement/getdept`, {
        dept_cd: dept_cd,
      });
      this.setState({
        selectedDept: response.data,
        selectedRead: "N",
        complete: '',
        selectedCardIndex: index, // 클릭한 카드의 인덱스 저장
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 추가 버튼
  handleNewButtonClick = () => {
    // selectedDept 상태를 빈 값으로 업데이트
    this.setState({
      selectedDept: null,
      selectedDept: {   
        dept_fg: "Y"
      }, //사용여부의 default를 사용 으로 설정해주기 위해서
      selectedRead: "Y",
      complete: '',
    });
  };

  //저장버튼
  handleSaveClick = async (e) => {
    e.preventDefault();
    const { selectedDept, selectedRead } = this.state;


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


    //삽입 기능
    // 선택한 부서가 있는지 확인하기 위해 selectedDept가 null이 아닌지 확인합니다.
    if (selectedRead === "Y") {

      try {

        const response = await post(`/depmanagement/adddept`, selectedDept);
        console.log("서버 응답:", response.data);

        this.setState((prevState) => ({
          // 추가된 부서 정보를 departmentCards에 추가.
          departmentCards: [...prevState.departmentCards, response.data],
          content: [...prevState.departmentCards, response.data],
          // 선택한 부서 정보를 초기화합니다.
          selectedDept: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
        }));
        this.DouzoneContainer.current.handleSnackbarOpen('부서 등록이 완료됐습니다', 'success');
      } catch (error) {
        console.log(error);
        this.DouzoneContainer.current.handleSnackbarOpen('부서 등록 에러', 'error');
      }
    } else {

      try {
        console.log(selectedDept);
        const response = await update(`/depmanagement/updatedept`, selectedDept);
        console.log("서버 응답:", response.data);
        this.DouzoneContainer.current.handleSnackbarOpen('부서 수정이 완료됐습니다', 'success');



      } catch (error) {
        console.log(error);
      }
    }
  };
 
   // 휴지통 눌렀을때,삭제
  handleDeleteClick = async (e) => {
    e.preventDefault();
    const { selectedDept, departmentCards, selectedchecked } = this.state;
  
    try {
      if (selectedchecked.length > 0) {
        const response = await del(
          `/depmanagement/deletedept`,
          { data: selectedchecked }
        );
        console.log(response.data);
        
        const newCardList = departmentCards.filter(
          (item) => !selectedchecked.some((checkedItem) => checkedItem.dept_cd === item.dept_cd)
        );
  
        this.setState({
          departmentCards: newCardList,
          content: newCardList,
          selectedDept: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          selectedchecked: [], // 선택된 체크박스 초기화
          newSelectAllCheckbox:"",
        });
        this.DouzoneContainer.current.handleSnackbarOpen('부서 삭제가 완료됐습니다', 'success');
      } else {
        // 서버에 DELETE 요청 보내기
        const response = await del(
          `/depmanagement/deletedept/${selectedDept.dept_cd}`
        );
        console.log("서버 응답", response.data);
        
        // 서버 응답에 따라 삭제된 부서 정보를 departmentCards에서 제거
        const newCardList = departmentCards.filter(
          (item) => item.dept_cd !== selectedDept.dept_cd
        );
  
        this.setState({
          departmentCards: newCardList,
          content: newCardList,
          selectedDept: null,
          postcode: "",
          roadAddress: "",
          jibunAddress: "",
          selectedchecked: [], // 선택된 체크박스 초기화
        });
        this.DouzoneContainer.current.handleSnackbarOpen('부서 삭제가 완료됐습니다', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  
    this.handleCloseModal();
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

  //우편번호와 주소를 업데이트(부서주소)
  handlePostComplete = (data) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_addr1: data.zonecode,
        dept_addr2: data.address,
      },
    }));
  };

  // 입력된 값을 dept_fg 필드에 저장(사용여부)
  handleDeptFgChange = (value) => {
    this.setState((prevState) => ({
      selectedDept: {
        ...prevState.selectedDept,
        dept_fg: value,
      },
    }));
  };

  // 모달 열기
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  // 모달 닫기
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  // 조회 조건으로 받은 부서 카드리스트
  handleDepartmentCards = (departmentCards) => {
    this.setState({ departmentCards, content: departmentCards });
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
 handleToggleCheckbox = (dept_cd) => {
  this.setState(
    (prevState) => {
      const updatedContent = prevState.content.map((item) =>
        item.dept_cd === dept_cd ? { ...item, checked: !item.checked } : item
      );
      const selectedchecked = updatedContent.filter((item) => item.checked);
      
      return { content: updatedContent, selectedchecked: selectedchecked };
    },
    () => {
      console.log(this.state.selectedchecked);
    }
  );
};


  // 부서 카드리스트를 그려줄 함수
  onCardItemDraw = () => {
    const { selectedDepartments } = this.state;
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
              부서 수 : {this.state.content.length}
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
                    this.handleCardClick(this.state.content[index].dept_cd, index) // 클릭한 카드의 인덱스 전달
                  }
                >
                   <Checkbox
                  checked={item.checked || false}
                  onChange={() => this.handleToggleCheckbox(item.dept_cd)}
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
                      {item.dept_st}
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
                      {item.dept_nm}
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
                      {item.dept_cd}
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
    const { departmentCards, selectedDept, selectedRead, showModal, complete } = this.state;

    return (
      <ThemeProvider theme={acc1011theme}>
        <DouzoneContainer ref={this.DouzoneContainer}
          title={this.state.title}
          delete={this.handleOpenModal}
          openDeleteModal={this.state.showModal}
          handleClose={this.handleCloseModal}
          handleConfirm={this.handleDeleteClick}
          showDelete={''}
          message="정말로 부서 정보를 삭제하시겠습니까?"
          >
          <Acc1011Search deptSearch={this.handleDepartmentCards}></Acc1011Search>
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
                <CardList
                  handleCardClick={this.handleCardClick}
                  handleNewButtonClick={this.handleNewButtonClick}
                  onCardItemDraw={this.onCardItemDraw}
                  content={this.state.content}
                ></CardList>

                <Acc1011Presentation
                  selectedDept={selectedDept}
                  selectedRead={selectedRead}
                  open={showModal}
                  complete={complete}
                  handleCloseModal={this.handleCloseModal}
                  handleOpenModal={this.handleOpenModal}



                  handleCoCdChange={this.handleCoCdChange}
                  handleDeptCdChange={this.handleDeptCdChange}
                  handleDeptStChange={this.handleDeptStChange}
                  handleDeptNmChange={this.handleDeptNmChange}
                  handleDeptTrChange={this.handleDeptTrChange}
                  handleDeptFgChange={this.handleDeptFgChange}
                  handleDeleteClick={this.handleDeleteClick}
                  handlePostComplete={this.handlePostComplete}
                ></Acc1011Presentation>
              </div>
            </div>
          </form>
        </DouzoneContainer>
      </ThemeProvider>
    );
  }
}

export default Acc1011;