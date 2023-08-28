import CodePicker from "./CodePicker";
import React from "react";
import { get } from "../api_url/API_URL";

class DeptCodePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      menuItems: [],

      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달

      selectedValue: '',//선택되는 값 // 드롭다운

      textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
      modalTextFieldValue: '',
    };
  }

  render() {
    console.log("muenuItems" + JSON.stringify(this.state.menuItems));
    return (
      // <CodePicker valueField='trNm' codeField='trCd' dispType='codeAndValue'></CodePicker>
      <CodePicker
        //필수 전달 
        valueField='dept_nm'
        codeField='dept_cd'
        dispType='codeAndValue'
        pickerTitle='부서코드 검색'
        pickerCodeName='부서코드'
        pickerName='부서이름'
        //필수 전달 함수!!
        onHandleKeyDown={this.handleKeyDown}
        onhandleKeyDownModal={this.handleKeyDownModal}
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

export default DeptCodePicker;