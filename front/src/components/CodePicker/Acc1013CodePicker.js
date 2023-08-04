import CodePicker from "./CodePicker";
import React from "react";
import { get, post } from "../api_url/API_URL";

class Acc1013CodePicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

          menuItems: [],
    
          selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달    
          selectedValue:'',//선택되는 값 // 드롭다운    
          textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
    
        };
      }
  // 엔터 쳤을 때 . 검색 하는 조건에 맞게 스프링으로 보내야함..!!
  // 공통 컴포넌트라고 생각해보면... 
  handleKeyDown = async (e ,textFieldValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        textFieldValue: textFieldValue
      });
      try {
        const response = await get(`/codepicker/company/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
        
        this.setState({ 
          menuItems: response.data,
          selectedIds: [], // 다시 검색이 일어나면 선택된 항목들을 초기화
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  }
};
toggleMenuItemCheck = (id) => {
  this.setState(prevState => ({
    selectedIds: prevState.selectedIds
      ? prevState.selectedIds.includes(id)
        ? prevState.selectedIds.filter(codeField => codeField !== id)
        : [...prevState.selectedIds, id]
      : [id]
  }));
}
    render(){
      console.log("muenuItems"+JSON.stringify(this.state.menuItems));
        return (
            // <CodePicker valueField='trNm' codeField='trCd' dispType='codeAndValue'></CodePicker>
            <CodePicker 
            valueField='co_nm' 
            codeField='co_cd' 
            dispType='codeAndValue'
            onHandleKeyDown={this.handleKeyDown}
            menuItems={this.state.menuItems}
            selectedIds={this.state.selectedIds}
            textFieldValue={this.state.textFieldValue}
            toggleMenuItemCheck={this.toggleMenuItemCheck}
            />
        )
    }
}

export default Acc1013CodePicker;