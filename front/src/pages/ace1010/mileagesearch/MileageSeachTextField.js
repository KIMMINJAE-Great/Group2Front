import React, { Component } from 'react';

import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import axios from 'axios';


class MileageSeachTextField extends Component {
  state = {
    query: '',
    results: null,
    error: null,
    addresses: [],
    boundary: null,

    isDropdownVisible: false,
    selectedAddress: '',
    selectedBoundary: null,
    selectedLongitude: null,
    selectedLatitude: null,
  };

  //카드리스트 클릭시 바로 반영되도록
  componentDidUpdate(prevProps) {
    if (prevProps.SearchKeyword !== this.props.SearchKeyword) {
      this.setState({ query: this.props.SearchKeyword });
    }
  }

  //위도와 경도 찾는 코드!
  handleGetAddrAndCoord = async () => {
    const { query } = this.state;
    try {
      const response = await axios.get('https://map.naver.com/v5/api/search', {
        params: {
          caller: 'pcweb',
          query: query,
          page: 1,
          displayCount: 20,
          isPlaceRecommendationReplace: true,
          lang: 'ko'
        }
      });
      const data = response.data;
      if (data.result && data.result.place) {
        const boundary = data.result.place.boundary;
        const addresses = data.result.place.list.map(item => ({
          address: item.address,
          boundary: boundary,
        }));
        this.setState({
          addresses,
          error: null
        });
      } else {
        this.setState({
          error: 'Data not found',
          addresses: null,
          boundary: null
        });
      }
    } catch (error) {
      this.setState({ error: '검색 실패..', boundary: null, addresses: [] });
    }
  };

  //주소 텍스트필드 onChange 핸들러
  handleSelectedAddressChange = (e) => {
    this.setState({ selectedAddress: e.target.value });
  };
  //검색부분 onChange 핸들러
  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  toggleDropdown = () => {
    this.setState(prevState => ({ isDropdownVisible: !prevState.isDropdownVisible }));
  };

  //드롭다운에서 주소 선택을 누르면 실행되는 코드
  selectAddress = (address, boundary) => {
    // boundary의 배열이 아니거나, 배열의 길이가 2보다 작을 때 
    if (!Array.isArray(boundary) || boundary.length < 2) {
      console.error("유효하지 않음");
      return;
    }

    // boundary의 첫 번째 값과 두 번째 값을 각각 longitude와 latitude로 설정
    const longitude = boundary[0];
    const latitude = boundary[1];

    this.setState({
      selectedAddress: address,
      selectedBoundary: boundary,
      isDropdownVisible: false,

      selectedLongitude: longitude,
      selectedLatitude: latitude,
    }, () => {
      this.handleSendCoordData(); // 위도 경도를 부모로 보내는 코드 실행!
      this.handleSendAddr1Data(); // 상세주소(addr1)을 부모로 보내는 코드 실행!
      this.handleSendAddrData(); //쿼리값...즉 출발지와 도착지 값 보내는 코드 실행!
    }
    );
  };
  //위도 경도를 부모로 보내는 코드!
  handleSendCoordData = () => {
    const { selectedLongitude, selectedLatitude } = this.state;
    this.props.onSendCoordData(selectedLongitude, selectedLatitude);
  };
  // 상세주소를 부모로 보내는 코드!
  handleSendAddr1Data = () => {
    const { selectedAddress } = this.state;
    this.props.onSendAddr1Data(selectedAddress);
  }
  //쿼리값...즉 출발지와 도착지 값 보내는 코드!
  handleSendAddrData = () => {
    const { query } = this.state;
    this.props.onSendAddrData(query);
  }


  render() {
    const { query, boundary, addresses, error, isDropdownVisible, selectedAddress } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Grid container xs={12}>
          <Grid item xs={10}>
            <TextField
              name="endFieldValue"
              value={query}
              style={{ marginBottom: '3px' }}
              onChange={this.handleInputChange}
              inputProps={{ style: { height: '5px', fontSize: '12px' } }}
              InputProps={{
                style: { height: '30px', width: '355px' },

              }}
            />
          </Grid>
          <Grid item xs={1.8}>
            <Button
              onClick={this.handleGetAddrAndCoord}
              variant='outlined'
              style={{ marginLeft: '5px', marginBottom: '2px', }}
            >
              찾기
            </Button>
          </Grid>
        </Grid>
        {/* 선택한 주소를 표시하는 텍스트 필드 */}
        <TextField
          fullWidth
          name="selectedAddress"
          value={selectedAddress}
          onChange={this.handleSelectedAddressChange}
          onFocus={this.toggleDropdown}
          inputProps={{ style: { height: '5px', fontSize: '12px' } }}
          InputProps={{
            style: { height: '30px' },
          }}
        />
        {/* 드롭다운 목록 */}
        {isDropdownVisible && addresses.length > 0 && (
          <div style={{
            border: '1px solid #ccc',
            position: 'absolute',
            zIndex: 1000,
            background: 'white',
            width: '128px',
            // height: '20px', 
            maxHeight: '150px',
            overflowY: 'auto',
            top: '60px',
          }}>
            {addresses.map((item, index) => (
              <div
                key={index}
                style={{ padding: '10px', cursor: 'pointer', fontSize: '12px', }}
                onClick={() => this.selectAddress(item.address, item.boundary)}
              >
                {item.address}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MileageSeachTextField;