import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import "./ace1010.css";
import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import { post } from '../../components/api_url/API_URL';


class DrivingRecordCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'option1',
      startDate: new Date(),
      endDate: new Date(),
      weekendDates: [],
      selectedRows : this.props.selectedRows,
    };
  }
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
    console.log("dateArray : ", dateArray)
    // 반환할 dateArray 배열을 초기화

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

  // 확인 버튼을 클릭했을 때 실행될 함수 -- 경호
  handleCopyDrivingRecord = () => {

    // 3일부터 10일 까지 복사를 가정한다면 3,4,5,6,7,8,9,10  총 8개의 날짜가 입력된 배열이 만들어 져야한다.
    // selectedRows의 갯수 2개니깐 
    // 날짜배열길이 == dateArray.length
    // selectedRows[j].use_dt(dateArray[i]) <- 이걸 finalData 배열에 하나씩 넣는다 

    // seq_nb가 4인 곳에 use_dt도 8월 3일로 바꾼다
    //이 행위를 날짜 배열만큼 반복한다
    // 그런다음 이걸 List<AbizCarPersonDTO> 타입으로 서버에서 받고 그대로 저장을 한다. 리액트에서는 {data : 배열객체} 만 해도 된다.
    const { startDate, endDate } = this.state;
    const { selectedRows } = this.props;
    const filteredDates = this.getDatesWeekends(startDate, endDate);
    const dateArray = this.getDatesWeekends(startDate, endDate);
    console.log(selectedRows)
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
   console.log('포이치실행')
   console.log(finalData)
  //  finalData.forEach(item =>  console.log(item.use_dt));
  //   console.log("finalData : ", finalData);
  //  console.log("dateArray : ", dateArray);
  //  console.log("dateArray.length : ", dateArray.length);
  //  console.log("result : ", result);

 
    // selectedRows와 filteredDates를 합치기
  const selectedData = [...selectedRows, ...filteredDates];

    // 주말을 제외한 날짜 배열을 가져옴
    console.log("확인 @@@@@@@@2 this.props.selectedRows : ", selectedData);

    post('/ace1010/selectedCopy', { dates: [selectedData] })
      .then(response => {
        console.log('Data successfully sent to server:', response.data);
        console.log('post로 전달 갔수~~~~~~~~~~~~ selectedRows 값은 ===> ', selectedData);

      })
      .catch(error => {
        console.error('Error sending data:', error);
    });
    //주말제외값 저장
    this.setState({ weekendDates: filteredDates });
    // LocalStorage에 저장
    localStorage.setItem('selectedDates', JSON.stringify(filteredDates));
    // 콘솔에 해당 날짜들을 출력.
    console.log('Copying data for:', filteredDates);

    // const user = JSON.parse(sessionStorage.getItem('user'));

    //   const insertid = user.emp_id;

    //   const cocd = selectedData[0].co_cd;
    //   const empcd = selectedData[0].emp_cd;
    //   const carcd = selectedData[0].car_cd;

    // if (selectedData[0].seq_nb !== 0) {


    //   const dataWithIds = selectedData.map((item, index) => {
    //     return {
    //       ...item,
    //       use_dt: new Date(item.use_dt),
    //       // modify_id: modifyid,
    //       co_cd: cocd,
    //       // emp_cd: empcd,
    //       car_cd: carcd,
    //       id: index + 1,
    //       origin: 'Y',

    //     };
    //   });

    //   const maxId = Math.max(...dataWithIds.map(item => item.id));

    //   // 빈 행을 생성
    //   const emptyRow = {
    //     id: maxId + 1,
    //     car_cd: carcd,
    //     co_cd: cocd,
    //     seq_nb: 0,
    //     emp_cd: empcd,
    //     send_yn: '2',
    //     insert_id: insertid,
    //     origin: 'N',
    //     rmk_dc: '',
    //     use_fg: '',

    //   };

    //   this.setState({ rows: [...dataWithIds, emptyRow] });


    // } else {
    //   // 차량등 등록되어 있지만 운행기록이 없을 때
    //   // 빈 행을 생성
    //   const emptyRow = {
    //     id: 1,
    //     car_cd: carcd,
    //     co_cd: cocd,
    //     seq_nb: 0,
    //     emp_cd: empcd,
    //     insert_id: insertid,
    //     send_yn: '2',
    //     origin: 'N',
    //     rmk_dc: '',
    //     use_fg: '',
    //   };
    //   this.setState({ rows: [emptyRow] });
    // }
  
    
    this.closeModal();
  };

  handleStartDateChange = (selectedDate) => {
    const endDate = new Date(this.state.endDate);
    if (selectedDate > endDate) {
        alert("시작 날짜는 끝 날짜보다 뒤에 있을 수 없습니다.");
        return;
    }
    this.setState({ startDate: selectedDate });
  };
  handleEndDateChange = (selectedDate) => {
    const startDate = new Date(this.state.startDate);
    if (selectedDate < startDate) {
        alert("끝 날짜는 시작 날짜보다 앞설 수 없습니다.");
        return;
    }
    this.setState({ endDate: selectedDate });
  };


  handleOptionChange = (event) => {
    this.setState({
      selectedValue: event.target.value
    });
  };

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };



  
 
  
  render() {
    

    // 컴포넌트를 렌더링하는 메서드입니다.
    const { startDate, endDate } = this.state;
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
            Pap
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
          
        </div>


      </div>
    );
  }
}

export default DrivingRecordCopy;
