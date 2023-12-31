import CodePicker from "./CodePicker";
import React from "react";
import { get } from "../api_url/API_URL";

class DrivingCodePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [], //메뉴아이탬들 렌더링될값 //드롭다운
      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
      selectedValue: '',//선택되는 값 // 드롭다운
      textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
      modalTextFieldValue: '', //모달안의 텍스트필드 (기본텍스트필드와 별도로 작동)

      selectedchecked: [], // 체크박스 선택한 배열의 정보 
      selectAllCheckbox: false, // 체크박스 모두 선택 
      newSelectAllCheckbox: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  //텍스트필드에서 엔터쳤을때
  handleKeyDown = async (e, textFieldValue) => {
    e.preventDefault();
    return new Promise(async (resolve, reject) => { //Promise반환하도록,, 함수내의 모든 비동기 작업들이 완료될때까지 대기시키려고
      this.setState({
        textFieldValue: textFieldValue
      }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
        try {
          const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.textFieldValue)}`);
          if (response.data.length === 1) {
            this.setState({
              menuItems: response.data,
              selectedIds: response.data
            }, resolve);
          } else {
            this.setState({
              menuItems: response.data,
              selectedIds: [] // 다시 검색이 일어나면 선택된 항목들을 초기화..
            }, resolve);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

  //모달에서 엔터쳤을때.(정상작동확인)
  handleKeyDownModal = async (e, textFieldValue) => {
    e.preventDefault();
    return new Promise(async (resolve, reject) => {
      this.setState({
        modalTextFieldValue: textFieldValue
      }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
        try {
          const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.modalTextFieldValue)}`);
          if (response.data.length === 1) {
            this.setState({
              menuItems: response.data,
              selectedIds: response.data
            }, resolve);
          } else {
            this.setState({
              menuItems: response.data,
              selectedIds: [] // 다시 검색이 일어나면 선택된 항목들을 초기화..
            }, resolve);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

  // 검색아이콘 눌렀을때. (정상작동확인)
  handleOnClick = async (e, textFieldValue) => {
    e.preventDefault();
    this.setState({
      modalTextFieldValue: textFieldValue
    }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
      try {
        const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.modalTextFieldValue)}`);
        this.state.menuItems = response.data;
        this.setState({
          menuItems: response.data,
          selectedIds: [], // 다시 검색이 일어나면 선택된 항목들을 초기화

        });
        if (this.state.menuItems.length === 1) {
          this.setState({
            selectedIds: response.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    );
  };


  //텍스트필드 비우고 빈값으로 검색(초기화면은 모든 코드목록이여야 하므로!)하는 코드~
  handleResetTextFieldAndResult = async () => {
    return new Promise(async (resolve, reject) => {
      this.setState({
        TextFieldValue: '',
        ModalTextValue: ''
      }, async () => { // 상태가 업데이트된 후 이 콜백 함수가 실행됨
        try {
          const response = await get(`/codepicker/regcar/searchinfo?value=${encodeURIComponent(this.state.modalTextFieldValue)}`);
          if (response.data.length === 1) {
            this.setState({
              menuItems: response.data,
              selectedIds: response.data
            }, resolve);
          } else {
            this.setState({
              menuItems: response.data,
              selectedIds: [] // 다시 검색이 일어나면 선택된 항목들을 초기화..
            }, resolve);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
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

      let updatedSelectedIds;
      if (item && item.checked) {
        updatedSelectedIds = prevState.selectedIds.filter(selectedItem => selectedItem.car_cd !== id);
      } else {
        // 이미 selectedIds에 해당 아이템이 있는지 확인
        if (!prevState.selectedIds.some(selectedItem => selectedItem.car_cd === id)) {
          updatedSelectedIds = [...prevState.selectedIds, item];
        } else {
          updatedSelectedIds = [...prevState.selectedIds];
        }
      }
      return {
        menuItems: updatedContent,
        selectedIds: updatedSelectedIds
      };
    });
  }




  // 모든 체크박스의 상태를 해제
  resetCheckboxes = () => {
    this.setState({ textFieldValue: '' })
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
      textFieldValue: e.target.value,
    });
  };

  //popover 핸들러
  handleTextFieldChange = (value) => {
    this.setState({
      FieldValue: value,
      selectedValue: value,
    });
  };

  render() {
    return (
      <CodePicker
        style={{ backgroundColor: 'grey' }}
        //필수 전달 
        valueField='car_nm'
        codeField='car_cd'
        valueField2='car_nb'
        dispType='codeAndValueAndValue'
        pickerTitle='차량코드'
        pickerCodeName='차량코드'
        pickerName='차량명'
        pickerName2='차량번호'
        callback={this.props.callback}

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
        handleResetTextFieldAndResult={this.handleResetTextFieldAndResult}

        //토글 관련 ...
        selectAllCheckbox={this.state.selectAllCheckbox}
        handleToggleCheckbox={this.handleToggleCheckbox}
        handleToggleAllCheckboxes={this.handleToggleAllCheckboxes}
        resetCheckboxes={this.resetCheckboxes}
      />
    )
  }
}

export default DrivingCodePicker;