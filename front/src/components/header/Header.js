import { Component } from "react";
import Logo from '../../images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Select, MenuItem } from "@mui/material";
import "./header.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { post } from "../api_url/API_URL";
import { fontSize } from "@mui/system";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //drawer: false,
    }

  }
  logout = async () => {
    try {
      const response = await post('/emp/logout');
      if (response.status === 200) {
        sessionStorage.removeItem('user');
        window.location.href = "/";
      }
    } catch (error) {
      console.error('로그아웃 요청 중 에러 발생:', error);
    }

  };

  render() {
    const { selectedButton } = this.props;

    let user = JSON.parse(sessionStorage.getItem('user'));
    let name;
    if (user === null) {
      alert('유저 정보없음')
    } else {
      name = user.emp_nm;
    }

    return (
      <div>
        <Box className="header-container" display="flex" justifyContent="space-between" alignItems="center">

          <div className="img-container">
            <img src={Logo} width='230' alt="logo" height='35' />
          </div>

          <Box display="flex" alignItems="center">
            <AccountCircleIcon fontSize="large" />
            &nbsp;&nbsp;
            <p>{user ? name : '로그인 안된 상태'}<br />아마란스10 개발팀</p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Select variant="outlined" class="header-select" sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}>
              <MenuItem value={10} onClick={this.logout}>로그아웃</MenuItem>
              <MenuItem value={20}>마이페이지</MenuItem>
            </Select>
          </Box>


        </Box>
        <div class="bar">
          <MenuIcon sx={{ color: 'white', fontSize: 45, background: '#0f8bff', borderRadius: 1 }} onClick={this.props.changeNav}></MenuIcon>
          &nbsp;&nbsp;&nbsp;
          <Typography style={{ color: 'white', fontSize: '21px', fontWeight: 'bold' }}>
            {selectedButton}
          </Typography>
        </div>
      </div>
    )
  }
}

export default Header;