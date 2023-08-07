//regcarcodePick.js

import CodePicker from "./CodePicker";
import React from "react";
import { get, post } from "../../components/api_url/API_URL";

class RegCarCodePicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

          menuItems: [],

    
          selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
    
          selectedValue:'',//선택되는 값 // 드롭다운
    
          textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
    
        };
      }
// 엔터쳤을때,
handleKeyDown = async (e, textFieldValue) => {
  if (e.key === "Enter") {
    e.preventDefault();
    this.setState({
      textFieldValue: textFieldValue
    }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
      try {
        const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
        this.setState({
          menuItems: response.data,
          selectedIds: [], // 다시 검색이 일어나면 선택된 항목들을 초기화
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  }
};

deleteMenuItem = (valueToDelete) => {

  const updatedMenuItems = this.state.menuItems.filter(
    item => item.car_cd !== valueToDelete
  );

  this.setState({ menuItems: updatedMenuItems });
};
// 메뉴아이템 체크할때
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
            //필수 전달 
            valueField='car_nm' 
            codeField='car_cd' 
            dispType='codeAndValue'
            pickerCodeName='차량코드'
            pickerName='차량이름'
            //필수 전달 함수!!
            onHandleKeyDown={this.handleKeyDown}
            menuItems={this.state.menuItems}
            selectedIds={this.state.selectedIds}
            textFieldValue={this.state.textFieldValue}
            toggleMenuItemCheck={this.toggleMenuItemCheck}
            deleteMenuItem={this.deleteMenuItem}
            />
        )
    }
}

export default RegCarCodePicker;