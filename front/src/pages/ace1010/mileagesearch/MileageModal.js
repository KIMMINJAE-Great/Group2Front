import { Component } from "react";
import { Alert, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, MenuItem, Slide, Snackbar, TextField, Typography } from "@mui/material";

import MileageSeachTextField from "./MileageSeachTextField";
import MileageSearchBtn from "./MileageSearchBtn";
import MileageTableView from "./MileageTableView";

class MileageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      openSnackBar: false,

      // startName: '', 필요없음
      // endName: '',

      startCoords: '', //시작 좌표
      endCoords: '', //도착 좌표

      startAddr: '', //검색어: 출발지(검색쿼리값)
      endAddr: '', //검색어:도착지(검색쿼리값)
      startAddr1: '', //상세주소 :출발지의
      endAddr1: '', //상세주소 : 도착지의

      distanceRealtime: '',
      distanceBased: '',
      distanceFree: '',

      mileageCards: [], // 체크박스를 통해 저장된 카드리스트에 들어갈 배열
      selectedItems: '', //선택된 카드리스트의 정보 저장할 상태변수
      // content: [], //하위 컴포넌트로의 전달 등 여러기능함
      coordinateInfo: '', //위도경도가 포함된 정보를 담을 변수인데... mileageCards에서 충분할듯? 
      selectedCardSeqNb: null,
      tableShow: false,//주행거리 검색 함수가 눌린 이후에 true로 바뀔꺼임!! 스피너!

      data: null,// 검색api에 사용될것임
    };
  }

  //abizcar_person의 정보를 가져오는코드임
  componentDidMount() {

    this.setState({
      mileageCards: this.props.content
    });
    console.log("모달 디드마운트 : " + this.state.mileageCards);
  }

  // Snackbar 표시 함수
  showErrorSnackbar = () => {
    this.setState({ openSnackBar: true });
  };

  // Snackbar 숨기기 함수
  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false });
  };

  // 모달 열기 함수
  openModal = () => {
    if (this.state.mileageCards.length === 0) {
      this.showErrorSnackbar();
      return
    }
    if (!this.state.mileageCards[0].hasOwnProperty('start_addr')) {
      alert('올바른 운행기록을 선택해주세요.');
      //아직 한 행을 전체 등록하기 전에, 등록하는 기능은 구현하지 못하였습니다.)
      return
    }
    this.setState({ isModalOpen: true });
  };

  // 모달 닫기 함수
  closeModal = () => {
    this.setState({ isModalOpen: false, });
  };

  //확인 눌렀을 때 . . .  상태값 저장할수있는 추가 로직 작성가능성
  saveModalCheckedItems = async () => {
    const { startAddr, startAddr1, endAddr, endAddr1 } = this.state;

    this.setState({
      isModalOpen: false, distanceRealtime: '',
      distanceBased: '',
      distanceFree: '',
    });
    await this.props.callback.handleCallBackAddrData(startAddr1, endAddr1, startAddr, endAddr);
    this.props.callback.handelCalcMileageKm(); // 마일리지 키로미터 계산 로직

  };

  //카드 클릭
  handleCardClick = (seq_nb) => {
    const selectedCard = this.state.mileageCards.find(item => item.seq_nb === seq_nb);
    console.log("selectedCard이다." + JSON.stringify(selectedCard));
    console.log("selectedCard의 km이다.." + JSON.stringify(selectedCard.mileage_km));

    //seq_nb값 가져오는 코드 ace1010으로 (카드클릭할때)
    this.props.callback.handleGetSeqNbBySeletedCard(selectedCard.seq_nb);
    //addr1 들 보내는 코드 ace1010으로

    if (selectedCard) {
      this.setState({
        selectedCardSeqNb: seq_nb, //카드색상때문에
        selectedItems: selectedCard,
        // startFieldValue: selectedCard.start_addr, 
        // endFieldValue: selectedCard.end_addr,
      });
    }
  };

  // startCoords와 endCoords를 각각 저장해야한다!
  handleCoordData = (fieldType, longitude, latitude) => {
    if (fieldType === 'start') {
      this.setState({
        startCoords: [longitude, latitude]
      });
    } else if (fieldType === 'end') {
      this.setState({
        endCoords: [longitude, latitude]
      });
    }
  };

  //상세주소를 각각 저장 해야 한다!
  handleAddr1Data = (fieldType, addr1) => {
    if (fieldType === 'start') {
      this.setState({
        startAddr1: addr1
      })
    } else if (fieldType === 'end') {
      this.setState({
        endAddr1: addr1
      })
    }
  }

  //주소 검색지(query값)를 각각 저장 해야 한다!
  handleAddrData = (fieldType, addr) => {
    if (fieldType === 'start') {
      this.setState({
        startAddr: addr
      })
    } else if (fieldType === 'end') {
      this.setState({
        endAddr: addr
      })
    }
  }

  //실시간, 기초, 무료 
  handleDistanceData = (Realtime, Based, free) => {
    this.setState({
      distanceRealtime: Realtime,
      distanceBased: Based,
      distanceFree: free,
      tableShow: true
    });
  };

  render() {
    console.log("content 마일모달: " + JSON.stringify(this.props.mileageCards))
    const { mileageCards, selectedItems } = this.state;
    const { distanceRealtime, distanceBased, distanceFree } = this.state;

    return (
      <div style={{ width: '500px' }}>
        <MenuItem onClick={this.openModal}>주행거리 검색</MenuItem>
        <div>
          <Dialog
            open={this.state.isModalOpen}

            onClose={this.closeModal}
            maxWidth="lg"
            PaperProps={{
              style: {
                width: "50vw",
                height: "63vh",
              },
            }}
          >
            {/* 최상단 */}
            <DialogTitle style={{ marginLeft: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "-23px", fontWeight: "bold", }}>

              <Typography fontSize={31}>주행거리 검색</Typography>
              <hr />
            </DialogTitle>

            {/* div 두 영역으로 나눔 */}
            <div style={{ display: "flex", flexDirection: "row", height: "50vh" }}>
              {/* 왼쪽인 카드리스트 */}
              <DialogContent style={{ width: "10px", maxWidth: "20vw", maxHeight: "360px", overflow: "auto" }}>
                <Grid container >
                  {mileageCards.map((item, index) => (
                    <Grid style={{ height: '70px', marginBottom: "20px", }} key={index}>
                      <Card
                        style={{ width: "16.5vw", backgroundColor: this.state.selectedCardSeqNb === item.seq_nb ? "#E3EEFA" : "white" }}
                        sx={{
                          borderRadius: "0px",
                          border: "0.5px solid lightgrey",
                        }}
                        onClick={() =>
                          this.handleCardClick(this.state.mileageCards[index].seq_nb)}
                      >
                        <CardContent >
                          <Grid container spacing={2}>
                            <Grid item xs={6}> {/* 좌측  */}
                              <Typography
                                variant="body2"
                                style={{ marginLeft: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "220px", maxWidth: "220px", marginBottom: "10px", fontWeight: "bold", fontSize: "15px", }}
                              >
                                {item.start_fg} {'->'} {item.end_fg}
                              </Typography>
                              <Typography variant="body2" style={{ marginLeft: "0px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "220px", maxWidth: "220px", }}
                              >
                                {item.start_addr} {'->'} {item.end_addr}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}> {/* 우측 */}
                              <Typography
                                variant="body2"
                                style={{
                                  marginLeft: "2px", overflow: "hidden",
                                  textOverflow: "ellipsis", whiteSpace: "nowrap",
                                  width: "220px", maxWidth: "220px", marginBottom: "10px",
                                  fontWeight: "bold", fontSize: "15px", marginLeft: "85px"
                                }}
                              >
                                {item.mileage_km} km
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              {/* 출발지,상세주소,도착지,상세주소  */}
              <DialogContent style={{ borderLeft: '1px solid black', overflowX: 'auto', maxWidth: '550px', maxHeight: '480x' }}>
                <div >
                  <Grid container item xs={12}>
                    <Grid container style={{ marginBottom: "6px" }}>
                      <Grid item xs={2.5} >
                        <Grid style={{ fontSize: '18px', backgroundColor: '#FBF5EF', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          출발지
                        </Grid>
                        <Grid style={{ fontSize: '18px', backgroundColor: '#FBF5EF', marginBottom: '1px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          상세주소
                        </Grid>
                      </Grid>
                      <Grid item xs={9.3} style={{ marginLeft: '5px' }}>
                        {/* 주행거리 검색 택스트필드!! */}
                        <MileageSeachTextField
                          SearchKeyword={this.state.selectedItems.start_addr}
                          onSendCoordData={(longitude, latitude) => this.handleCoordData('start', longitude, latitude)}
                          onSendAddr1Data={(addr1) => this.handleAddr1Data('start', addr1)} //addr1데이터 보내는놈
                          onSendAddrData={(addr) => this.handleAddrData('start', addr)}
                        />
                        {/*  */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} style={{ marginTop: '10px' }}>
                    <Grid container style={{ marginBottom: "6px" }}>
                      <Grid item xs={2.5} >
                        <Grid style={{ fontSize: '18px', backgroundColor: '#FBF5EF', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          도착지
                        </Grid>
                        <Grid style={{ fontSize: '18px', backgroundColor: '#FBF5EF', marginBottom: '1px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          상세주소
                        </Grid>
                      </Grid>
                      <Grid item xs={9.3} style={{ marginLeft: '5px' }}>
                        {/* 주행거리 검색 택스트필드!! */}
                        <MileageSeachTextField
                          SearchKeyword={this.state.selectedItems.end_addr}
                          onSendCoordData={(longitude, latitude) => this.handleCoordData('end', longitude, latitude)}
                          onSendAddr1Data={(addr1) => this.handleAddr1Data('end', addr1)}
                          onSendAddrData={(addr) => this.handleAddrData('end', addr)}
                        />
                        {/*  */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={8}>
                      </Grid>
                      <Grid item xs={4} display="flex" justifyContent="flex-end" style={{ marginTop: '5px' }}>
                        {/* 주행거리 검색 버튼 */}
                        <MileageSearchBtn
                          onSendDistanceData={this.handleDistanceData}
                          startCoordinate={this.state.startCoords}
                          endCoordinate={this.state.endCoords}
                          tableShow={this.state.tableShow}
                        />
                        {/*  */}
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={1}>
                      </Grid>
                      <Grid item xs={11}>
                        {/* TABLE VIEW */}
                        {
                          <MileageTableView
                            callback={this.props.callback}
                            distanceRealtime={this.state.distanceRealtime}
                            distanceBased={this.state.distanceBased}
                            distanceFree={this.state.distanceFree}
                          />
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </DialogContent>
            </div>
            <Grid container justifyContent="center" alignItems="center" mt={0} mb={0} ml={0} backgroundColor={"#f2f2f2"} height={'50px'}>
              <Grid item mb={0}>
                <button onClick={this.closeModal} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold' }}>취소</button>
              </Grid>
              <Grid item mb={0} ml={1}>
                <button onClick={this.saveModalCheckedItems} style={{ background: '#00d2ff', border: '1px solid #D3D3D3', height: '30px', width: '60px', fontSize: '14px', fontWeight: 'bold', color: 'white', backgroundColor: '#0095ff' }}>확인</button>
              </Grid>
            </Grid>
          </Dialog>
        </div>

        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={1000}
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
            먼저 주행거리를 수정할 운행기록을 선택해 주세요.
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default MileageModal;