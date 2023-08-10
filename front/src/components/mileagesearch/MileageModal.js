import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { get } from "../../components/api_url/API_URL";
import MileageTable from "./MileageTable";
import MileageSeachAddr from "./MileageSeachAddr";

class MileageModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen:false,
      startName:'',
      endName:'',
      startCoords:'',
      endCoords:'',
      bookmarkCards:[], //abizcar_북마크의 정보를 담을 배열
      selectedBookmark:'', //북마크 정보 저장할 상태변수
      content:[], //하위 컴포넌트로의 전달 등 여러기능함
      coordinateInfo: '', //위도경도가 포함된 정보를 담을 변수인데... bookmarkCards에서 충분할듯? 

      tableShow:false,//주행거리 검색 함수가 눌린 이후에 true로 바뀔꺼임!!

      data: null// 검색api에 사용될것임
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

handleCardClick = (seq_nb) => { 
  const selectedCard = this.state.bookmarkCards.find(item => item.seq_nb === seq_nb);
  
  if (selectedCard) {
    this.setState({
      selectedBookmark: selectedCard,
      startFieldValue: selectedCard.start_addr,  // 여기서 TextField에 보여질 값을 업데이트합니다.
      endFieldValue: selectedCard.end_addr,
    });
  }
};

HandleSearchBtnClick  = async () => {
  const { query } = this.state;
  const API_ENDPOINT = 'https://map.naver.com/v5/api/search';
  
  try {
    const response = await fetch(`${API_ENDPOINT}?caller=pcweb&query=${encodeURIComponent(query)}&page=1&displayCount=20&isPlaceRecommendationReplace=true&lang=ko`);
    const data = await response.json();

    if (data.result && data.result.place && data.result.place.boundary) {
      this.setState({ boundary: data.result.place.boundary, error: null });
    } else {
      this.setState({ error: 'Boundary data not found', boundary: null });
    }
  } catch (error) {
    this.setState({ error: 'Error fetching data', boundary: null });
  }

}
handleSubmit = async () => {
  const { query } = this.state;
  const API_ENDPOINT = 'https://map.naver.com/v5/api/search';

  try {
      const response = await fetch(`${API_ENDPOINT}?caller=pcweb&query=${encodeURIComponent(query)}&page=1&displayCount=20&isPlaceRecommendationReplace=true&lang=ko`);
      const data = await response.json();

      if (data.result && data.result.place && data.result.place.boundary) {
        this.setState({ boundary: data.result.place.boundary, error: null });
      } else {
        this.setState({ error: 'Boundary data not found', boundary: null });
      }
    } catch (error) {
      this.setState({ error: 'Error fetching data', boundary: null });
    }
  };

  render() {

    console.log("++"+JSON.stringify(this.state.bookmarkCards));
    const { bookmarkCards, selectedBookmark } = this.state;
    return (

      <div>
        <Button 
          variant="outlined"
          onClick={this.openModal}
        
        >
          gd
        </Button>
        <div>
          <Dialog 
            open={this.state.isModalOpen}
            onClose={this.closeModal}
            maxWidth="xl" 
            PaperProps={{
              style: {
                width: '45.7%',
                //heigth: '10%',
              },
            }}
          >
            {/* 최상단 */}
            <DialogTitle style={{
                              marginLeft: "2px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              marginBottom: "-23px",
                             
                             
                              
                              fontWeight: "bold",
                              
                            }}>
              주행거리 검색(참고용)
              <hr />
            </DialogTitle>


            {/* div 두 영역으로 나눔 */}
            <div style={{ display: "flex", flexDirection: "row",}}>
              {/* 왼쪽인 카드리스트 */}
              <DialogContent style={{width:"120px", maxHeight:"310px", overflow:"auto"}}>
                <Grid container style={{ borderBottom: '1px solid #D3D3D3'}}>  
                  {bookmarkCards.map((item, index) => (
                    <Grid style={{height: '70px'}}  key={index}>
                      <Card
                        style={{width:"220px", height:"175px"}}
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
                            style={{
                              marginLeft: "2px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "90px",
                              maxWidth: "90px",
                              marginBottom: "10px",
                              fontWeight: "bold",
                              fontSize: "15px",
                            }}
                          >
                            {item.start_fg} {'->'} {item.end_fg}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              marginLeft: "0px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "90px",
                              maxWidth: "90px",
                              
                              
                            }}
                          >
                            {item.start_addr} {'->'} {item.end_addr}
                          </Typography>
                          <div> </div>
                        </CardContent>
                        <CardContent
                          style={{
                            marginLeft: "190px",
                            paddingLeft: "0",
                            paddingRight: "0",
                            minWidth: "100px",
                            marginBottom: "200px",
                          }}
                        >
                          <Typography variant="body2">
                            {item.distance} {/* naverMap api에서 받아와야함 */}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              {/* 출발지,상세주소,도착지,상세주소  */}
              <DialogContent style={{ borderLeft:'1px solid black' }}>

                <div >
                  <Grid container item xs={12}>
                    <Grid container alignItems="center" style={{marginBottom:"6px"}}>
                      <Grid item xs={2} >
                        출발지
                      </Grid>
                      <Grid item xs={8}>
                        {/* <TextField 
                        
                        name="startFieldValue"
                        value={this.state.startFieldValue}
                        onChange={(e) => this.setState({ startFieldValue: selectedBookmark.start_addr })}
                        inputProps={{style: { height: '5px', fontSize: '12px', marginBottom:"2px" }}}
                        InputProps={{ 
                          style: { height: '30px', width: '130px' },
                          endAdornment: (
                            <InputAdornment position="end" style={{ marginRight: 0 }}>
                              <IconButton 
                                color="black" 
                                size="small" 
                                sx={{ borderRadius: 0,  width: '30px', height: '30px' }}
                                onClick={this.HandleSearchBtnClick}>
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        /> */}
                        <MileageSeachAddr SearchKeyword={this.state.selectedBookmark.start_addr} />
                      </Grid>
                      
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container style={{marginBottom:"6px"}}>
                      <Grid item xs={2}>
                      상세주소
                      </Grid>
                      <Grid item xs={10}>
                        <TextField 
                        fullWidth
                        inputProps={{style: { height: '5px', fontSize: '12px', marginBottom:"2px" }}}
                        InputProps={{ style: { height: '30px' }}} />
                      </Grid>
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container style={{marginBottom:"6px"}}>
                      <Grid item xs={2}>
                      도착지
                      </Grid>
                      <Grid item xs={2}>
                        
                        {/* 주행거리 검색 택스트필드!! */}
                        <MileageSeachAddr SearchKeyword={this.state.selectedBookmark.end_addr} />
                        {/*  */}

                      </Grid>
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container >
                      <Grid item xs={2}>
                      상세주소
                      </Grid>
                      <Grid item xs={10} >
                        <TextField 
                        fullWidth
                        inputProps={{style: { height: '5px', fontSize: '12px', marginBottom:"2px" }}}
                        InputProps={{ style: { height: '30px'}}} />
                      </Grid>
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={8}>
                      
                      </Grid>
                      <Grid item xs={4} style={{marginTop : '5px'}}>
                        <Button variant="outlined" style={{ width: '100px', height: '30px', padding: '2px 5px' }}>주행거리검색</Button>
                      </Grid>
                    </Grid>                          
                  </Grid>            

                </div>
                <div>
                  
                </div>
                <div>
                  <MileageSeachAddr />
                  {this.state.tableShow &&  <MileageTable></MileageTable>}
                    
                  
                  
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