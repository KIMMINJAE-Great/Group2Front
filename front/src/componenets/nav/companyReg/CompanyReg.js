import React from "react";



class CompanyReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName:"",
      companyNick:"",
    };
  }

  //TEST companyName, companyNick  두개 만 먼저 데이터 확인

  //저장 버튼 눌렀을 때 작동하는 것을 핸들하는 코드
  handleSaved = (event) => {
    event.preventDefault();
    // console.log(this.state.username + ' && ' + this.state.password)

    post('/emp/companyreg', {
      companyName: this.state.companyName,
      companyNick: this.state.companyNick,
    })
      .then(response => {

        this.setState({ usernameError: false });
        console.log(response.data)
        console.log('회사등록 데이터 전송');
        sessionStorage.setItem('companyName', JSON.stringify(response.data));
        sessionStorage.setItem('companyName', JSON.stringify(response.data));
        this.props.history.push("/mainpage");

      }).catch(error => {
        if (error.response.status === 404) {          
          this.setState({ usernameError: true });
          this.setState({ passwordError: true });
          this.setState({ errorMessage: '아이디 혹은 비밀번호가 잘못되었습니다.' })
        }
        console.log('로그인 요청 에러 ', error);
      });

  };


  render() {




    return (
      <div>

      </div>
    );
  }
}

export default CompanyReg;
