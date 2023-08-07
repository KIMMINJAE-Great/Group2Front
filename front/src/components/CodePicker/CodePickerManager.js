import React from "react";

import EmpCodePicker from "./EmpCodePicker";
import CompanyCodePicker from "./CompanyCodePicker";
import DeptCodePicker from "./DeptCodePicker";
import CarCodePicker from "./CarCodePicker";


class CodePickerManager extends React.Component {
    render() {
      return (
        this.props.helpId === 'CompanyCodePicker' ? <CompanyCodePicker></CompanyCodePicker> //회사코드도움
        : this.props.helpId === 'DeptCodePicker' ? <DeptCodePicker></DeptCodePicker> //부서코드도움
        : this.props.helpId === 'EmpCodePicker' ? <EmpCodePicker></EmpCodePicker> //사원코드도움 
        : this.props.helpId === 'CarCodePicker' ? <CarCodePicker></CarCodePicker> //차량코드도움 
        : null
      );
    }
  }
  
  export default CodePickerManager;