import React from "react";

import EmpCodePicker from "./EmpCodePicker";
import CompanyCodePicker from "./CompanyCodePicker";
import DeptCodePicker from "./DeptCodePicker";
import CarCodePicker from "./CarCodePicker";
import TradeCodePicker from "./TradeCodePicker";
import DrivingCodePicker from "./DrivingCodePicker";

// 코드피커 사용방법: 
// 1. 사용할 곳에 <CodePickerManager /> helpId 입력
// ex) <CodePickerManager helpId={"DrivingCodePicker"} />

// 2. 필수 전달 함수, 구성값, 상태값을 자식인 CodePicker.js 로 보내주고 함수의 내용을 일부 수정합니다.
// ex) <CodePicker valueField='car_nm' codeField='car_cd' valueField2='car_nb' ...필수전달코드... />
// ex) 서버로 보내는 엔드포인트와 배열의 연산 등에 필요한 인자값 수정

// 3. 사용한 곳에서 필요한 데이터가 있다면 콜백함수를 추가로 작성합니다.
// ex) <CodePicker callback={this.props.callback}  ...필수전달코드.../>

// 4. 콜백을 할 객체를 만들고 필요한 콜백함수를 작성하고, onChange를 넣어줍니다.
// ex) searchCallback = {  콜백함수 : (e) => { this.setState({변화값: e}, 콜백함수2 : (e) => { this.setState({변화값2: e} );
// ex) <CodePickerManager onChange={(e) => {}} callback={this.searchCallback} helpId={"DrivingCodePicker"} 

// HelpId 를 통해서 코드피커로 접근 .     // 전달할 데이터가 있다면 callback에 값을 담으면 된다.
// 사원코드도움과 부서코드도움은 사용안하는 것으로 바뀌었음
class CodePickerManager extends React.Component {

  render() {
    return (
      this.props.helpId === 'CompanyCodePicker' ? <CompanyCodePicker callback={this.props.callback} ></CompanyCodePicker> //회사코드도움
      // : this.props.helpId === 'DeptCodePicker' ? <DeptCodePicker></DeptCodePicker> //부서코드도움
      // : this.props.helpId === 'EmpCodePicker' ? <EmpCodePicker></EmpCodePicker> //사원코드도움 
      : this.props.helpId === 'CarCodePicker' ? <CarCodePicker callback={this.props.callback}></CarCodePicker> //차량코드도움 
      : this.props.helpId === 'TradeCodePicker' ? <TradeCodePicker callback={this.props.callback}></TradeCodePicker> //거래처코드도움 
      : this.props.helpId === 'DrivingCodePicker' ? <DrivingCodePicker callback={this.props.callback} ></DrivingCodePicker> //사원코드도움 
      : null
    );
  }
}

export default CodePickerManager;