import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { get } from "../../components/api_url/API_URL";

import MileageModal from "../ace1010/mileagesearch/MileageModal";

import MileageTableView from "../ace1010/mileagesearch/MileageTableView";

class Acd1012 extends Component {
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
    };
  }


componentDidMount() {
    // //abizcar_person의 정보를 가져오는코드임
    // get(`/ace1010/getallcars`)
    //   .then((response) => {
    //     this.setState({ bookmarkCards: response.data, content: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

handleMenuItemClick = (valueField) => {
  console.log(valueField);
  // Do something with the valueField when an item is clicked
};

  render() {

    console.log("++"+JSON.stringify(this.state.bookmarkCards));
    const { bookmarkCards } = this.state;
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
              

                
                
                <div>
                  <MileageModal />
                </div>
                <div><MileageTableView /></div>
              
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

export default Acd1012;