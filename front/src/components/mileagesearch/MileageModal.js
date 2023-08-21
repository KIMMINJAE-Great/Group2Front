import { Component } from "react";
import { Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { get } from "../../components/api_url/API_URL";
import MileageSeachTextField from "./MileageSeachTextField";
import MileageSearchBtn from "./MileageSearchBtn";
// import MileageTableView from "./MileageTableView";
import MileageTableViewTest from "./MileageTableViewTest";

class MileageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      startName: '',
      endName: '',
      startCoords: '',
      endCoords: '',
      bookmarkCards: [], //abizcar_북마크의 정보를 담을 배열
      selectedBookmark: '', //북마크 정보 저장할 상태변수
      content: [], //하위 컴포넌트로의 전달 등 여러기능함
      coordinateInfo: '', //위도경도가 포함된 정보를 담을 변수인데... bookmarkCards에서 충분할듯? 
      tableShow: false,//주행거리 검색 함수가 눌린 이후에 true로 바뀔꺼임!!
      data: null,// 검색api에 사용될것임
      distanceRealtime: '',
      distanceBased: '',
      distanceFree: '',

    };
  }

  //abizcar_person의 정보를 가져오는코드임
  componentDidMount() {
    get(`/ace1010/getallcars`)
      .then((response) => {
        this.setState({ bookmarkCards: response.data, content: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.content);
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
  //카드 클릭
  handleCardClick = (seq_nb) => {
    const selectedCard = this.state.bookmarkCards.find(item => item.seq_nb === seq_nb);
    if (selectedCard) {
      this.setState({
        selectedBookmark: selectedCard,
        startFieldValue: selectedCard.start_addr, //
        endFieldValue: selectedCard.end_addr,
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
    const { bookmarkCards, selectedBookmark } = this.state;
    const { distanceRealtime, distanceBased, distanceFree } = this.state;

    return (

      <div style={{ width: '500px' }}>
        <MenuItem onClick={this.openModal}>주행거리 검색</MenuItem>

        <div>
          <Dialog
            open={this.state.isModalOpen}
            onClose={this.closeModal}
            PaperProps={{
              style: {
                width: '120%', // 원하는 너비

              },
            }}
          >
            {/* 최상단 */}
            <DialogTitle style={{ marginLeft: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "-23px", fontWeight: "bold", }}>
              주행거리 검색(참고용)
              <hr />
            </DialogTitle>


            {/* div 두 영역으로 나눔 */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* 왼쪽인 카드리스트 */}
              <DialogContent style={{ width: "110px", maxHeight: "310px", overflow: "auto" }}>
                <Grid container style={{ borderBottom: '1px solid #D3D3D3' }}>
                  {bookmarkCards.map((item, index) => (
                    <Grid style={{ height: '70px', }} key={index}>
                      <Card
                        style={{ width: "175px", height: "105px" }}
                        sx={{
                          borderRadius: "0px",
                          border: "0.5px solid lightgrey",
                        }}
                        onClick={() =>
                          this.handleCardClick(this.state.content[index].seq_nb)}
                      >
                        <CardContent >
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
                          <div> </div>
                        </CardContent>

                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              {/* 출발지,상세주소,도착지,상세주소  */}
              <DialogContent style={{ borderLeft: '1px solid black' }}>

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
                          SearchKeyword={this.state.selectedBookmark.start_addr}
                          onSendCoordData={(longitude, latitude) => this.handleCoordData('start', longitude, latitude)}
                        />
                        {/*  */}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12}>
                    <Grid container style={{ marginBottom: "6px" }}>
                      <Grid item xs={2.5} style={{ marginTop: '5px' }}>
                        도착지<br />
                        상세주소
                      </Grid>
                      <Grid item xs={9.5}>
                        {/* 주행거리 검색 택스트필드!! */}
                        <MileageSeachTextField
                          SearchKeyword={this.state.selectedBookmark.end_addr}
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
                      {/* TABLE VIEW */}
                      {this.state.tableShow &&
                        <MileageTableViewTest
                          distanceRealtime={this.state.distanceRealtime}
                          distanceBased={this.state.distanceBased}
                          distanceFree={this.state.distanceFree}
                        />}
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