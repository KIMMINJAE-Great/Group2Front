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
} from "@mui/material";
import profile from "../../images/profile.png";
import { Component } from "react";
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
import DeleteDialog from '../../components/commons/DeleteDialog'

import Acc1010Mauth from "./Acc1010Mauth";
import CardList from "../../components/commons/CardList";
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import Acc1010Search from "./Acc1010Search";
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

            //모달
            showModal: false,

            //완료 확인
            complete: '',

            title: '사원관리'

        };
        //this.empInfoChange.bind(this);
    }

    //  Acc1010이 렌더링 되기전에 CardList에 담을 사원들의 정보를 가져옴
    componentDidMount() {
        this.forRender();
    }

    forRender = () => {
        (async () => {
            try {
                const response = await get('/emp/cardlist');

                // Modify each employee card to include the 'newEmp' property
                const employeeCards = response.data.map(card => ({
                    ...card,
                    newEmp: 'Y',
                }));

                this.setState({ employeeCards });
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
        this.setState({ complete: '' })
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
                this.setState({ employeeCards: [...this.state.employeeCards, response.data] });
                this.setState({ complete: '완료되었습니다.' })

            } catch (error) {
                console.log('사원 등록 에러 : ' + error)
            }

            // 기존 사원 수정
        } else {
            try {
                const response = await update('/emp/update', selectedCard);
                console.log(response.data);
                //this.setState({ complete: '' })
                this.setState({ complete: '완료되었습니다.' })
            } catch (error) {
                console.log('사원 수정 에러 : ' + error)
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
            })
            this.firstEmpCard();
        } catch (error) {
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

            });
        } catch (error) {
            console.log(error);
        }
    };
    // 조회 조건으로 받은 사원 카드리스트
    handleEmployeeCards = (employeeCards) => {
        this.setState({ employeeCards });
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



    empNmChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_nm: value,
            },
        }));
    }
    empEmpCdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_cd: value,
            },
        }));
    }
    empCoCdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                co_cd: value,
            },
        }));
    }
    empIdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_id: value,
            },
        }));
    }
    empDeptChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                dept_cd: value,
            },
        }));
    }
    empPwChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                password: value,
            },
        }));
    }
    empAppPwChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                app_password: value,
            },
        }));
    }
    empGenderChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                gender: value,
            },
        }));
    }
    empLangChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_lang: value,
            },
        }));
    }
    empEmail1Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_email1: value,
            },
        }));
    }
    empEmail2Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_email2: value,
            },
        }));
    }
    empSEmail1Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_semail1: value,
            },
        }));
    }
    empSEmail2Change = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_semail2: value,
            },
        }));
    }
    empMobileChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_mobile: value,
            },
        }));
    }



    empHPhoneChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_hphone: value,
            },
        }));
    }

    empHrdChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_hrd: value,
            },
        }));
    }
    empResiChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_resi: value,
            },
        }));
    }
    empNmChange = (value) => {
        this.setState((prevState) => ({
            selectedCard: {
                ...prevState.selectedCard,
                emp_nm: value,
            },
        }));
    }


    //  ?
    dateChange = (date) => {
        this.setState({ selectedDate: date });
    };

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
                    <DouzoneContainer title={this.state.title} delete={this.handleOpenModal}>

                        <Acc1010Search empSearch={this.handleEmployeeCards}

                        ></Acc1010Search>

                        <div class="acc1010-container" style={{ display: 'flex' }}>
                            <CardList
                                content={employeeCards}
                                handleCardClick={this.handleCardClick}
                                handleNewButtonClick={this.addCard}
                            ></CardList>




                            {/* 카드리스트 pp< */}
                            <form onSubmit={this.addOrUpdate} class="acc1010-basic-container" style={{ width: '100%', margin: '0px 15px' }}>
                                {/* Header < */}
                                <div class="ac1010-header" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                    <span style={{ fontWeight: 'bold' }} >ㆍ상세정보 </span>
                                    <span style={{ fontWeight: 'bold', color: 'red' }}> {this.state.complete}</span>
                                    <div style={{ display: 'flex' }}>

                                        <Button type="submit">저장</Button>
                                        {/* //<Button onClick={this.handleOpenModal}>삭제</Button> */}
                                        {/* 삭제 확인 */}
                                        < DeleteDialog
                                            open={this.state.showModal}
                                            handleClose={this.handleCloseModal}
                                            handleConfirm={this.deleteEmp}
                                            title="사원 삭제 확인"
                                            message="정말로 사원 정보를 삭제하시겠습니까?"
                                        />
                                    </div>


                                </div>

                                {/* submenu < */}
                                <div class="acc1010-submenu-name-container">
                                    | <NavLink to="/basic" activeStyle={{
                                        color: 'rgb(82, 82, 244)',
                                        textDecoration: 'none'
                                    }}
                                        style={{ textDecoration: 'none' }}>
                                        <span>기본정보</span>
                                    </NavLink>|

                                    {authority === 'ROLE_ADMIN' &&

                                        <NavLink
                                            to="/mauth"
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
                                    <Route exact path="/basic">
                                        <Acc1010Basic
                                            selectedCard={this.state.selectedCard}

                                            empEmpCdChange={this.empEmpCdChange}
                                            empCoCdChange={this.empCoCdChange}
                                            empIdChange={this.empIdChange}
                                            empPwChange={this.empPwChange}
                                            empGenderChange={this.empGenderChange}
                                            empLangChange={this.empLangChange}
                                            empEmail1Change={this.empEmail1Change}
                                            empEmail2Change={this.empEmail2Change}
                                            empSEmail1Change={this.empSEmail1Change}
                                            empSEmail2Change={this.empSEmail2Change}
                                            empMobileChange={this.empMobileChange}
                                            empHPhoneChange={this.empHPhoneChange}
                                            handlePostComplete={this.handlePostComplete}
                                            empHrdChange={this.empHrdChange}
                                            empDeptChange={this.empDeptChange}
                                            empAppPwChange={this.empAppPwChange}
                                            empResiChange={this.empResiChange}
                                            empNmChange={this.empNmChange}

                                        //{...this.state} onComplete={this.handlePostComplete}
                                        />

                                    </Route>
                                    <Route path="/mauth">
                                        <Acc1010Mauth selectedCard={this.state.selectedCard} />
                                    </Route>
                                    <Redirect from="/" to="/basic" />
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

