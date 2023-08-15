import React, { Component } from 'react';

class ModalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleConfirm = () => {
    this.props.onConfirm(this.state.inputValue);
  }

  render() {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="값을 입력하세요."
          />
          <button onClick={this.handleConfirm}>확인</button>
          <button onClick={this.props.onCancel}>취소</button>
        </div>
      </div>
    );
  }
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }
};

export default ModalInput;