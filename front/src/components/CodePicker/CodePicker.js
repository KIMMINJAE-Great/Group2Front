import React from 'react';



import { Grid, IconButton, Dialog, DialogContent, TextField, Typography, Divider, FormControlLabel } from '@mui/material';
import { Box, minHeight } from '@mui/system';
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
      isModalOpen: '',
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
      isModalOpen: false,
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
      isModalOpen: false,
    });
  };

  handleMenuItemClick = (value) => {
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
        <div style={{ position: 'relative', width: '194px', height: '42px' }}>
          <TextField
            style={{ display: "flex", boxSizing: 'border-box', width: '190px' }}
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
            style={{ marginLeft: '-135px' }}
            PaperProps={{
              style: {
                width: 'fit-content',
                minWidth: '190px',
              },
            }}

          >
            {
              this.props.menuItems?.map((item, index) => {
                // 아래의 로직은 필요에 따라 변경
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
              })
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
                // maxHeight: '80vh',
                minHeight: '65vh', // 최소 높이를 설정하려면 이 부분을 추가해주세요.
              },
            }}
            fullWidth
          >
            <DialogTitle>
              <Grid container alignItems="center" >
                <Grid item xs={6} display="flex" alignItems="center" marginTop={-2.5} >
                  <Typography sx={{ fontsize: '24px', fontWeight: 'bolder', mt: 1 }}>사원코드</Typography>
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
                      onKeyDown={(e) => this.handleKeyDown(e, this.props.textFieldValue)}
                      name="textFieldValue"
                      value={this.props.textFieldValue}
                      onChange={this.props.onTextInputChange}
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
                        <input type="checkbox" onChange={this.handleAllCheck} />
                      </th>
                      <th style={{ width: 130, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                        {this.props.pickerCodeName}
                      </th>
                      <th style={{ width: 170, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                        {this.props.pickerName}
                      </th>
                      <th style={{ width: 150, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>

                      </th>
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
                            checked={this.props.selectedIds.includes(item[this.props.valueField])}
                            onChange={(e) => {
                              e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
                              this.props.toggleMenuItemCheck(item[this.props.valueField]);
                            }}
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
                        <td style={{ width: 50, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>

                          {/* 휴지통 이미지 */}
                          {/* <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            this.props.deleteMenuItem(item[this.props.codeField]); // 부모로부터 전달받은 삭제 함수 호출
                          }}
                          
                        >
                          <DeleteIcon />
                        </IconButton> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <Grid container justifyContent="center" alignItems="center" spacing={1} mt={7} mb={-2} ml={-3} backgroundColor={"#f2f2f2"} >
                    <Grid item mb={0}>
                      <button onClick={this.closeModal} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '15px', fontWeight: 'bold'}}>취소</button>
                    </Grid>
                    <Grid item mb={0}>
                      <button onClick={this.saveModalCheckedItems} style={{ background: '#00d2ff', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '15px', fontWeight: 'bold', color: 'white', backgroundColor: '#0095ff' }}>확인</button>
                    </Grid>
                  </Grid> */}
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