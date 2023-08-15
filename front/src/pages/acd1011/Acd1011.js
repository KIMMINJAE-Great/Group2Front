import React, { Component } from 'react';


import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import DrivingRecordCopy from '../ace1010/DrivingRecordCopy';


class Acd1011 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'option1',
      startDate: new Date(),
      endDate: new Date(),
      weekendDates: []
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

  // 확인 버튼을 클릭했을 때 실행될 함수
  handleCopyDrivingRecord = () => {
    const { startDate, endDate } = this.state;
    const filteredDates = this.getDatesWeekends(startDate, endDate);
    // 주말을 제외한 날짜 배열을 가져옴

    axios.post('YOUR_BACKEND_ENDPOINT', { dates: filteredDates })
      .then(response => {
        console.log('Data successfully sent to server:', response.data);
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
        <DrivingRecordCopy></DrivingRecordCopy>
        
        


      </div>
    );
  }
}

export default Acd1011;
