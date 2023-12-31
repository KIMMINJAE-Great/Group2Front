import React from 'react';
import { Grid, IconButton, Dialog, DialogContent, TextField, Typography, Divider, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

class CodePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor1: null,

      isModalOpen: '',
      showMenu: false,
      menuItems: [],
      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
      selectedValue: '',//선택되는 값 // 드롭다운


      selectCheckbox: false,
      selectedchecked: [],
      content: [],

      selectedColor: null, //색상
    };
  }

  handleDropDown = (e) => {
    this.setState({
      anchor1: e.currentTarget,
    });
  };

  handleClose1 = () => {
    this.setState({
      anchor1: null

    });
  };

  //모달의 체크 버튼에서 확인 눌렀을때 담당하는 함수 =>이름으로.
  saveModalCheckedItemsValue = () => {
    let displayValue;
    const valueField = this.props.valueField;
    const codeField = this.props.codeField;
    if (this.props.selectedIds.length > 0) {
      const firstItem = this.props.selectedIds[0];

      if (firstItem && firstItem.hasOwnProperty(valueField)) {
        if (this.props.selectedIds.length === 1) {
          displayValue = `${firstItem[codeField]}.${firstItem[valueField]}`; // 첫번째 아이템의 값
        }
        else {
          displayValue = `${firstItem[valueField]} 외 ...${this.props.selectedIds.length - 1}건`;
        }
      } else {
        console.error('첫번째 아이템에 valueField 속성이 없습니다.');
      }
    }
    this.setState({
      selectedValue: displayValue,
      menuItems: this.props.selectedIds,
      isModalOpen: false,
    });
  }

  //모달의 체크 버튼에서 확인 눌렀을때 담당하는 함수 =>코드로.
  saveModalCheckedItemsCode = () => {
    let displayValue;
    const codeField = this.props.codeField;
    const valueField = this.props.valueField;
    if (this.props.selectedIds.length > 0) {
      const firstItem = this.props.selectedIds[0];
      if (firstItem && firstItem.hasOwnProperty(codeField)) {
        if (this.props.selectedIds.length === 1) {
          displayValue = `${firstItem[codeField]}.${firstItem[valueField]}`; // 첫번째 아이템의 값
        } else {
          displayValue = `${firstItem[valueField]} 외 ...${this.props.selectedIds.length - 1}건`;
        }
      } else {
        console.error('첫번째 아이템에 valueField 속성이 없습니다.');
      }
    }
    this.setState({
      selectedValue: displayValue,
      menuItems: this.props.selectedIds,
      isModalOpen: false,
    });
  }
  //검색된게 하나일때 실행됨
  handleSearchDataIsItemOne = async () => {
    let displayValue;
    const { codeField, valueField } = this.props;

    const firstItem = this.props.menuItems[0];

    displayValue = `${firstItem[codeField]}.${firstItem[valueField]}`; // 첫번째 아이템의 값

    this.setState({ selectedValue: displayValue, }, () => {
    });
  }

  // 모달 열기 함수
  openModal = () => {
    const { selectAllCheckbox } = this.props;
    this.setState({
      isModalOpen: true,
      selectedValue: '',

      modalTextFieldValue: '', // 모달 열때마다 모달안의 TextField를 초기화
      selectedColor: null,
    }, () => { this.props.resetCheckboxes() });// this.props.handleResetTextFieldAndResult 
  };

  // 모달 닫기 함수
  closeModal = async () => {
    // 체크박스 상태 초기화
    await this.props.handleResetTextFieldAndResult('');
    const updatedMenuItems = this.state.menuItems.map(item => {
      return { ...item, checked: false };
    });
    this.setState({
      selectedValue: '',
      menuItems: updatedMenuItems,
      isModalOpen: false
    });//
  };

  // 체크박스 상태 초기화
  handleResetCheck = (e) => {
    e.preventDefault();
    this.props.resetCheckboxes();
  };
  //모달창메뉴에서 아이템 클릭
  handleMenuItemClick = (value) => {
    this.setState({
      selectedValue: value,
      selectedColor: value  //색상때문에
    }, () => {
      if (this.props.callback && this.props.callback.handleCallBackData) {
        this.props.callback.handleCallBackData(value);
      }
    });
    this.props.onTextFieldChange(value);

  };

  handleKeyDown = async (e, value) => {
    const { codeField, valueField, menuItems } = this.props;

    // F2 키를 누르면 모달을 열고 부모의 onHandleKeyDown 함수도 호출
    if (e.key === 'F2' || e.key === 'Enter') {
      await this.props.onHandleKeyDown(e, value);

      if (this.props.callback && this.props.callback.handleCallBackData) {
        const firstItem = this.props.menuItems[0];
        if (firstItem && firstItem[codeField]) {
          await this.props.callback.handleCallBackData(firstItem[codeField]);
        } else {
          console.error("firstItem or car_cd is undefined.");
        }
      }
      if (this.props.menuItems.length === 1) {
        this.handleSearchDataIsItemOne();

      } else if (this.props.menuItems.length >= 2) {
        this.openModal();// 검색된 결과가 2개 이상일 때만 openModal() 실행
      }
    }
  };


  // 모달 내에서 엔터를 치면 해당 코드피커의 ModalTextValue 전달..
  handleKeyDownModal = async (e, value) => {
    if (e.key === 'Enter') {
      await this.props.onhandleKeyDownModal(e, value);
    }
  };

  //부모에서 필수 전달한 값을 받아 렌더링 조건을 결정하는 코드
  renderMenuItemContent = (item) => {
    const { dispType, codeField, valueField, valueField2 } = this.props;

    switch (dispType) {
      case 'codeAndValue':
        return '[' + item[codeField] + ']' + item[valueField];
      case 'codeAndValueAndValue':
        return '[' + item[codeField] + ']' + ' ' + item[valueField] + ' ' + item[valueField2];
      default:
        return item[valueField];
    }
  }
  //메뉴아이템 popover에서삭제
  deleteMenuItem = (valueToDelete) => {
    const updatedMenuItems = this.state.menuItems.filter(
      item => item[this.props.codeField] !== valueToDelete
    );
    this.setState({ menuItems: updatedMenuItems });
  };

  //텍스트필드값 핸들러
  handleOnChange = (event) => {
    this.props.onTextInputChange(event);
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    const { anchor1, } = this.state;
    const {
      selectedIds,
      valueField,
      codeField,
      onDeleteMenuItem,
      menuItems
    } = this.props;
    this.handleDropDown = this.handleDropDown.bind(this);

    // 드롭다운
    const open1 = Boolean(anchor1);


    return (
      <div>
        <div style={{ position: 'relative', width: '219px', height: '30px', }}>
          <TextField
            sx={{
              display: "flex", boxSizing: 'border-box', width: '215px',
              "& .MuiInputBase-root": {
                height: 30
              }
            }}
            variant="outlined"
            onKeyDown={(e) => this.handleKeyDown(e, this.props.textFieldValue)}
            name="textFieldValue"
            value={this.state.selectedValue || this.props.textFieldValue}
            onChange={this.handleOnChange}
          // inputProps={{ style: { height: '2px' } }}
          />

          <div style={{ position: 'absolute', top: 0, right: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
            {/* 엔터쳤을때 이게 먼저 실행되어야함 (..)*/}
            <ExpandMoreIcon
              aria-controls="codepicker"
              aria-haspopup="true"
              onClick={this.handleDropDown}
              style={{ cursor: 'pointer' }}
            >
            </ExpandMoreIcon>
            {/* 여러개데이터가 검색되면 이게 먼저 실행되어야함 */}
            <EventNoteOutlinedIcon
              aria-controls="codepicker2"
              aria-haspopup="true"
              onClick={this.openModal}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {/* v 부분 나타나는 부분임!!  */}
          <Popover
            id="codepicker"
            anchorEl={this.state.anchor1}
            open={open1}
            onClose={this.handleClose1}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            style={{ marginLeft: '-159px' }}
          >
            {/* popover 렌더링 */}
            {/* 운행기록부의 경우에는 차량의 코드가 필요하므로 ... */}
            {(this.state.menuItems || []).map((item, index) => (
              <MenuItem key={index} onClick={() => this.handleMenuItemClick(item[codeField])}>
                {this.renderMenuItemContent(item)}
                {selectedIds.length > 1 && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      this.deleteMenuItem(item[codeField]);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </MenuItem>
            ))
            }
          </Popover>
        </div>

        {/* 모달창 */}
        <div>
          <Dialog open={this.state.isModalOpen}
            onClose={this.closeModal}
            maxWidth="sm"
            PaperProps={{
              style: {
                minHeight: '35vh',
              },
            }}
            fullWidth
          >
            <DialogTitle>
              <Grid container alignItems="center" >
                <Grid item xs={6} alignItems="center">
                  <Typography sx={{ fontSize: '24px', fontWeight: 'bolder', }}>{this.props.pickerTitle}</Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                  <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '18px' }} onClick={this.closeModal}>X</button>
                </Grid>
              </Grid>
              <hr />
            </DialogTitle>
            <DialogContent style={{ minHeight: '10vh' }}>

              <div style={{ display: 'flex', marginTop: 0 }}>
                <Box sx={{ maxWidth: '100%', maxHeight: '100%', width: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px', ml: 0.5 }}>
                  <Grid container>
                    <Grid item xs={3} display="flex" alignItems="center">
                      <Typography variant="subtitle1" sx={{ marginLeft: 10, fontSize: '15px', fontWeight: 'bold' }}>검색어</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        sx={{ width: '100%', }}
                        // style={{width:"180px", marginLeft:"5px"}}
                        onKeyDown={(e) => this.handleKeyDownModal(e, this.state.modalTextFieldValue)}
                        name="modalTextFieldValue"
                        value={this.state.modalTextFieldValue}
                        onChange={(e) => this.setState({ modalTextFieldValue: e.target.value })}
                        variant="outlined" size="small"
                        inputProps={{ style: { height: '12px' } }} />
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 13, width: '30px', height: '30px' }}
                        onClick={(e) => this.props.onHandleOnClick(e, this.state.modalTextFieldValue)}>
                        <SearchIcon />
                      </IconButton>
                    </Grid>

                    <Grid item xs={12} display="flex" alignItems="center">
                      <Grid container>
                        <Grid item xs={2.1}></Grid>
                        <Grid item xs={0}>
                          <Typography variant="subtitle1" sx={{ ml: 9, mt: 0.5, mr: 0.2, fontSize: '12px', fontWeight: 'bold' }} style={{ marginRight: '15px' }}>전체</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <FormControlLabel control={
                            <input
                              type="checkbox"
                              checked={this.props.selectAllCheckbox}
                              onChange={() => this.props.handleToggleAllCheckboxes()}
                            />
                          }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <Grid container alignItems="center" marginBottom={-6}>
                <Grid item xs={12} display="flex" justifyContent="flex-end" marginTop={1} >
                  <button onClick={this.handleResetCheck} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '24px', width: '10%', fontSize: '11px', fontWeight: 'bold' }}>초기화</button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogContent>
              {/* Instead of DataGrid, use a regular Grid for table-like layout */}
              <div style={{ minHeight: 310, width: '100%', overflow: 'auto', }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #D3D3D3', borderTop: '2px solid gray' }}>
                      <th style={{ width: 8, padding: '4px', textAlign: 'center', borderLeft: '1px solid #D3D3D3', borderRight: '1px solid #D3D3D3' }}>
                        {/* 체크박스 열 */}
                        <input
                          type="checkbox"
                          checked={this.props.selectAllCheckbox}
                          onChange={() => this.props.handleToggleAllCheckboxes()}
                        />
                      </th>
                      <th style={{ width: 130, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                        {this.props.pickerCodeName}
                      </th>
                      <th style={{ width: 170, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                        {this.props.pickerName}
                      </th>
                      {
                        // 부모로부터 전달받은 dispType 가 cvv일때
                        this.props.dispType === 'codeAndValueAndValue' &&
                        <th style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                          {this.props.pickerName2}
                        </th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {/* 운행기록부의 경우 코드로 텍스트필드값에 넣어야한다. */}
                    {menuItems?.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => this.handleMenuItemClick(item[this.props.codeField])}
                        style={{ borderBottom: '1px solid #D3D3D3', backgroundColor: this.state.selectedColor === item[this.props.codeField] ? "#E3EEFA" : "white" }}
                      >
                        <td style={{ width: 8, padding: '4px', textAlign: 'center', borderLeft: '1px solid #D3D3D3', borderRight: '1px solid #D3D3D3' }}>
                          {/* 체크박스 */}
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => this.props.handleToggleCheckbox(item[this.props.codeField])}
                            onClick={() => this.handleMenuItemClick(item[this.props.codeField])}
                          />
                        </td>
                        <td style={{ width: 130, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                          {/* 코드 */}
                          {item[this.props.codeField]}
                        </td>
                        <td style={{ width: 170, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                          {/* 이름 */}
                          {item[this.props.valueField]}
                        </td>
                        {/* 조건부 렌더링 : 이름 2 */}
                        {
                          this.props.dispType === 'codeAndValueAndValue' &&
                          <td style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                            {item[this.props.valueField2]}
                          </td>
                        }
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </DialogContent>
            <Grid container justifyContent="center" alignItems="center" mt={0} mb={0} ml={0} backgroundColor={"#f2f2f2"} height={'50px'}>
              <Grid item mb={0}>
                <button onClick={this.closeModal} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold' }}>취소</button>
              </Grid>
              <Grid item mb={0} ml={1}>
                <button
                  //code 를 보내
                  onClick={this.saveModalCheckedItemsCode}
                  style={{ background: '#00d2ff', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold', color: 'white', backgroundColor: '#0095ff' }}>
                  확인
                </button>
              </Grid>
            </Grid>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default CodePicker;