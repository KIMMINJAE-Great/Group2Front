import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CardList from "../../components/commons/CardList";
import { Box, CardContent, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import DouzoneContainer from "../../components/douzonecontainer/DouzoneContainer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { get, post } from "../../components/api_url/API_URL";
import Acd1010BasicInfo from "./Acd1010BasicInfo";
import Acd1010Search from "./Acd1010Search";
import { Divider, Grid, MenuItem,Card, Select, TextField, Typography } from "@mui/material";
const acd1010theme = createTheme({
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


class Acd1010 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          co_cd: '',
          car_cd: '',
          car_nb: '',
          car_nm: '',
          dept_cd: '',
          emp_cd: '',
          duty: '',
          use_yn: '',
          acct_cd: '',
          asset_cd: '',
          div_cd: '',
          get_dt: '',
          expen_ty: '',
          insur_yn: '',
          insur_tr_cd: '',
          ifr_dt: '',
          ito_dt: '',
          lease_yn: '',
          lfr_dt: '',
          lto_dt: '',
          insert_id: '',
          insert_ip: '',
          insert_dt: '',
          modify_id: '',
          modify_ip: '',
          modify_dt: '',
          biz_fg: '',
          disposal_dt: '',
          file_group: '',
          regCarCards: [], //카드리스트
          regCarCardData: [], //카드리스트에서 딱 하나 [0] 배열이다!!
          title:"차량등록부",
          content:[],
        };
      }



  //카드리스트 가져오기위해 componentDidMount로 시작하면 바로 미리 가져온다.
  componentDidMount() {
    this.fetchCarRegCards();
  }

  //카드 클릭시 입력됨 (회사 코드로)
  handleCardClick = async (car_cd) => {    
    const data = { car_cd };
    try {
      const response = await post("/company/selectCard", data);
      console.log(response);
      console.log("카드리스트 클릭됨!");
      this.setState({
        regCarCardData: response.data,
        car_cd: response.data.car_cd,
        car_nm: response.data.car_nm,
        
      });
      console.log("car_cd이다!!"+this.state.car_cd);
      this.fetchCarRegCards();
    } catch (error) {
      console.error(error);
      console.log("카드리스트 클릭 중에 오류발생");
    }
  };
 //카드리스트(DB에 접근해서 가져오는것 계속 새로고침을 해야하기에..)
  fetchCarRegCards = async () => {
    try {
      const response = await get("/regcar/cardlist");
      console.log("Acc1013Con.........fetchRegCarCards 요청");
      this.setState({ 
        regCarCards: response.data,
        content: response.data, });
      console.log("regCarCards: "+this.state.regCarCards);
    } catch (error) {
      console.log(error);
    }
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
                    border: "0.5px solid lightgrey",
                    marginRight: "2px",
                    display: "flex",
                  }}
                  onClick={() =>
                    this.handleCardClick(this.state.content[index].car_cd)
                  }
                >

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
                      {item.car_cd}
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
                      {item.car_nm}
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
                      {item.co_nk}
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



    //입력값의 변화를 저장함
    handleInputChange = (e) => {
        this.setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
    };
    render() {
    const { regCarCards, regCarCardData } = this.state;
    return (

      <Router>
        <DouzoneContainer title={this.state.title} delete={this.handleOpenModal}>
          <ThemeProvider theme={acd1010theme} >
            <div>
              <Acd1010Search    
                regCarCards={regCarCards}
                onInputChange={this.handleInputChange}
                handleSaveButton={this.handleSaveButton} //저장 미구현
              ></Acd1010Search>
              <div style={{ display: "flex" }}>
                  <CardList
                      handleCardClick={this.handleCardClick}
                      handleNewButtonClick={this.handleNewButtonClick}
                      onCardItemDraw={this.onCardItemDraw}
                      content={this.state.content}
                  />
                  <Acd1010BasicInfo
                      onInputChange={this.handleInputChange}
                      
                      regCarCardData={this.state.regCarCardData}
                      // car_cd={this.state.car_cd}               
                       
                      regCarCards={this.state.regCarCards}  // 카드리스트 전체 배열 담긴거
                  />
              </div>
            </div>           
          </ThemeProvider>
        </DouzoneContainer>        
      </Router>
    );
  }
}

export default Acd1010;