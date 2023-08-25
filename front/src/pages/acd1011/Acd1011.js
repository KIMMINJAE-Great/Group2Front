import React, { Component } from 'react';




class Acd1011 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '18',
      minutes: '00',
      isOpen: false
    };


    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleHoursChange(e) {
    this.setState({ hours: e.target.value });
  }

  handleMinutesChange(e) {
    this.setState({ minutes: e.target.value });
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const a = "setWrapperRef"
    this[a]()
    const hours = [];
    for (let i = 0; i <= 23; i++) {
      hours.push(i < 10 ? '0' + i : '' + i);
    }

    const minutes = [];
    for (let i = 0; i <= 59; i++) {
      minutes.push(i < 10 ? '0' + i : '' + i);
    }

    return (
      <div ref={this.setWrapperRef}>
        <div onClick={this.toggleOpen}>
          현재 시간: {this.state.hours}:{this.state.minutes}
        </div>
        {this.state.isOpen && (
          <div>
            <label>시간:
              <select value={this.state.hours} onChange={this.handleHoursChange.bind(this)}>
                {hours.map((hour, index) =>
                  <option key={index} value={hour}>{hour}</option>
                )}
              </select>
            </label>
            <label>분:
              <select value={this.state.minutes} onChange={this.handleMinutesChange}>
                {minutes.map((minute, index) =>
                  <option key={index} value={minute}>{minute}</option>
                )}
              </select>
            </label>
          </div>
        )}


      </div>
    );
  }
}

export default Acd1011;
