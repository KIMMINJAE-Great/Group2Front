import React, { Component } from 'react';
import axios from 'axios';
import Acd1011Child from './Acd1011Child';
import { get } from '../../components/api_url/API_URL';
import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';


class Acd1011 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'option1',
      startDate:'',
      endDate:'',
    };
  }
  
  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };
  handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    const startDate = new Date(this.state.startDate);
     // 비교 로직
    if (endDate < startDate) {
      alert("끝 날짜는 시작 날짜보다 앞설 수 없습니다.");
      return; // setState를 실행하지 않고 함수를 종료
    }

    this.setState({ endDate: e.target.value });

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

  copyDrivingRecord = () => {
    
    

    this.closeModal();
  }

  
 
  
  render() {
    return (
      <div>
        <MenuItem
          onClick={this.openModal}
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
                    기간
                  </Grid>
                  <Grid item={3}>                  
                    <input 
                      type="date" 
                      id="startday" 
                      name="startday"
                      value={this.state.date}
                      onChange={this.handleStartDateChange} 
                      style={{width: '100%',
                      padding: '5px 8px',
                      fontSize: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      outline: 'none'}}
                    />
           
                  </Grid>
                  <Grid style={{fontSize: '14px', marginLeft:'3px' ,marginRight:'3px'}}>
                    ~
                  </Grid>
                  <Grid>
                  <input 
                      type="date" 
                      id="endday" 
                      name="endday"
                      value={this.state.date}
                      onChange={this.handleEndDateChange} 
                      style={{width: '100%',
                      padding: '5px 8px',
                      fontSize: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      outline: 'none'}}
                    />
                  </Grid>
                </Grid>
                
              </Grid>
              <hr/>
              <Grid container justifyContent="center" alignItems="center" mt={0} mb={0} ml={0}  height={'50px'}>
                <Grid item mb={0}>
                  
                  <button onClick={this.closeModal} style={{ border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold' }}>취소</button>
                </Grid>
                <Grid item mb={0} ml={1}>
                  <button onClick={this.copyDrivingRecord} style={{  border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold'  }}>확인</button>
                </Grid>
              </Grid>

            </DialogContent>

          </Dialog>
          
        </div>


      </div>
    );
  }
}

export default Acd1011;
