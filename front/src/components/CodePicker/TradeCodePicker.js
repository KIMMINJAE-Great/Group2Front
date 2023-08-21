import CodePicker from "./CodePicker";
import React from "react";
import { get} from "../api_url/API_URL";

class CarCodePicker extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [], //메뉴아이탬들 렌더링될값 //드롭다운
      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
      selectedValue:'',//선택되는 값 // 드롭다운
      textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
      modalTextFieldValue: '', //모달안의 텍스트필드 (기본텍스트필드와 별도로 작동)

      selectedchecked: [], // 체크박스 선택한 배열의 정보 
      selectAllCheckbox: false, // 체크박스 모두 선택 
      newSelectAllCheckbox: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }
  


  // 엔터쳤을때,
  handleKeyDown = async (e, textFieldValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        textFieldValue: textFieldValue
      }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
        try {
          const response = await get(`/codepicker/trademanagement/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
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
        const response = await get(`/codepicker/trademanagement/searchinfo?value=${encodeURIComponent(this.state.modalTextFieldValue)}`);
        
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

  handleOnClick = async (e, textFieldValue) => {
    e.preventDefault();
    console.log("textFieldValue의 현재 값: "+textFieldValue)
    this.setState({
      modalTextFieldValue: textFieldValue
    }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
      try {
        const response = await get(`/codepicker/trademanagement/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
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

  // @@@@@@@@@@@@@@@ 체크 박스 @@@@@@@@@@@@@@@@@@@@@@
  handleToggleAllCheckboxes = () => {
    this.setState((prevState) => {
      const newSelectAllCheckbox = !prevState.selectAllCheckbox;
      const updatedContent = prevState.menuItems.map((item) => ({
        ...item,
        checked: newSelectAllCheckbox,
      }));
      const selectedchecked = newSelectAllCheckbox
        ? [...updatedContent]
        : [];
      return {
        selectAllCheckbox: newSelectAllCheckbox,
        menuItems: updatedContent,
        selectedIds: selectedchecked,
      };
    });
  };

  // 체크박스 토글 처리하는 함수
  handleToggleCheckbox = (id) => {
    this.setState(prevState => {
        // 체크박스 상태 업데이트
        const updatedContent = prevState.menuItems.map(item =>
            item.tr_cd === id ? { ...item, checked: !item.checked } : item
        );
        const item = prevState.menuItems.find(item => item.tr_cd === id);
        const updatedSelectedIds = item && item.checked
          ? prevState.selectedIds.filter(selectedItem => selectedItem.tr_cd !== id)
          : [...prevState.selectedIds, item];

        return {
            menuItems: updatedContent,
            selectedIds: updatedSelectedIds
        };
    });
  }

  // 모든 체크박스의 상태를 해제
  resetCheckboxes = () => {
    this.setState(prevState => {        
      const updatedContent = prevState.menuItems.map(item => ({ ...item, checked: false }));
      return {
          menuItems: updatedContent,
          selectedIds: [],  // 선택된 항목의 목록을 비움
          selectAllCheckbox: false  // 전체 선택 체크박스 상태 초기화
      };
    });
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
    
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    console.log("muenuItems"+JSON.stringify(this.state.menuItems));
    return (
      // <CodePicker valueField='trNm' codeField='trCd' dispType='codeAndValue'></CodePicker>
      <CodePicker 
      //필수 전달 
      valueField='tr_nm' 
      codeField='tr_cd' 
      dispType='codeAndValue'
      pickerTitle='거래처 코드 검색'
      pickerCodeName='거래처코드'
      pickerName='거래처명'

      //필수 전달 함수!!
      onHandleKeyDown={this.handleKeyDown}
      onhandleKeyDownModal={this.handleKeyDownModal}
      onHandleOnClick={this.handleOnClick}

      menuItems={this.state.menuItems}
      selectedIds={this.state.selectedIds}
      textFieldValue={this.state.textFieldValue}

      //텍스트필드 헨들러
      onTextInputChange={this.handleTextInputChange} 
      onTextFieldChange={this.handleTextFieldChange}
      
      //토글 관련 ...
      selectAllCheckbox={this.state.selectAllCheckbox}
      handleToggleCheckbox={this.handleToggleCheckbox}
      handleToggleAllCheckboxes={this.handleToggleAllCheckboxes}
      resetCheckboxes={this.resetCheckboxes}
      />
    )
  }
}

export default CarCodePicker;