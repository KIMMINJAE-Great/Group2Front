import {
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
    Snackbar,
    Alert,
    Slide,
} from "@mui/material";
import profile from "../../images/profile.png";
import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, height } from "@mui/system";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import acc1010 from "./acc1010.css";

import { BrowserRouter as Router, Route } from 'react-router-dom';
//import PrivateRoute from './components/routes/PrivateRoute';

import { Switch } from 'react-router-dom';

import Acc1010Basic from "./Acc1010Basic";

import { Link, NavLink, Redirect } from "react-router-dom/cjs/react-router-dom";
import { get, post, update, del } from "../../components/api_url/API_URL";

import Acc1010Mauth from "./Acc1010Mauth";
import CardList from "../../components/commons/CardList";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import Acc1010Search from "./Acc1010Search";
import { queryByAttribute } from "@testing-library/react";
import { getByQueryString } from "../../components/api_url/API_URL";
const acc1010theme = createTheme({
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
                root: {  // 모든 Grid 태그에 적용하려면 root를 사용하세요.
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
class Acc1010 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),

            // 사원 단일 정보
            selectedCard: '',
            //모든 사원 정보
            employeeCards: [],

            content: [],

            //모달
            showModal: false,

            //완료 확인
            complete: '',

            title: '사원관리',
            mauth: [],

            errorMessage: '',

        };
        this.DouzoneContainer = React.createRef();
    }

    //  Acc1010이 렌더링 되기전에 CardList에 담을 사원들의 정보를 가져옴
    componentDidMount() {
        this.forRender();
    }
    // 재사용 하기위해 componenetDidMount에서 함수로 분리
    forRender = () => {
        (async () => {
            try {
                const response = await get('/emp/cardlist');

                // Modify each employee card to include the 'newEmp' property
                const employeeCards = response.data.map(card => ({
                    ...card,
                    newEmp: 'Y',
                }));

                this.setState({ employeeCards, content: response.data });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        })();
        this.firstEmpCard('');
    }
    // Acc1010Basic의 내용을 다 비움
    addCard = () => {
        this.firstEmpCard()
        this.setState({ complete: '', errorMessage: '' })
    }

    //  주소 찾기
    handlePostComplete = (data) => {
        console.log(data)

        this.setState(prevState => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_post: data.zonecode,
                emp_add: data.address,
            }
        }));

    }

    // 사원정보 add & update 기능

    addOrUpdate = async (e) => {
        e.preventDefault();
        const { selectedCard } = this.state;

        //신규 사원 등록
        if (selectedCard.newEmp === 'Y') {
            console.log("....................empregiser : " + selectedCard)
            try {
                const response = await post('/emp/register', selectedCard);
                this.setState({
                    employeeCards: [...this.state.employeeCards, response.data],
                    content: [...this.state.employeeCards, response.data]
                });
                //this.setState({ complete: '완료되었습니다.' })
                this.DouzoneContainer.current.handleSnackbarOpen('사원 등록이 완료되었습니다.', 'success');
            } catch (error) {
                console.log('사원 등록 에러 : ' + error)
                this.setState({ errorMessage: error.response.data })
                this.DouzoneContainer.current.handleSnackbarOpen('사원 등록 에러', 'error');
            }

            // 기존 사원 수정
        } else {
            try {
                const response = await update('/emp/update', selectedCard);
                console.log(response.data);
                //this.setState({ complete: '' })
                //this.setState({ complete: '수정되었습니다.' })
                this.DouzoneContainer.current.handleSnackbarOpen('사원수정이 완료되었습니다.', 'success');
            } catch (error) {
                this.DouzoneContainer.current.handleSnackbarOpen('사원 수정 에러', 'error');
            }

            console.log('기존 회원 수정')
            console.log('Update 요청보내기');
        }


    }


    deleteEmp = async (e) => {
        e.preventDefault();
        const { selectedCard, employeeCards } = this.state;
        try {
            const response = await del(`/emp/delete/${selectedCard.emp_cd}`);
            console.log("서버 응답 : ", response.data);
            const newCardList = employeeCards.filter(
                (item) => item.emp_cd !== selectedCard.emp_cd
            );

            this.setState({
                employeeCards: newCardList,
                content: newCardList
            })
            this.DouzoneContainer.current.handleSnackbarOpen('사원 삭제가 완료되었습니다.', 'success');
            this.firstEmpCard();
        } catch (error) {
            this.DouzoneContainer.current.handleSnackbarOpen('사원 삭제 실패하였습니다.', 'error');
            console.log('사원 등록 에러 : ' + error)
        }

        this.handleCloseModal();
    }
    // 
    handleCardClick = async (emp_cd) => {
        try {
            const response = await post(`/emp/getEmpCard`, {
                emp_cd: emp_cd,

            });
            this.setState({
                selectedCard: {
                    ...response.data,
                    newEmp: 'N'
                },
                complete: '',
                errorMessage: '',
                //mauth: Array.isArray(response.data) ? response.data : [],

            });

            // 카드 클릭시 해당 사원의 메뉴권한 가져오기
            this.getmauth(emp_cd);
        } catch (error) {
            console.log(error);
        }
    };


    getmauth = async (emp_cd) => {
        try {
            // const queryString = `?emp_cd=${emp_cd}`;
            const response = await getByQueryString(`/emp/getmauth/${emp_cd}`);
            const getmauth = response.data;
            console.log(getmauth);
            this.setState({ mauth: Array.isArray(getmauth) ? getmauth : [] }); //some을 쓰기 위해 항상 배열로 만듬
        } catch (error) {
            console.log(error + "메뉴권한 가져오기 실패");
        }
    }

    // 조회 조건으로 받은 사원 카드리스트
    handleEmployeeCards = (employeeCards) => {
        this.setState({ employeeCards, content: employeeCards });
    };

    // 빈 사원정보 보내기
    firstEmpCard = () => {
        // 추가 버튼 클릭시 필드를 비워 보냄

        this.setState({
            selectedCard: {
                emp_cd: '',
                emp_nm: '',
                emp_id: '',
                dept_cd: '',
                gender: 'F',
                app_password: '',
                emp_lang: '',
                emp_email1: '',
                emp_email2: '',
                emp_semail1: '',
                emp_semail2: '',
                emp_mobile: '',
                emp_hphone: '',
                emp_add: '',
                emp_hrd: '',
                emp_post: '',
                emp_resi: '',
                newEmp: 'Y',
            }
        })
    }


    // 모달 열기
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    // 모달 닫기
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }



    handleEmpNmChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_nm: value,
            },
        }));
    }
    handleEmpEmpCdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_cd: value,
            },
        }));
    }
    handleEmpCoCdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                co_cd: value,
            },
        }));
    }
    handleEmpIdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_id: value,
            },
        }));
    }
    handleEmpDeptChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                dept_cd: value,
            },
        }));
    }
    handleEmpPwChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                password: value,
            },
        }));
    }
    handleEmpAppPwChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                app_password: value,
            },
        }));
    }
    handleEmpGenderChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                gender: value,
            },
        }));
    }
    handleEmpLangChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_lang: value,
            },
        }));
    }
    handleEmpEmail1Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_email1: value,
            },
        }));
    }
    handleEmpEmail2Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_email2: value,
            },
        }));
    }
    handleEmpSEmail1Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_semail1: value,
            },
        }));
    }
    handleEmpSEmail2Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_semail2: value,
            },
        }));
    }
    handleEmpMobileChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_mobile: value,
            },
        }));
    }



    handleEmpHPhoneChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_hphone: value,
            },
        }));
    }

    handleEmpHrdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_hrd: value,
            },
        }));
    }
    handleEmpResiChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_resi: value,
            },
        }));
    }



    //  ?
    dateChange = (date) => {
        this.setState({ selectedDate: date });
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
                        <Typography variant="caption">
                            사원 수 : {this.state.content.length}
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
                                        this.handleCardClick(this.state.content[index].emp_cd)
                                    }
                                >
                                    {/* 프로필 이미지 */}
                                    <img
                                        src={profile}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            marginLeft: "10px",
                                            marginTop: "10px",
                                            borderRadius: "3px",
                                        }}
                                    ></img>


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
                                            {item.emp_id}
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
                                            {item.emp_nm}
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
                                            {item.emp_hrd}
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

        const user = JSON.parse(sessionStorage.getItem('user'));

        // 'authorities' 키가 존재하고 그 값이 배열이라면 첫 번째 요소의 'authority' 키의 값을 가져옵니다.
        // const authority = user.authorities && user.authorities.length > 0 ? user.authorities[0].authority : null;
        const authority = user.authorities[0].authority

        console.log(authority);

        const { employeeCards, title } = this.state;

        return (
            <Router>
                <ThemeProvider theme={acc1010theme}>
                    <DouzoneContainer
                        ref={this.DouzoneContainer}
                        title={this.state.title} delete={this.handleOpenModal}
                        openDeleteModal={this.state.showModal}
                        handleClose={this.handleCloseModal}
                        handleConfirm={this.deleteEmp}
                        showDelete={''}
                        //title="사원 삭제 확인"
                        message="정말로 사원 정보를 삭제하시겠습니까?"
                    >

                        <Acc1010Search empSearch={this.handleEmployeeCards}

                        ></Acc1010Search>

                        <div className="acc1010-container" style={{ display: 'flex' }}>
                            <CardList
                                onCardItemDraw={this.onCardItemDraw}
                                handleCardClick={this.handleCardClick}
                                handleNewButtonClick={this.addCard}
                            ></CardList>




                            {/* 카드리스트 pp< */}
                            <form onSubmit={this.addOrUpdate} className="acc1010-basic-container" style={{ width: '100%', margin: '0px 15px' }}>
                                {/* Header < */}
                                <div className="ac1010-header" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                    <span style={{ fontWeight: 'bold' }} >ㆍ상세정보 </span>
                                    <span style={{ fontWeight: 'bold', color: 'red' }}> {this.state.complete}</span>
                                    <div style={{ display: 'flex' }}>

                                        <Button type="submit">저장</Button>
                                        {/* //<Button onClick={this.handleOpenModal}>삭제</Button> */}
                                        {/* 삭제 확인 */}

                                    </div>


                                </div>

                                {/* submenu < */}
                                <div className="acc1010-submenu-name-container">
                                    | <NavLink to="/mainpage/empmanagement/basic" activeStyle={{
                                        color: 'rgb(82, 82, 244)',
                                        textDecoration: 'none'
                                    }}
                                        style={{ textDecoration: 'none' }}>
                                        <span>기본정보</span>
                                    </NavLink>|

                                    {authority === 'ROLE_ADMIN' &&

                                        <NavLink
                                            to="/mainpage/empmanagement/mauth"
                                            activeStyle={{
                                                color: 'rgb(82, 82, 244)',
                                                textDecoration: 'none'
                                            }}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <span>메뉴권한 부여</span>
                                        </NavLink>
                                    }
                                </div>


                                {/* 기초정보, 조직정보 Switch */}
                                <Switch>
                                    <Route exact path="/mainpage/empmanagement/basic">
                                        <Acc1010Basic
                                            selectedCard={this.state.selectedCard}
                                            errorMessage={this.state.errorMessage}
                                            handleEmpEmpCdChange={this.handleEmpEmpCdChange}
                                            handleEmpCoCdChange={this.handleEmpCoCdChange}
                                            handleEmpIdChange={this.handleEmpIdChange}
                                            handleEmpPwChange={this.handleEmpPwChange}
                                            handleEmpGenderChange={this.handleEmpGenderChange}
                                            handleEmpLangChange={this.handleEmpLangChange}
                                            handleEmpEmail1Change={this.handleEmpEmail1Change}
                                            handleEmpEmail2Change={this.handleEmpEmail2Change}
                                            handleEmpSEmail1Change={this.handleEmpSEmail1Change}
                                            handleEmpSEmail2Change={this.handleEmpSEmail2Change}
                                            handleEmpMobileChange={this.handleEmpMobileChange}
                                            handleEmpHPhoneChange={this.handleEmpHPhoneChange}
                                            handlePostComplete={this.handlePostComplete}
                                            handleEmpHrdChange={this.handleEmpHrdChange}
                                            handleEmpDeptChange={this.handleEmpDeptChange}
                                            handleEmpAppPwChange={this.handleEmpAppPwChange}
                                            handleEmpResiChange={this.handleEmpResiChange}
                                            handleEmpNmChange={this.handleEmpNmChange}

                                        //{...this.state} onComplete={this.handlePostComplete}
                                        />

                                    </Route>
                                    <Route path="/mainpage/empmanagement/mauth">
                                        <Acc1010Mauth selectedCard={this.state.selectedCard}
                                            mauth={this.state.mauth}
                                            handleCardClick={this.handleCardClick}
                                        />
                                    </Route>
                                    <Redirect from="/mainpage/empmanagement" to="/mainpage/empmanagement/basic" />
                                </Switch>

                                {/* Form Container > */}
                            </form>
                        </div >
                    </DouzoneContainer>
                </ThemeProvider >
            </Router>
        );
    }
}

export default Acc1010;
