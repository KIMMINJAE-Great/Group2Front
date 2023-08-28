import CodePicker from "./CodePicker";
import React from "react";
import { get } from "../api_url/API_URL";

class EmpCodePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],

      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
      selectedValue: '',//선택되는 값 // 드롭다운
      textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
    };
  }

  render() {
    console.log("muenuItems" + JSON.stringify(this.state.menuItems));
    return (
      // <CodePicker valueField='trNm' codeField='trCd' dispType='codeAndValue'></CodePicker>
      <CodePicker
        //필수 전달 
        valueField='emp_nm'  //사원명
        codeField='emp_cd'    //사원코드
        valueField2='dept_nm' //부서명
        dispType='codeAndValueAndValue'
        pickerTitle='사원코드 검색'
        pickerCodeName='사원코드'
        pickerName='사원이름'
        pickerName2='부서이름'
        //필수 전달 함수!!
        onHandleKeyDown={this.handleKeyDown}
        menuItems={this.state.menuItems}
        selectedIds={this.state.selectedIds}
        textFieldValue={this.state.textFieldValue}
        toggleMenuItemCheck={this.toggleMenuItemCheck}
        deleteMenuItem={this.deleteMenuItem}
        onTextInputChange={this.handleTextInputChange}
        onTextFieldChange={this.handleTextFieldChange}
        onHandleOnClick={this.handleOnClick}
      />
    )
  }
}

export default EmpCodePicker;