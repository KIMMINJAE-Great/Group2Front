import { Component } from "react";
import { Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";

import MileageSeachTextField from "./MileageSeachTextField";
import MileageSearchBtn from "./MileageSearchBtn";
import MileageTableView from "./MileageTableView";
import { CircularProgress } from "@mui/material";
class MileageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      startName: '',
      endName: '',
      startCoords: '',
      endCoords: '',
      mileageCards: [], // 체크박스를 통해 저장된 배열
      selectedItems: '', //북마크 정보 저장할 상태변수
      content: [], //하위 컴포넌트로의 전달 등 여러기능함
      coordinateInfo: '', //위도경도가 포함된 정보를 담을 변수인데... mileageCards에서 충분할듯? 
      tableShow: false,//주행거리 검색 함수가 눌린 이후에 true로 바뀔꺼임!!
      data: null,// 검색api에 사용될것임
      distanceRealtime: '',
      distanceBased: '',
      distanceFree: '',
    };
  }

  //abizcar_person의 정보를 가져오는코드임
  componentDidMount() {
    
    this.setState({
      mileageCards: this.props.content
    });
    console.log("모달 디드마운트 : "+this.state.mileageCards);
  }

  // 모달의 열림/닫힘 상태를 관리하는 state 추가
  state = {
    isModalOpen: false,
  };
  // 모달 열기 함수
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  // 모달 닫기 함수
  closeModal = () => {
    this.setState({ isModalOpen: false, });
  };

  //확인 눌렀을 때 . . .  상태값 저장할수있는 추가 로직 작성가능성
  saveModalCheckedItems = () => {
    this.setState({ isModalOpen: false, });
    this.props.callback.handelCalcMileageKm();

  };
  
  //카드 클릭
  handleCardClick = (seq_nb) => {
    const selectedCard = this.state.mileageCards.find(item => item.seq_nb === seq_nb);
    console.log("selectedCard이다."+JSON.stringify(selectedCard));
    console.log("selectedCard의 km이다.."+JSON.stringify(selectedCard.mileage_km));
    this.props.callback.handleSeletedCardsKmMileage(selectedCard.seq_nb); //확인 버튼의 함수로 옮겨야 할듯 나중에....
    if (selectedCard) {
      this.setState({
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

  handleDistanceData = (Realtime, Based, free) => {
    this.setState({
      distanceRealtime: Realtime,
      distanceBased: Based,
      distanceFree: free,
      tableShow: true
    });
  };

  render() {
    console.log("content 마일모달: "+JSON.stringify(this.props.mileageCards))
    const { mileageCards, selectedItems } = this.state;
    const { distanceRealtime, distanceBased, distanceFree } = this.state;
    // console.log("스타트 위도경도" + this.state.startCoords);
    // console.log("엔드 위도경도" + this.state.endCoords);
    // console.log("distanceRealtime : " + distanceRealtime);
    // console.log("distanceBased : " + distanceBased);
    // console.log("distanceFree : " + distanceFree);
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
                height: "50vh",
              },
            }}
          >
            {/* 최상단 */}
            <DialogTitle style={{ marginLeft: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "-23px", fontWeight: "bold", }}>
              주행거리 검색
              <hr />
            </DialogTitle>

            {/* div 두 영역으로 나눔 */}
            <div style={{ display: "flex", flexDirection: "row", height: "50vh"}}>
              {/* 왼쪽인 카드리스트 */}
              <DialogContent style={{ width: "10px",maxWidth : "20vw" ,maxHeight: "310px", overflow: "auto" }}>
                <Grid container style={{ borderBottom: '1px solid #D3D3D3' }}>
                  {mileageCards.map((item, index) => (
                    <Grid style={{ height: '70px', marginBottom: "20px", }} key={index}>
                      <Card
                        style={{ width: "16.5vw", height: "10vh" }}
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
              <DialogContent style={{ borderLeft: '1px solid black', overflowX: 'auto', maxWidth: '550px' }}>

                <div >
                  <Grid container item xs={12}>
                    <Grid container alignItems="center" style={{ marginBottom: "6px" }}>
                      <Grid item xs={2.5} >
                        출발지<br></br>
                        상세주소
                      </Grid>
                      <Grid item xs={9.5}>
                        {/* 주행거리 검색 택스트필드!! */}
                        <MileageSeachTextField
                          SearchKeyword={this.state.selectedItems.start_addr}
                          onSendCoordData={(longitude, latitude) => this.handleCoordData('start', longitude, latitude)}
                        />
                        {/*  */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container style={{ marginBottom: "6px" }}>
                      <Grid item xs={2.5} style={{marginTop:'5px'}}>
                        도착지<br />
                        상세주소
                      </Grid>
                      <Grid item xs={9.5}>
                        {/* 주행거리 검색 택스트필드!! */}
                        <MileageSeachTextField
                          SearchKeyword={this.state.selectedItems.end_addr}
                          onSendCoordData={(longitude, latitude) => this.handleCoordData('end', longitude, latitude)}
                        />
                        {/*  */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={8}>
                      </Grid>
                      <Grid item xs={4} style={{ marginTop: '5px' }}>
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
                      {this.state.tableShow ? (
                        <MileageTableView
                          callback={this.props.callback}
                          distanceRealtime={this.state.distanceRealtime}
                          distanceBased={this.state.distanceBased}
                          distanceFree={this.state.distanceFree}
                        />)
                      : 
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                            <CircularProgress />
                          </div>
                      
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
      </div>
    )
  }
}

export default MileageModal;