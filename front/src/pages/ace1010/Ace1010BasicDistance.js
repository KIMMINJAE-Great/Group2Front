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
  Slide,
  Snackbar,
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
      startacc_km: '',
      showError: false,
      car_cd : this.props.car_cd,
      co_cd : this.props.co_cd,
      before_km: '',
      openSnackBar: false,
    };
  }

  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };

handleOpenBd = async () =>  {
    const { car_cd } = this.props;

    if (car_cd == '') {
      this.showErrorSnackbar();
      return;
    }

    console.log("car_cd : ", car_cd);

    try {
      const response = await post('/regcar/getCarsInfo', { car_cd } ); // 서버의 API 엔드포인트에 맞게 수정
      const abizcarNBNM = response.data;

      console.log("car_cd : ", car_cd);
      console.log("abizcarNBNM : ", abizcarNBNM);
      console.log("response : ", response);
      console.log("response.data : ", response.data);

      const response2 = await post('/ace1010/selectStartaccKm', { car_cd }); // 두 번째 엔드포인트 호출
      const startacc_km = response2.data.startacc_km
      console.log("response2 실행 :: ");
      console.log("response2 : ", response2);
      console.log("response2.data : ", response2.data);

      console.log("startacc_km : ", startacc_km);

      const test = !this.state.isModalOpen;
      this.setState({
        isModalOpen: test,
        abizcarNBNM: response.data,
        before_km:startacc_km,
      });
  
      if (response.data && response2.data) {
        console.log(this.state);
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };
  

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  /* INSERT 기초거리 입력  */
  insertDistance = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const emp_id = user.emp_id;
    try {
      // const { before_km } = this.state; // 필요한 상태값 가져오기
      const { before_km, car_cd, co_cd } = this.state;

      const requestData = {
        startacc_km: before_km,
        co_cd: co_cd,
        car_cd: car_cd,
        insert_id: emp_id,
        modify_id: emp_id,
    };
    console.log('requestData', requestData);

    // 서버로 POST 요청 전송
    const response = await post('/ace1010/insertStartaccKm', requestData); // 서버의 API 엔드포인트에 맞게 수정

    if (response.data === 'insert success') {
        // 성공적으로 저장되었을 때 처리
        console.log('Insert successful.');
    } else {
        console.log('Insert failed.');
    }

    // 콜백 함수 호출하여 값 전달
    if (this.props.onBeforeKmChange) {
      this.props.onBeforeKmChange(before_km);
    }

    this.closeModal();
} catch (error) {
    console.error('Error:', error);
}
  };

  /* 변경된 값 필드에 저장 => 차량 정보 (차량 번호, 차량명)  */
  abizcarNBNMChange = (value) => {
    this.setState(() => ({
        abizcarNBNM: value,
    }));
  };

  /* 변경된 값 필드에 저장 => 기초거리  */
  before_kmChange = (value) => {
    this.setState(() => ({
      before_km: value,
    }));
  };

  render() {
    const { isModalOpen, showError } = this.state;

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
                      inputProps={{ style: { height: '12px' } }} 
                      value={this.state.before_km}
                      onChange={(e) => this.before_kmChange(e.target.value)}
                      />
            </Grid>

            {showError && (
              <Grid item xs={12} display="flex" alignItems="center">
                <Typography variant="caption" sx={{ color: 'red', marginLeft: 22, marginBottom: -3, fontSize: '11px', alignItems: "center" }}>값을 입력해주세요.</Typography>
              </Grid>
            )}

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
            <Typography variant="subtitle1" sx={{ marginLeft: 1, marginTop: 0.5, fontSize: '13px' }}> 기초거리는 주행전(km), 주행후(km)를 계산하기 위해 최초 한번만 입력을 해주시면 됩니다. </Typography>
                </Grid>
            </Box>

            <Grid container justifyContent="center" alignItems="center" mt={2} mb={0} ml={0} >
            <Grid item mb={0}>
              <button onClick={this.closeModal} style={{ backgroundColor: '#f2f2f2', border: '1px solid #D3D3D3', height: '25px', width: '60px', fontSize: '12px' }}>취소</button>
            </Grid>
            <Grid item mb={0} ml={1}>
              <button onClick={this.insertDistance} style={{ background: '#f2f2f2', border: '1px solid #D3D3D3', height: '25px', width: '60px', fontSize: '12px' }}>확인</button>
            </Grid>
          </Grid>

          </DialogContent>
          
          
        </Dialog>
        <Snackbar
            open={this.state.openSnackBar}
            autoHideDuration={2000}
            onClose={this.handleCloseSnackbar}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert

              severity="error"
              sx={{
                width: "100%",
                bgcolor: "error.main",
                ".MuiAlert-icon": {
                  color: "#ffffff",
                },
                color: "white",
                fontWeight: "bold",
              }}

            >
              차량정보를 입력해 주세요
            </Alert>
          </Snackbar>
      </div>
    );
  }
}

export default Ace1010BasicDistance;