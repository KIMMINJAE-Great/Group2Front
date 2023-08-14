import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Acd1011Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  getDatesWithoutWeekends(startDate, endDate) {
    let currentDate = new Date(startDate);
    const dateArray = [];

    while (currentDate <= endDate) {
      if (!this.isWeekend(currentDate)) {
        dateArray.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  handleCopy = () => {
    const { startDate, endDate } = this.state;
    const filteredDates = this.getDatesWithoutWeekends(startDate, endDate);
    console.log('Copying data for:', filteredDates);

    // 여기에서 실제 복사 로직을 구현합니다.
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div>
        <h1>운행기록부 복사</h1>

        <div>
          <span>시작일: </span>
          <DatePicker 
            selected={startDate} 
            onChange={date => this.setState({ startDate: date })} 
          />
        </div>

        <div>
          <span>종료일: </span>
          <DatePicker 
            selected={endDate} 
            onChange={date => this.setState({ endDate: date })} 
          />
        </div>

        <button onClick={this.handleCopy}>확인</button>
      </div>
    );
  }
}

export default Acd1011Child;