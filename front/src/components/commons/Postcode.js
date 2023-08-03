import React from "react";
import { Button } from '@mui/material';
class Postcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: null,
    };
    this.postcode = null; // daum.Postcode 인스턴스를 저장하기 위한 변수
  }


  componentDidMount() {
    this.postcode = new window.daum.Postcode({
      oncomplete: (data) => {
        this.props.onComplete(data);
      }
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.postcode.open();
  }

  render() {
    return (
      <div>
        <div id="searchDaumPostcode"></div>
        <Button sx={{ width: '130px', marginBottom: '5px' }} onClick={this.handleClick}>우편번호 찾기</Button>
      </div>);
  }
}

export default Postcode;