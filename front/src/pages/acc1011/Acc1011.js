import React, { Component } from "react";
import { get, post, del } from "../../components/api_url/API_URL";
import CardList from "../../components/commons/CardList"; // CardList 컴포넌트 임포트
import Acc1011Presentation from "./Acc1011Presentation"; // Acc1011Presentation 컴포넌트 임포트
import { ThemeProvider, createTheme } from "@mui/material";

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
class Acc1011 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCards: [], // 카드리스트 저장할 빈 배열
      selectedDept: null, // 클릭한 부서 정보를 저장할 상태 변수
      contentArray: [], // 카드 안에 콘텐트정보를 담을 빈 배열

      postcode: "", //우편번호 찾기 저장할 상태 변수
      roadAddress: "",
      jibunAddress: "",

      showModal: false,


    };
  }

  componentDidMount() {
    get(`/depmanagement`)
      .then((response) => {
        this.setState({ departmentCards: response.data, selectedRead: "Y" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // 카드를 클릭했을때
  handleCardClick = async (dept_cd) => {
    console.log(dept_cd);

    try {
      const response = await post(`/depmanagement/getdept`, {
        dept_cd: dept_cd,
      });
      this.setState({
        selectedDept: response.data,
        selectedRead: "N",
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
      selectedRead: "Y",
    });
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
  handleDeleteClick = async (e) => {
    e.preventDefault();
    const { selectedDept, departmentCards } = this.state;

    try {
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
        selectedDept: null,
        postcode: "",
        roadAddress: "",
        jibunAddress: "",
      });
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
  render() {
    const { departmentCards, selectedDept, selectedRead, showModal } = this.state;

    return (
      <ThemeProvider theme={acc1011theme}>
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
                content={departmentCards}
                handleCardClick={this.handleCardClick}
                handleNewButtonClick={this.handleNewButtonClick}
              ></CardList>

              <Acc1011Presentation
                selectedDept={selectedDept}
                selectedRead={selectedRead}
                open={showModal}
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
      </ThemeProvider>
    );
  }
}

export default Acc1011;