import { Popover } from "@mui/material";
import { Component } from "react";


class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '',
      minutes: '',
      isOpen: false
    };


  }

  applyTime = () => {
    const selectedTime = `${this.state.hours}:${this.state.minutes}`;

    if (this.props.onTimeChange) {
      this.props.onTimeChange(selectedTime);
    }
    this.setState({ isOpen: false });
  }
  handleClose = () => {
    this.setState({ isOpen: false });
    // 부모 컴포넌트의 onClose 콜백을 호출
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleHoursChange = (e) => {
    e.stopPropagation();
    this.setState({ hours: e.target.value });
  }

  handleMinutesChange = (e) => {
    console.log(e.target.value);  // 추가된 부분
    let minuteVal = e.target.value;
    if (minuteVal === "00" || minuteVal === "0" || minuteVal === 0) {
      this.setState({ minutes: "00" }, () => {
        if (this.state.hours && this.state.minutes) {
          this.applyTime();
        }
      });
    } else {
      this.setState({ minutes: minuteVal }, () => {
        if (this.state.hours && this.state.minutes) {
          this.applyTime();
        }
      });
    }
  }

  render() {
    const hours = [];
    for (let i = 0; i <= 23; i++) {
      hours.push(i < 10 ? '0' + i : '' + i);
    }
    hours.unshift('- -')
    const minutes = [];
    for (let i = 0; i <= 59; i++) {
      minutes.push(i < 10 ? '0' + i : '' + i);
    }
    minutes.push('00')
    minutes.unshift('- -')
    return (
      <Popover
        open={this.props.timeopen}
        anchorEl={this.props.anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div  >
          <div>
            <select onChange={this.handleHoursChange} style={{ width: 45, height: 40, border: 0, marginLeft: 10 }}>
              {hours.map((hour, index) =>
                <option style={{ width: 100 }} key={index} value={hour}>{hour}</option>
              )}
            </select>
            :
            <select onChange={this.handleMinutesChange} style={{ width: 45, height: 40, border: 0, marginLeft: 10 }} >
              {minutes.map((minute, index) =>
                <option key={index} value={minute}>{minute}</option>
              )}
            </select>
          </div>
        </div>
      </Popover >
    );
  }
}

export default TimePicker;