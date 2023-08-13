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
  


// 엔터쳤을때, (정상작동확인)
  handleKeyDown = async (e, textFieldValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        textFieldValue: textFieldValue
      }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
        try {
          const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
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

  //모달에서 엔터쳤을때.(정상작동확인)
  handleKeyDownModal = async (e ,textFieldValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        modalTextFieldValue: textFieldValue
      });
      try {
        const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.modalTextFieldValue)}`);
        
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


  // 검색아이콘 눌렀을때. (정상작동확인)
  handleOnClick = async (e, textFieldValue) => {
    e.preventDefault();
    
    this.setState({
      modalTextFieldValue: textFieldValue
    }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
      try {
        const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
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
            item.car_cd === id ? { ...item, checked: !item.checked } : item
        );

        const item = prevState.menuItems.find(item => item.car_cd === id);
        const updatedSelectedIds = item && item.checked
          ? prevState.selectedIds.filter(selectedItem => selectedItem.car_cd !== id)
          : [...prevState.selectedIds, item];

        return {
            menuItems: updatedContent,
            selectedIds: updatedSelectedIds
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
      
        return (
            // <CodePicker valueField='trNm' codeField='trCd' dispType='codeAndValue'></CodePicker>
            <CodePicker 
            //필수 전달 
            valueField='car_nm' 
            codeField='car_cd' 
            valueField2='car_nb'
            dispType='codeAndValueAndValue'
            pickerTitle='차량코드 검색'
            pickerCodeName='차량코드'
            pickerName='차량명'
            pickerName2='차량번호'
            //필수 전달 함수!!
            onHandleKeyDown={this.handleKeyDown}
            onhandleKeyDownModal={this.handleKeyDownModal}
            menuItems={this.state.menuItems}
            selectedIds={this.state.selectedIds}
            textFieldValue={this.state.textFieldValue}
 
            onTextInputChange={this.handleTextInputChange} 
            onTextFieldChange={this.handleTextFieldChange}
            onHandleOnClick={this.handleOnClick}
            //토글 관련 함수...

            handleToggleCheckbox={this.handleToggleCheckbox}
            handleToggleAllCheckboxes={this.handleToggleAllCheckboxes}
            selectAllCheckbox={this.state.selectAllCheckbox}
            />
        )
    }
}

export default CarCodePicker;