import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

class baseDistance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  handleOpenBd = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <div>

        <button onClick={this.handleOpenBd}>기초거리 입력</button>
        <Dialog
          open={isModalOpen}
          onClose={this.closeModal}
          maxWidth="xs"
        //   PaperProps={{
        //     style: {
        //       minHeight: '65vh',
        //     },
        //   }}
          fullWidth
        >
          <DialogTitle>차량 기초거리 입력</DialogTitle>
          <Divider sx={{ ml: 3, mt: -1, width: '20vw' }} />
          <DialogContent>
          <Grid item xs={12} display="flex" alignItems="center">
            <Typography variant="subtitle1" sx={{ marginLeft: 0, fontSize: '13px' }}>차량정보 : (데이터 조회할 값)</Typography>
            <TextField
                      sx={{ width: '35%', ml: 1, 
                      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                        borderBottom: 'none', // 하단 선 제거
                      },
                      '& input': {
                        pointerEvents: 'none', // 입력 비활성화
                      },'& input': {
                        pointerEvents: 'none', // 입력 비활성화
                      },}}
                      InputProps={{
                        readOnly: true, // 읽기 전용 설정
                      }}
                    //   value={this.props.textFieldValue}
                    //   onChange={this.props.onTextInputChange}
                    variant="standard"
                       size="small"
                       
                      inputProps={{ style: { height: '12px' } }} />
              
                </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
            <Typography variant="subtitle1" sx={{ marginLeft: 0, fontSize: '13px' }}>기초거리(km) : </Typography>
                <TextField
                      sx={{ width: '35%', ml: 1 }}
                    //   value={this.props.textFieldValue}
                    //   onChange={this.props.onTextInputChange}
                      variant="outlined" size="small"
                      inputProps={{ style: { height: '12px' } }} />
            </Grid>

          </DialogContent>
          <DialogContent>
            <div style={{  }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  {/* ... */}
                </thead>
                <tbody>
                  {/* ... */}
                </tbody>
              </table>
            </div>
          </DialogContent>
          <Grid container justifyContent="center" alignItems="center" mt={0} mb={0} ml={0}  height={'50px'}>
            <Grid item mb={0}>
              <button onClick={this.closeModal} style={{ backgroundColor: '#f2f2f2', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '12px' }}>취소</button>
            </Grid>
            <Grid item mb={0} ml={1}>
              <button onClick={this.saveModalCheckedItems} style={{ background: '#f2f2f2', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '12px' }}>확인</button>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default baseDistance;
