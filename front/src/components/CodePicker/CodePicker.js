import React from 'react';
import { Grid, IconButton, Dialog, DialogContent, TextField, Typography, Divider, FormControlLabel } from '@mui/material';
import { Box} from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';


class CodePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor1: null,
      anchor2: null,
      isModalOpen: '',
      showMenu: false,
      menuItems: [],
      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
      selectedValue:'',//선택되는 값 // 드롭다운
      // textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
      
      selectCheckbox: false,
      selectedchecked: [],
      content: [],
     
    };
  }

  handleDropDown = (e) => {
    this.setState({
      anchor1: e.currentTarget,
    });
  };

  handleClose1 = () => {
    this.setState({ anchor1: null });
  };

  //모달의 체크 버튼에서 확인 눌렀을때 담당하는 함수
  saveModalCheckedItems = () => {
    let displayValue;
    const valueField = this.props.valueField;
    if (this.props.selectedIds.length > 0) {
      const firstItem = this.props.selectedIds[0];
      
      if (firstItem && firstItem.hasOwnProperty(valueField)) {
          if (this.props.selectedIds.length === 1) {
              displayValue = firstItem[valueField]; // 첫번째 아이템의 값
          } else {
              displayValue = `${firstItem[valueField]} 외 ...${this.props.selectedIds.length - 1}건`;
          }
      } else {
          console.error('첫번째 아이템에 valueField 속성이 없습니다.');
      }
  } 

    this.setState({
      selectedValue: displayValue,
      menuItems : this.props.selectedIds,
      isModalOpen: false,
      
    });

  }
  // 모달의 열림/닫힘 상태를 관리하는 state 추가
  state = {
    isModalOpen: false,
  };

  // 모달 열기 함수
  openModal = () => {
    this.setState({
      isModalOpen: true,
      modalTextFieldValue: '' // 모달 열때마다 모달안의 TextField를 초기화
    });
  };
  // 모달 닫기 함수
  closeModal = () => {
    this.setState({ isModalOpen: false, selectedchecked: '' });
  };

  handleMenuItemClick = (value) => {
    this.setState({ selectedValue: value });
    this.props.onTextFieldChange(value);
  };


  handleKeyDown = (e, value) => {
    // F2 키를 누르면 모달을 열고 부모의 onHandleKeyDown 함수도 호출
    if (e.key === 'F2') {
      this.openModal();
    } else if (e.key === 'Enter') {
      this.openModal();
    }

    if (this.props.onHandleKeyDown) {
      this.props.onHandleKeyDown(e, value);

    }

  };
  // 모달 내에서 엔터를 치면 해당 코드피커의 M
  handleKeyDownModal = (e, value) => {
    if (e.key === 'Enter') {
      this.props.onhandleKeyDownModal(e, value);
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

  deleteMenuItem = (valueToDelete) => {
    console.log("@@@@@@"+valueToDelete);
    const updatedMenuItems = this.state.menuItems.filter(
      item => item[this.props.codeField] !== valueToDelete
    );
    this.setState({ menuItems: updatedMenuItems });
  };
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

    

    console.log("this.props.selectedIds[0].valueField"+this.props.selectedIds.valueField);
    
    console.log("Selected IDs:", JSON.stringify(this.props.selectedIds));
    console.log("Item value:", this.props.valueField);
    console.log("length"+this.props.selectedIds.length);
    // 드롭다운
    const open1 = Boolean(anchor1);
    // const { content } = this.props;
    
    return (
      <div>
        <div style={{ position: 'relative', width: '194px', height: '42px' }}>
          <TextField
            style={{ display: "flex", boxSizing: 'border-box', width: '190px' }}
            variant="outlined"
            onKeyDown={(e) => this.handleKeyDown(e, this.props.textFieldValue)}
            name="textFieldValue"
            value={this.state.selectedValue || this.props.textFieldValue }
            // onChange={this.props.onTextInputChange}
            inputProps={{ style: { height: '2px' } }}
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
            <InsertInvitationIcon
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
            style={{ marginLeft: '-135px' }}
          >
          {(this.state.menuItems || []).map((item, index) => (
            <MenuItem key={index} onClick={() => this.handleMenuItemClick(item[valueField])}>
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
          ))}







            
            {/* { this.props.selectedIds.length ===1 && 
              menuItems?.map((item, index) => {
                return (
                  <MenuItem key={index} onClick={() => this.handleMenuItemClick(item[this.props.valueField])}>
                    {this.props.dispType === 'codeAndValue' ?
                      '[' + item[this.props.codeField] + ']' + item[this.props.valueField]
                      : this.props.dispType === 'codeAndValueAndValue' ?
                        '[' + item[this.props.codeField] + ']' + ' ' + item[this.props.valueField] + ' ' + item[this.props.valueField2]
                        : item[this.props.valueField]
                    }
                    </MenuItem>
                  );               
              })
            }
            { this.props.selectedIds.length >1 && 
              menuItems?.map((item, index) => {
                return (
                  <MenuItem key={index} onClick={() => this.handleMenuItemClick(item[this.props.valueField])}>
                    {this.props.dispType === 'codeAndValue' ?
                      '[' + item[this.props.codeField] + ']' + item[this.props.valueField]
                      : this.props.dispType === 'codeAndValueAndValue' ?
                        '[' + item[this.props.codeField] + ']' + ' ' + item[this.props.valueField] + ' ' + item[this.props.valueField2]
                        : item[this.props.valueField]
                    }
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        this.props.onDeleteMenuItem(item[codeField]); // 부모로부터 전달받은 삭제 함수 호출
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </MenuItem>
                  );               
              })
            } */}
          </Popover>
        </div>

        {/* 모달창 */}
        <div>
          <Dialog open={this.state.isModalOpen}
            onClose={this.closeModal}
            maxWidth="sm"
            PaperProps={{
              style: {
                minHeight: '65vh', 
              },
            }}
            fullWidth
          >
            <DialogTitle>
              <Grid container alignItems="center" >
                <Grid item xs={6} display="flex" alignItems="center" marginTop={-2.5} >
                  <Typography sx={{ fontsize: '24px', fontWeight: 'bolder', mt: 1 }}>{this.props.pickerTitle}</Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end" marginTop={-1}>
                  <button style={{ justifyContent: 'space-between', backgroundColor: 'transparent', border: 'none', fontSize: '18px' }} onClick={this.closeModal}>X</button>
                </Grid>
              </Grid>
            </DialogTitle>

            <Divider sx={{ ml: 3, mt: -1, width: '29vw' }} />

            <DialogContent>

              <div style={{ display: 'flex', flexDirection: 'itemm' }}>
                <Box sx={{ maxWidth: '100%', maxHeight: '100%', width: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px', mt: -1, ml: 0.5 }}>
                  <Grid item xs={12} display="flex" alignItems="center">
                    <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>검색어</Typography>
                    <TextField
                      sx={{ width: '35%', ml: 1 }}
                      onKeyDown={(e) => this.handleKeyDownModal(e, this.state.modalTextFieldValue)}
                      name="modalTextFieldValue"
                      value={this.state.modalTextFieldValue}
                      onChange={(e) => this.setState({ modalTextFieldValue: e.target.value })}
                      variant="outlined" size="small"
                      inputProps={{ style: { height: '12px' } }} />
                    <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 26, width: '30px', height: '30px' }}
                      onClick={(e) => this.props.onHandleOnClick(e, this.props.textFieldValue)}>
                      <SearchIcon />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} display="flex" alignItems="center">
                    <Typography variant="subtitle1" sx={{ ml: 9, mt: 0.5, mr: 0.2, fontSize: '12px', fontWeight: 'bold' }}>범위</Typography>
                    <FormControlLabel control={
                      <Checkbox
                        size="small"
                        sx={{
                          ml: 0.5,
                        }}
                      />
                    }
                    />
                    <Typography variant="subtitle1" sx={{ ml: -3, mt: 0.5, fontSize: '12px', alignItems: 'center' }}>기준일</Typography>
                    {/* <TextField  sx={{ width: '20%', ml: 5}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: "100%" }}>
                      <DatePicker
                        // onChange={(date) => this.props.onInputChange({ target: { name: 'est_dt', value: date } })} 
                        variant="outlined"
                        InputProps={{ style: { height: 30, padding: '0 10px' } }}
                        style={{ width: "100%" }}
                        slotProps={{ textField: { size: 'small' } }}
                      />
                    </LocalizationProvider>
                    <FormControlLabel control={
                      <Checkbox
                        checked={this.props.selectAllCheckbox}
                        onClick={this.props.handleToggleAllCheckboxes}
                        size="small"
                        sx={{
                          ml: 3,
                        }}
                      />
                    }
                    />
                    <Typography variant="subtitle1" sx={{ ml: -3, mt: 0.5, fontSize: '12px', alignItems: 'center' }}>전체</Typography>
                  </Grid>
                </Box>
              </div>
              <Grid container alignItems="center" marginBottom={-6}>
                <Grid item xs={12} display="flex" justifyContent="flex-end" marginTop={1} >
                  <button style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '24px', width: '10%', fontSize: '11px', fontWeight: 'bold' }}>초기화</button>
                </Grid>
              </Grid>

            </DialogContent>

            <DialogContent>
              {/* Instead of DataGrid, use a regular Grid for table-like layout */}
              <div style={{ maxHeight: 310, minHeight: 310, width: '100%', overflow: 'auto', marginTop: '-21px' }}>
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


                    {menuItems?.map((item, index) => (
                      <tr key={index}
                        onClick={() => this.handleMenuItemClick(item[this.props.valueField])}
                        style={{ borderBottom: '1px solid #D3D3D3' }}
                      >
                        <td style={{ width: 8, padding: '4px', textAlign: 'center', borderLeft: '1px solid #D3D3D3', borderRight: '1px solid #D3D3D3' }}>
                          {/* 체크박스 */}
                          <input
                            type="checkbox"
                            checked={item.checked} 
                            onChange={() => this.props.handleToggleCheckbox(item[this.props.codeField])}
                          />
                        </td>
                        <td style={{ width: 130, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                          {/* 회사 코드 */}
                          {item[this.props.codeField]}
                        </td>
                        <td style={{ width: 170, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                          {/* 회사명 */}
                          {item[this.props.valueField]}
                        </td>
                        {
                          this.props.dispType === 'codeAndValueAndValue' &&
                          <td style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                            {item[this.props.valueField2]}
                          </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </DialogContent>
            <Grid container justifyContent="center" alignItems="center" mt={0} mb={0} ml={0} backgroundColor={"#f2f2f2"} height={'50px'}>
              <Grid item mb={0}>
                <button onClick={this.closeModal} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold' }}>취소</button>
              </Grid>
              <Grid item mb={0} ml={1}>
                <button onClick={this.saveModalCheckedItems} style={{ background: '#00d2ff', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold', color: 'white', backgroundColor: '#0095ff' }}>확인</button>
              </Grid>
            </Grid>
          </Dialog>

        </div>
      </div>

    );
  }
}

export default CodePicker;