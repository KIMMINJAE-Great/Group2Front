import React, { Component } from 'react';
import LoginView from './LoginView';
import LoginImage from '../../images/mainPage.png'
import { Box } from '@mui/material';
import { post } from '../api_url/API_URL';
import { withRouter } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
      usernameError: false,
      passwordError: false,
    };
  }

  // 로그인 요청
  handleLogin = async (event) => {
    event.preventDefault();
    console.log(this.state.username + ' && ' + this.state.password)

    try {
      const response = await post('/auth/login', {
        emp_id: this.state.username,
        password: this.state.password,
      });

      this.setState({ usernameError: false });
      console.log(response.data);
      console.log('로그인 성공');
      sessionStorage.setItem('user', JSON.stringify(response.data));
      // localStorage.setItem('user', JSON.stringify(response.data))
      this.props.history.push("/mainpage");

    } catch (error) {
      console.log('로그인 요청 에러 ', error);
      if (error.response && error.response.status === 404) {
        this.setState({
          usernameError: true,
          passwordError: true,
          errorMessage: '아이디 혹은 비밀번호가 잘못되었습니다.'
        });
      }
    }
  };
  setUsername = (username) => {
    this.setState({ username });
  };

  setPassword = (password) => {
    this.setState({ password });
  };

  setRememberMe = (rememberMe) => {
    this.setState({ rememberMe });
  };

  render() {
    const { username, password, rememberMe, errorMessage, usernameError, passwordError } = this.state;

    return (

      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Box display="flex" alignItems="center">
          <img src={LoginImage}
            alt=""
            style={{ width: '75%', height: 'auto', maxHeight: '100%', objectFit: 'cover' }}
          />
          <LoginView
            username={username}
            password={password}
            rememberMe={rememberMe}
            errorMessage={errorMessage}
            usernameError={usernameError}
            passwordError={passwordError}
            setUsername={this.setUsername}
            setPassword={this.setPassword}
            setRememberMe={this.setRememberMe}
            handleLogin={this.handleLogin}
          />
        </Box>
      </div>
    );
  }
}

export default withRouter(Login);
