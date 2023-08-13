import CodePicker from "./CodePicker";
import React from "react";
import { get} from "../api_url/API_URL";

class DeptCodePicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

          menuItems: [],

    
          selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
    
          selectedValue:'',//선택되는 값 // 드롭다운
    
          textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
          modalTextFieldValue: '',
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
          const response = await get(`/codepicker/depmanagement/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
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
  handleKeyDownModal = async (e ,textFieldValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        modalTextFieldValue: textFieldValue
      });
      try {
        const response = await get(`/codepicker/depmanagement/searchinfo?value=${encodeURIComponent(this.state.modalTextFieldValue)}`);
        
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
  //serach버튼을 위해..
  handleOnClick = async (e, textFieldValue) => {
    e.preventDefault();
    this.setState({
      textFieldValue: textFieldValue
    }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
      try {
        const response = await get(`/codepicker/depmanagement/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
        this.state.menuItems = response.data;
        this.setState({
          menuItems: response.data,
          selectedIds: [], // 다시 검색이 일어나면 선택된 항목들을 초기화

        });
          if(this.state.menuItems.length === 1 ){
            this.setState({
              selectedIds: response.data,
            });
          }
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
      }
    );
  };

  deleteMenuItem = (valueToDelete) => {
    const updatedMenuItems = this.state.menuItems.filter(
      item => item.dept_cd !== valueToDelete
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
  //텍스트필드값 핸들러
  handleTextInputChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value, 
    });
  };
  //popover 핸들러
  handleTextFieldChange = (value) => {
    this.setState({
      textFieldValue: value, 
      selectedValue: value,
    });
  };

    render(){
      console.log("muenuItems"+JSON.stringify(this.state.menuItems));
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