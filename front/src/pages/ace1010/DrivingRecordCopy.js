import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import "./ace1010.css";
import { Alert, Dialog, DialogContent, DialogTitle, Grid, MenuItem, Slide, Snackbar } from '@mui/material';
import { post } from '../../components/api_url/API_URL';

class DrivingRecordCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      startDate: new Date(),
      endDate: new Date(),
      weekendDates: [],
      selectedRows : this.props.selectedRows,
      metamong:false,
    };
  }

  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };
  
  // 주말 확인 함수
  isWeekend(date) {    
    const day = date.getDay();
    return day === 0 || day === 6;
    // 일요일(0) 또는 토요일(6)이면 true를 반환!!
  }

  // 주말을 제외한 날짜 리스트를 반환하는 함수
  getDatesWeekends(startDate, endDate) {    
    let currentDate = new Date(startDate);
    const dateArray = [];

    while (currentDate <= endDate) {
      // startDate부터 endDate까지의 날짜를 순회
      if (!this.isWeekend(currentDate)) {
        // 만약 현재 날짜가 주말이 아니라면,
        dateArray.push(new Date(currentDate));
        // dateArray에 추가
      }
      currentDate.setDate(currentDate.getDate() + 1);
      // 다음 날짜로
    }
    return dateArray;
    // 주말을 제외한 날짜 배열을 반환
  }

  //매일매일 함수
  getDatesDaily(startDate, endDate) {
    let currentDate = new Date(startDate);
    const dateArray = [];

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate)); // 모든 날짜를 배열에 추가
      currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로
    }
    return dateArray;
  }

  // 확인 버튼을 클릭했을 때 실행될 함수 -- 경호
  handleCopyDrivingRecord = () => {
     // 3일부터 10일 까지 복사를 가정한다면 3,4,5,6,7,8,9,10  총 8개의 날짜가 입력된 배열이 만들어 져야한다.
    // selectedRows의 갯수 2개니깐 
    // 날짜배열길이 == dateArray.length
    // selectedRows[j].use_dt(dateArray[i]) <- 이걸 finalData 배열에 하나씩 넣는다 

    // seq_nb가 4인 곳에 use_dt도 8월 3일로 바꾼다
    //이 행위를 날짜 배열만큼 반복한다
    // 그런다음 이걸 List<AbizCarPersonDTO> 타입으로 서버에서 받고 그대로 저장을 한다. 리액트에서는 {data : 배열객체} 만 해도 된다.
    const { startDate, endDate,selectedValue } = this.state;
    const { selectedRows } = this.props;
    if(this.state.selectedValue === '') {
      alert("주말/휴일제외 와 매일 중 하나를 선택해주세요.")
      return;
    }
    if(selectedValue === 'option1') {
    const filteredDates = this.getDatesWeekends(startDate, endDate);
    const dateArray = this.getDatesWeekends(startDate, endDate);
    let finalData = [];

    for(let i = 0; i < dateArray.length; i++){
     for(let j = 0 ;  j< selectedRows.length; j++){
       const rowData = {
            ...selectedRows[j], // 기존 row 데이터 복사
            use_dt: dateArray[i], // use_dt 속성 변경
        };
        finalData.push(rowData);
     }
   }
   const requestData = finalData.map(item => ({
    ...item,
    use_dt: item.use_dt.toISOString(), // 날짜를 ISO 문자열 형식으로 변환
  }));
   
    const response = post('/ace1010/selectedCopy', requestData )
      .then(response => {
        console.log('Data successfully sent to server:', response.data);
        this.props.searchcarforabizpersondrivingcopy();
      })
      .catch(error => {
        console.error('Error sending data:', error);
    });
    //주말제외값 저장
    this.setState({ weekendDates: filteredDates });
    // LocalStorage에 저장
    localStorage.setItem('selectedDates', JSON.stringify(filteredDates));
    
  } else if(selectedValue === 'option2'){

    const filteredDates = this.getDatesDaily(startDate, endDate);
    const dateArray = this.getDatesDaily(startDate, endDate);
    let finalData = [];

    for(let i = 0; i < dateArray.length; i++){
     for(let j = 0 ;  j< selectedRows.length; j++){
       const rowData = {
            ...selectedRows[j], // 기존 row 데이터 복사
            use_dt: dateArray[i], // use_dt 속성 변경
        };
        finalData.push(rowData);
     }
   }
   const requestData = finalData.map(item => ({
    ...item,
    use_dt: item.use_dt.toISOString(), // 날짜를 ISO 문자열 형식으로 변환
  }));
   
    const response = post('/ace1010/selectedCopy', requestData )
      .then(response => {
        console.log('Data successfully sent to server:', response.data);
        this.props.searchcarforabizpersondrivingcopy();
      })
      .catch(error => {
        console.error('Error sending data:', error);
    });
    //주말제외값 저장
    this.setState({ weekendDates: filteredDates });
    // LocalStorage에 저장
    localStorage.setItem('selectedDates', JSON.stringify(filteredDates));
    
  }
    
    this.closeModal();
  };

  handleStartDateChange = (selectedDate) => {
    const endDate = new Date(this.state.endDate);
    if (selectedDate > endDate) {
        alert("시작 날짜는 끝 날짜보다 뒤에 있을 수 없습니다.");
        return;
    }
    this.setState({ startDate: selectedDate, metamong: false });
  };
  handleEndDateChange = (selectedDate) => {
    const startDate = new Date(this.state.startDate);
    if (selectedDate < startDate) {
        alert("끝 날짜는 시작 날짜보다 앞설 수 없습니다.");
        return;
    }
    this.setState({ endDate: selectedDate, metamong: false});
  };

  handleOptionChange = (event) => {
    this.setState({
      selectedValue: event.target.value
    });
  };

  openModal = () => {
    if(this.props.selectedRows.length === 0)
    {
      this.showErrorSnackbar();
    } else if (this.props.selectedRows.length > 0){
      this.setState({
        isModalOpen: true
      });
    }
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleMatamongT = () => {
    this.setState({metamong:true});
  }

  handleMatamongF = () => {
    this.setState({metamong:false});
  }

  render() {
    
    // 컴포넌트를 렌더링하는 메서드입니다.
    const { startDate, endDate, selectedRows } = this.state;
    // state에서 startDate와 endDate를 가져옵니다.

    return (
      <div>
        <MenuItem
          onClick={this.openModal}
          variant="outlined"
        >
          복사
        </MenuItem>

        <div>
          <Dialog
            open={this.state.isModalOpen}
            onClose={this.closeModal}
            maxWidth="xs"
            PaperProps={{
              style: this.state.metamong ?{
                width: "50vw",
                height: "43vh",   // 스크롤바 안생기는 최적화 height
              }: {
                width: "50vw",
                height: "25.6vh", // 스크롤바 안생기는 최적화 height
              },
            }}
          >
            <DialogTitle style={{fontSize: '18px',}}>
              운행기록 복사
              <hr/>
            </DialogTitle>

            <DialogContent>
              <Grid container item xs={12} >
                <Grid container style={{marginBottom:'10px'}}>
                  <Grid >
                    <label style={{ fontSize: '14px', marginRight: '8px' }}>
                      <input 
                        type="radio" 
                        name="options" 
                        value="option1" 
                        checked={this.state.selectedValue === 'option1'} 
                        onChange={this.handleOptionChange} 
                        style={{ height: '14px', width: '12px', marginRight: '4px' }} 
                      />
                      주말/휴일제외
                    </label>

                    <label style={{ fontSize: '14px' }}>
                      <input 
                        type="radio" 
                        name="options" 
                        value="option2" 
                        checked={this.state.selectedValue === 'option2'} 
                        onChange={this.handleOptionChange} 
                        style={{ height: '14px', width: '12px', marginRight: '4px' }} 
                      />
                      매일
                    </label>           
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={{marginBottom:'10px'}}>
                <Grid style={{fontSize: '14px'}} item xs={1}/>
                  <Grid style={{fontSize: '14px', marginRight:'6px'}} item xs={0}>
                    
                  </Grid>
                  <Grid item={3}>                  
                  <div>
                  <span>기간 </span>
                    <DatePicker 
                      onFocus={this.handleMatamongT}
                      onBlur={this.handleMatamongF}
                      selected={startDate} 
                      onChange={this.handleStartDateChange}
                    />
                  </div>
                  </Grid>
                  <Grid style={{fontSize: '14px', marginLeft:'3px' ,marginRight:'3px'}}>
                    ~
                  </Grid>
                  <Grid>
                  <div>
                    
                    <DatePicker 
                      onFocus={this.handleMatamongT}
                      onBlur={this.handleMatamongF}
                      selected={endDate} 
                      onChange={this.handleEndDateChange}
                    />
                  </div>
                  </Grid>
                </Grid>
                
              </Grid>
              <hr/>
              <Grid container justifyContent="center" alignItems="center" mt={0} mb={0} ml={0}  height={'50px'}>
                <Grid item mb={0}>                  
                  <button onClick={this.closeModal} style={{ border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold' }}>취소</button>
                </Grid>
                <Grid item mb={0} ml={1}>
                  <button onClick={this.handleCopyDrivingRecord} style={{  border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold'  }}>확인</button>
                </Grid>
              </Grid>

            </DialogContent>

          </Dialog>
          <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={1000}
          onClose={this.handleCloseSnackbar}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="error"
            sx={{
              width: "100%",
              bgcolor: "error.main",
              ".MuiAlert-icon": {
                color: "#ffffff",
              },
              color: "white",
              fontWeight: "bold",
            }}
          >
            먼저 체크박스에서 운행기록을 선택해 주세요.
          </Alert>
        </Snackbar>
        </div>
      </div>
    );
  }
}

export default DrivingRecordCopy;
