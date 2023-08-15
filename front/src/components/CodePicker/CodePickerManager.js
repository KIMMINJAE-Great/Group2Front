import React from "react";

import EmpCodePicker from "./EmpCodePicker";
import CompanyCodePicker from "./CompanyCodePicker";
import DeptCodePicker from "./DeptCodePicker";
import CarCodePicker from "./CarCodePicker";
import TradeCodePicker from "./TradeCodePicker";

class CodePickerManager extends React.Component {
    render() {
      return (
        // 사원코드도움과 부서코드도움은 사용안하는 것으로 바꼈음
        this.props.helpId === 'CompanyCodePicker' ? <CompanyCodePicker></CompanyCodePicker> //회사코드도움
        : this.props.helpId === 'DeptCodePicker' ? <DeptCodePicker></DeptCodePicker> //부서코드도움
        : this.props.helpId === 'EmpCodePicker' ? <EmpCodePicker></EmpCodePicker> //사원코드도움 
        : this.props.helpId === 'CarCodePicker' ? <CarCodePicker></CarCodePicker> //차량코드도움 
        : this.props.helpId === 'TradeCodePicker' ? <TradeCodePicker handleToAcc1012FromCodePicker={this.props.handleToAcc1012FromCodePicker}></TradeCodePicker> //거래처코드도움 
        : null
      );
    }
  }
  
  export default CodePickerManager;