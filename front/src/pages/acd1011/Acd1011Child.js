import React from 'react';

class Acd1011Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }

  handleDateChange = (e) => {
    this.setState({ date: e.target.value });
  };

  render() {
    const containerStyle = {
      fontFamily: 'Roboto, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '4px',
      width: '240px',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)'
    };

    const labelStyle = {
      fontSize: '0.875rem',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#333'
    };

    const inputStyle = {
      width: '100%',
      padding: '10px 12px',
      fontSize: '0.875rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      outline: 'none'
    };

    const selectedDateStyle = {
      marginTop: '12px',
      fontSize: '0.8em',
      color: '#555'
    };

    return (
      <div style={containerStyle}>
        <label htmlFor="birthday" style={labelStyle}>생일:</label>
        <input 
          type="date" 
          id="birthday" 
          name="birthday"
          value={this.state.date}
          onChange={this.handleDateChange} 
          style={inputStyle}
        />
        {this.state.date && <div style={selectedDateStyle}>선택된 날짜: {this.state.date}</div>}
      </div>
    );
  }
}
export default Acd1011Child;
