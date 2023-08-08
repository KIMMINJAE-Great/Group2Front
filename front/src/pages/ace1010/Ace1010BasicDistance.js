import React from 'react';
import {
    Alert,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { post } from "../../components/api_url/API_URL";


class Ace1010BasicDistance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: '',
      abizcarNBNM: '',
    };
  }

handleOpenBd = async () =>  {
    try {
      const response ="";
      console.log(response);
      const test = !this.state.isModalOpen;
      this.setState({
        isModalOpen: test,
        abizcarNBNM: response.data,
    });
      if(response.data) {
        console.log(this.state);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  saveModalCheckedItems = () => {
    console.log('확인 버튼이 클릭되었습니다.');
    // 디비로 값 전달
  };

  /* 변경된 값 필드에 저장 => 차량 정보 (차량 번호, 차량명)  */
  abizcarNBNMChange = (value) => {
    this.setState(() => ({
        abizcarNBNM: value,
    }));
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <div>

        <MenuItem onClick={this.handleOpenBd}>기초거리 입력</MenuItem>

        <Dialog
          open={isModalOpen}
          onClose={this.closeModal}
        //   maxWidth="xs"
          PaperProps={{
            style: {
              width: '19vw',
              height: '24vh',
            },
          }}
          fullWidth
        >
          <Grid item xs={12} display="flex" alignItems="center" sx={{ borderBottom: '1px solid gray', height: '35px'}} mb={-1.8} mt={1}>
          <DialogTitle sx={{fontWeight: 'bold'}} >차량 기초거리 입력</DialogTitle>
          </Grid>
          <DialogContent sx={{ overflow: 'hidden'}}>
          <Grid item xs={12} display="flex" alignItems="center" >
            <Typography variant="subtitle1" sx={{ marginLeft: 0, fontSize: '13px' }}>차량정보 :</Typography>
            <TextField
                      sx={{ width: '50%', fontSize: '13px', ml: 1, 
                      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                        borderBottom: 'none', // 하단 선 제거
                      },
                      '& input': {
                        pointerEvents: 'none', // 입력 비활성화
                        fontSize: '13px',
                      },}}
                      InputProps={{
                        readOnly: true, // 읽기 전용 설정
                        disableUnderline: true, // 밑줄 제거
                      }}
                      value={this.state.abizcarNBNM}
                      onChange={(e) => this.abizcarNBNMChange(e.target.value)}
                    variant="standard"
                       size="small"
                      />
              
                </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
            <Typography variant="subtitle1" sx={{ marginLeft: 1.6, fontSize: '13px' }}>기초거리(km) : </Typography>
                <TextField
                      sx={{ width: '50%', ml: 1 }}
                      variant="outlined" size="small"
                      inputProps={{ style: { height: '12px' } }} />
            </Grid>

            <Box>
            <Grid item xs={12} display="flex" alignItems="center" mt={2}>
            <Avatar
        style={{
          backgroundColor: grey[500], // 동그라미 색상
          width: '24px',
          height: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        !
      </Avatar>
            <Typography variant="subtitle1" sx={{ marginLeft: 1, fontSize: '13px' }}> 기초거리는 주행전(km), 주행후(km)를 계산하기 위해 최초 한번만 입력을 해주시면 됩니다. </Typography>
                </Grid>
            </Box>

            <Grid container justifyContent="center" alignItems="center" mt={2} mb={0} ml={0} >
            <Grid item mb={0}>
              <button onClick={this.closeModal} style={{ backgroundColor: '#f2f2f2', border: '1px solid #D3D3D3', height: '25px', width: '60px', fontSize: '12px' }}>취소</button>
            </Grid>
            <Grid item mb={0} ml={1}>
              <button onClick={this.saveModalCheckedItems} style={{ background: '#f2f2f2', border: '1px solid #D3D3D3', height: '25px', width: '60px', fontSize: '12px' }}>확인</button>
            </Grid>
          </Grid>

          </DialogContent>
          
          
        </Dialog>
      </div>
    );
  }
}

export default Ace1010BasicDistance;