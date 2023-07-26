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
//import PrivateRoute from './componenets/routes/PrivateRoute';

import { Switch } from 'react-router-dom';

import Acc1010Basic from "./Acc1010Basic";
import Acc1010Dept from "./Acc1010Dept";
import { Link, NavLink, Redirect } from "react-router-dom/cjs/react-router-dom";
import { get, post } from "../../componenets/api_url/API_URL";



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
                    marginRight: "8px",
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

        };
        this.empInfoChange.bind(this);
    }

    //  Acc1010이 렌더링 되기전에 CardList에 담을 사원들의 정보를 가져옴
    componentDidMount() {
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
        this.readCard('');
    }

    //자식컴포넌트의 입력값 onchange 함수
    empInfoChange = (e) => {
        this.setState(prevState => ({
            selectedCard: {
                ...prevState.selectedCard,
                [e.target.name]: e.target.value,
            }
        }));

    }


    // 카드 클릭시 정보를 Acc1010Baisc으로 보내기
    readCard = (emp_cd) => {
        // 추가 버튼 클릭시 필드를 비워 보냄
        if (emp_cd === '') {
            this.setState({
                selectedCard: {
                    emp_cd: '',
                    emp_nm: '',
                    emp_id: '',
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
        //  emp_cd에 맞는 사원 정보를 자식컴포넌트로 보낼 준비
        else {
            const empcard = this.state.employeeCards.find(item => item.emp_cd === emp_cd);

            if (empcard.newEmp) { // newEmp 필드가 있는 경우
                this.setState({
                    selectedCard: {
                        ...empcard,
                        newEmp: 'N'
                    }
                });
            } else { // newEmp 필드가 없는 경우
                this.setState({
                    selectedCard: {
                        ...empcard,
                        newEmp: 'N'
                    }
                });
            }

        }
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


    // Acc1010Basic의 내용을 다 비움
    addCard = () => {
        this.readCard('')
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


            } catch (error) {
                console.log('사원 등록 에러 : ' + error)
            }

            // 기존 사원 수정
        } else {
            try {
                const response = await post('/emp/update', {
                    emp: selectedCard,
                });
                this.componentDidMount();
            } catch (error) {
                console.log('사원 수정 에러 : ' + error)
            }

            console.log('기존 회원 수정')
            console.log('Update 요청보내기');
        }


    }

    //  ?
    dateChange = (date) => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { employeeCards } = this.state;


        return (
            <Router>
                <ThemeProvider theme={acc1010theme}>
                    <div class="acc1010-container" style={{ display: 'flex', width: '99%' }}>
                        {/* 카드리스트 > */}
                        <div class="cardlist-container" style={{ width: '280px', maxWidth: '280px', minWidth: '280px', marginLeft: '10px', marginRight: '10px', borderTop: '3px solid black' }}>
                            <div>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Card style={{ backgroundColor: "#ECECEC", marginBottom: '5px' }} class="noHoverEffect">
                                        <CardContent>
                                            <Typography variant="caption">사용자: {employeeCards.length}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                                최초입사일</Typography>
                                        </CardContent>
                                    </Card>
                                    <Box sx={{ overflowY: "auto", maxHeight: "700px" }}>
                                        {/* 스크롤바 영역 설정 */}
                                        <Grid container spacing={2}>
                                            {employeeCards.map((employee, index) => (
                                                <Grid item xs={12} sm={12} md={12} lg={12} key={index} >
                                                    <Card sx={{ borderRadius: '5px', border: '0.5px solid lightgrey', marginRight: '2px', display: 'flex', }} onClick={() => this.readCard(employee.emp_cd)}>
                                                        {/* 프로필 이미지 */}
                                                        <img src={profile} style={{ width: '50px', height: '50px', marginLeft: '10px', marginTop: '10px', borderRadius: '3px' }}></img>
                                                        <CardContent sx={{ paddingLeft: '3px', paddingRight: '1px' }}>
                                                            {/* 아이디, 이름 */}
                                                            <Typography variant="body2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '90px', maxWidth: '90px' }}>
                                                                {employee.emp_id}
                                                            </Typography>
                                                            <Typography variant="body2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '90px', maxWidth: '90px' }}>
                                                                {employee.emp_nm}
                                                            </Typography>
                                                            <div> </div>

                                                        </CardContent>
                                                        <CardContent style={{ marginLeft: '30px', paddingLeft: '0', paddingRight: '0', minWidth: '100px' }}>
                                                            {/* 입사일 */}
                                                            <Typography variant="body2" >
                                                                {employee.emp_hrd}
                                                            </Typography>


                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{ backgroundColor: "#FFFFFF", color: "#7A7A7A" }}
                                        onClick={() => this.addCard()}
                                    >
                                        추가
                                    </Button>
                                </Grid>
                            </div>
                        </div >

                        {/* 카드리스트 < */}
                        <form onSubmit={this.addOrUpdate} class="acc1010-basic-container" style={{ width: '100%', margin: '0px 15px' }}>
                            {/* Header < */}
                            <div class="ac1010-header" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                <span style={{ fontWeight: 'bold' }} >ㆍ상세정보</span>
                                <div style={{ display: 'flex' }}>
                                    <Button type="submit">저장</Button>
                                    <Button>삭제</Button>

                                </div>


                            </div>
                            {/* Header > */}
                            {/* submenu < */}
                            <div class="acc1010-submenu-name-container">
                                | <NavLink to="/basic" activeStyle={{
                                    color: 'rgb(82, 82, 244)',
                                    textDecoration: 'none'
                                }}
                                    style={{ textDecoration: 'none' }}>
                                    <span>기본정보</span>
                                </NavLink>|
                                <NavLink to="/dept" activeStyle={{
                                    color: 'rgb(82, 82, 244)',
                                    textDecoration: 'none'
                                }}
                                    style={{ textDecoration: 'none' }}>
                                    <span>조직정보</span>
                                </NavLink>

                            </div>

                            {/* submenu > */}


                            {/* 기초정보, 조직정보 Switch */}
                            <Switch>
                                <Route exact path="/basic">
                                    <Acc1010Basic
                                        selectedCard={this.state.selectedCard}
                                        empInfoChange={this.empInfoChange}
                                        {...this.state} onComplete={this.handlePostComplete}
                                    />
                                </Route>
                                <Route path="/dept">
                                    <Acc1010Dept />
                                </Route>
                                <Redirect from="/" to="/basic" />
                            </Switch>

                            {/* Form Container > */}
                        </form>
                    </div >
                </ThemeProvider >
            </Router>
        );
    }
}

export default Acc1010;

