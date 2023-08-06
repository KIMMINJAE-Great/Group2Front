import React from 'react';



import { Grid, IconButton, Dialog, DialogContent, TextField, Typography, Divider, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';

import Popover from '@mui/material/Popover';

import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
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
      isModalOpen:'',
      showMenu: false,
      // menuItems: [],
      selectedIds: [], // 선택된 행의 ID를 저장할 배열 //모달
      // selectedValue:'',//선택되는 값 // 드롭다운
      // textFieldValue: '', //텍스트필드에 입력할 값 // 드롭다운
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
    this.setState({ 
      isModalOpen: false ,
      item: this.props.selectedIds,
    });
    
  };
  // 모달의 열림/닫힘 상태를 관리하는 state 추가
  state = {
    isModalOpen: false,
  };

  // 모달 열기 함수
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  // 모달 닫기 함수
  closeModal = () => {
    this.setState({ 
      isModalOpen: false ,
    });
  };

  handleMenuItemClick = (value) => {
    this.props.onTextFieldChange(value);

  
  };


  handleKeyDown = (e , value) => {
    // F2 키를 누르면 모달을 열고 부모의 onHandleKeyDown 함수도 호출
    
    
    if (e.key === 'F2') {
      this.openModal();
    }
    if (this.props.onHandleKeyDown) {
      this.props.onHandleKeyDown(e, value);
      if(this.props.menuItems.length >= 2){
        this.openModal();
      }
    }
    
  };

  render() {
    const { anchor1, selectedValue, } = this.state;
    const { menuItems, deleteMenuItem, valueField, codeField, selectedIds } = this.props;
    this.handleDropDown = this.handleDropDown.bind(this);
    
    const { isModalOpen } = this.state; // 모달 열림/닫힘 상태

    // 드롭다운
    const open1 = Boolean(anchor1);
    const { content } = this.props;
    return (
      <div>
        <div style={{ position: 'relative', width: '179px', height: '42px' }}>
          <TextField
            style={{ display: "flex", boxSizing: 'border-box', width: '175px' }}
            variant="outlined"
            onKeyDown={(e) => this.handleKeyDown(e, this.props.textFieldValue)}
            name="textFieldValue"
            value={this.props.textFieldValue}
            onChange={this.props.onTextInputChange}
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
            style={{ marginLeft: '-120px' }}
          >  
         {
            menuItems?.map((item,index) => {
              // selectedIds가 있고, item.id가 selectedIds에 포함되어 있을 경우에만 MenuItem을 렌더링
              if (this.props.selectedIds && this.props.selectedIds.includes(item[this.props.valueField])) {
                console.log("111이게 실행된거야!");
                return (
                  <MenuItem key={index} onClick={() => this.handleMenuItemClick(item[this.props.valueField])}>
                    {this.props.dispType === 'codeAndValue' ? 
                      '[' + item[this.props.codeField] + ']' + item[this.props.valueField] 
                      : this.props.dispType === 'codeAndValueAndValue' ? 
                      '[' + item[this.props.codeField] + ']' + item[this.props.valueField] + item[this.props.valueField2] 
                      : item[this.props.valueField]
                    }
                  <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            this.props.deleteMenuItem(item[this.props.codeField]); // 부모로부터 전달받은 삭제 함수 호출
                          }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </MenuItem>
                );
              }
              // selectedIds가 없을 경우 모든 MenuItem을 렌더링
              else if (!this.props.selectedIds || this.props.selectedIds.length === 0) {
                
                console.log("222이게 실행된거야!");
                return (
                  <MenuItem key={index} onClick={() => this.handleMenuItemClick(item[this.props.valueField])}
                  onClose={this.handleClose1}>
                    {this.props.dispType === 'codeAndValue' ? 
                      '[' + item[this.props.codeField] + ']' + item[this.props.valueField] 
                      : this.props.dispType === 'codeAndValueAndValue' ? 
                      '[' + item[this.props.codeField] + ']' + '  ' + item[this.props.valueField] +'  '+ item[this.props.valueField2] 
                      : item[this.props.valueField]
                    }
                    <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            this.props.deleteMenuItem(item[this.props.codeField]); // 부모로부터 전달받은 삭제 함수 호출
                          }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </MenuItem>
                );
              }
              // 그 외의 경우에는 아무 것도 렌더링
              else {
                return null;
              }
            })
          }
          </Popover>
        </div>

    {/* 모달창 */}
        <div>
          <Dialog open={this.state.isModalOpen} 
            onClose={this.closeModal}
            maxWidth="sm"
            fullWidth 
          >
          <DialogTitle>
            <Grid container alignItems="center">
              <Grid item xs={6} display="flex" alignItems="center">
                <Typography sx={{fontsize: '24px', fontWeight: 'bold', mt: 1}}>사원코드</Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <button style={{justifyContent: 'space-between', backgroundColor: 'transparent', border: 'none', fontSize: '18px'}} onClick={this.closeModal}>X</button>
              </Grid>
            </Grid>
          </DialogTitle>

          <Divider sx={{ ml: 3, width: '29vw'}} />

          <DialogContent>
            
            <div style={{ display: 'flex', flexDirection: 'itemm' }}>
              <Box sx={{ maxWidth: '100%', maxHeight: '100%', width: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px', mt: -1, ml: 0.5 }}>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>검색어</Typography>
                  <TextField  
                    sx={{ width: '35%', ml: 1}} 
                    onKeyDown={(e) => this.handleKeyDown(e, this.props.textFieldValue)}
                    name="textFieldValue"
                    value={this.props.textFieldValue}
                    onChange={this.props.onTextInputChange}
                    variant="outlined" size="small" 
                    inputProps={{ style: { height: '12px' } }} />
                  <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 26, width: '30px', height: '30px' }}>
                    <SearchIcon />
                  </IconButton>
                </Grid>
                  
              <Grid item xs={12} display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>범위</Typography>
                  <FormControlLabel control={
                      <Checkbox
                        size="small"
                        sx={{ ml:0.5,
                        }}
                      />
                    }
                  />   
                  <Typography variant="subtitle1" sx={{ml:-3, fontSize: '12px', fontWeight: 'bold' }}>기준일</Typography>
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
                          size="small"
                          sx={{ ml:3,
                          }}
                        />
                      }
                    />
                  <Typography variant="subtitle1" sx={{ml: -3, fontSize: '12px', fontWeight: 'bold' }}>전체</Typography>
                </Grid>
              </Box>
            </div>
              <Grid container alignItems="center">
                <Grid item xs={12} display="flex" justifyContent="flex-end" marginTop={1}>
                  <button  style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '23px', width: '10%', fontSize: '11px', fontWeight: 'bold' }}>초기화</button>
                </Grid>
              </Grid>

              </DialogContent>
                  
                <DialogContent>
                {/* Instead of DataGrid, use a regular Grid for table-like layout */}
                <div style={{ maxHeight: 300, width: '100%', overflow: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                      <thead>
                      <tr style={{ borderBottom: '1px solid #D3D3D3' }}>
                        <th style={{ width: 80, padding: '8px', textAlign: 'center' }}>
                            {/* 체크박스 열 */}
                            <input type="checkbox" onChange={this.handleAllCheck} /> 
                        </th>
                        <th style={{ width: 10, padding: '8px', textAlign: 'center' }}>
                            {this.props.pickerCodeName}
                        </th>
                        <th style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                          {this.props.pickerName}
                        </th>
                        {
                          // 부모로부터 전달받은 dispType 가 cvv일때
                          this.props.dispType === 'codeAndValueAndValue' &&
                          <th style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                            {this.props.pickerName2}
                          </th>
                        }
                        <th style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                          삭제
                        </th>
                      </tr>
                      </thead>
                      <tbody>


                      {menuItems?.map((item, index) => (
                      <tr key={index} 
                      onClick={() => this.handleMenuItemClick(item[this.props.valueField])}
                      style={{ borderBottom: '1px solid #D3D3D3' }}
                      >
                        <td style={{ width: 80, padding: '8px', textAlign: 'center' }}>
                          {/* 체크박스 */}
                          <input
                            type="checkbox"
                            checked={this.props.selectedIds.includes(item[this.props.valueField])}
                            onChange={(e) => {
                              e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
                              this.props.toggleMenuItemCheck(item[this.props.valueField]);
                            }}
                          />
                        </td>
                        <td style={{ width: 50, padding: '8px', textAlign: 'center' }}>
                          {/* 코드 */}
                          {item[this.props.codeField]}
                        </td>
                        <td style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                          {/* 이름 */}
                          {item[this.props.valueField]}
                        </td>
                        {
                          this.props.dispType === 'codeAndValueAndValue' &&
                          <td style={{ width: 150, padding: '8px', textAlign: 'center' }}>
                          {item[this.props.valueField2]}
                          </td>
                        }
                        <td style={{ width: 50, padding: '8px', textAlign: 'center' }}>
                        {/* 휴지통 이미지 */}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            this.props.deleteMenuItem(item[this.props.codeField]); // 부모로부터 전달받은 삭제 함수 호출
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        </td>
                      </tr>
                    ))}
                      </tbody>
                    </table>
                  </div>
                  <Grid container justifyContent="center" alignItems="center" spacing={2} mt={2}>
                    <Grid item>
                      <button onClick={this.closeModal} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '23px', width: '100%', fontSize: '11px', fontWeight: 'bold', mr: 10 }}>취소</button>
                    </Grid>
                    <Grid item>
                      <button onClick={this.saveModalCheckedItems} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '23px', width: '100%', fontSize: '11px', fontWeight: 'bold', ml: 10 }}>확인</button>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>            
        </div>
      </div>
        
    );
  }
}

export default CodePicker;