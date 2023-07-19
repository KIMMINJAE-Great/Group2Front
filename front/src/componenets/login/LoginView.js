import { TextField, Button } from '@mui/material';
import React, { Component } from 'react';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // ID 입력값 바인딩
  handleUsernameChange = (e) => {
    this.props.setUsername(e.target.value);
  }
  // PW 입력값 바인딩
  handlePasswordChange = (e) => {
    this.props.setPassword(e.target.value);
  }

  render() {
    const {
      handleLogin,
      username,
      password,
      rememberMe,
      errorMessage,
    } = this.props;

    return (
      <div>
        <div style={{ marginTop: '-27vh', marginLeft: '5.5vh' }}>
          <h2 style={{ marginTop: '-5vh' }}>로그인</h2>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <div style={{ marginTop: '6vh' }}>
              <TextField
                label="아이디"
                variant="outlined"
                value={username}
                required
                onChange={this.handleUsernameChange}
                InputProps={{ style: { borderRadius: '5vh', width: '42vh', height: '5.7vh' } }}
              />
            </div>
            <div style={{ marginTop: '2vh' }}>
              <TextField
                label="패스워드"
                type="password"
                variant="outlined"
                required
                value={password}
                onChange={this.handlePasswordChange}
                InputProps={{ style: { borderRadius: '5vh', width: '42vh', height: '5.7vh' } }}
              />

            </div>
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: '5vh', borderRadius: '1vh', width: '42vh', height: '6vh', backgroundColor: '#03A9F4', fontSize: '2vh', fontWeight: 'bold' }}
            >
              <p style={{ lineHeight: '15px' }}>다음</p>
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.6vh' }}>
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                />
                <label htmlFor="rememberMe" style={{ marginLeft: '0.8vh', fontSize: '1.8vh', fontWeight: 'bold' }}>
                  아이디 저장
                </label>
              </div>
              <div>
                <label htmlFor="forgotPassword" style={{ fontSize: '1.8vh', fontWeight: 'bold' }}>
                  비밀번호 찾기
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginView;