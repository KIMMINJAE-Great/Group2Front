import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";

class Acd1012 extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen:false,
      menuItems: [
        { valueField: "Route 1", codeField: "1", distance: "100" },
        { valueField: "Route 2", codeField: "2", distance: "200" },
        { valueField: "Route 3", codeField: "3", distance: "300" },

      ],
      selectedIds: [],
    };
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

    const { menuItems } = this.state;
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
            <DialogTitle>
              주행거리 검색(참고용)
              <hr />
            </DialogTitle>


            {/* div 두 영역으로 나눔 */}
            <div style={{ display: "flex", flexDirection: "row"}}>
              {/* 왼쪽인 카드리스트 */}
              <DialogContent style={{width:"170px", maxHeight:"300px", overflow:"auto"}}>
                <Grid container style={{ borderBottom: '1px solid #D3D3D3'}}>  
                  {this.state.menuItems.map((item, index) => (
                    <Grid style={{height: '100px'}} item xs={12} sm={12} md={12} lg={12} key={index}>
                      <Card
                        sx={{
                          borderRadius: "0px",
                          border: "0.5px solid lightgrey",
   
                          
                        }}
                        onClick={() => this.handleMenuItemClick(item.valueField)}
                      >
                        <CardContent >
                          <Typography
                            variant="body2"
                            style={{
                              marginLeft: "10px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "90px",
                              maxWidth: "90px",
                            }}
                          >
                            {item.codeField} {/* Previously it was item.co_cd */}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              marginLeft: "10px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "90px",
                              maxWidth: "90px",
                            }}
                          >
                            {item.valueField} {/* Previously it was item.co_nm */}
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
                            {item.distance} {/* New field added */}
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
                    <Grid container>
                      <Grid item xs={2}>
                        출발지
                      </Grid>
                      <Grid item xs={2}>
                        <TextField inputProps={{style: { height: '3px' } }} >필드</TextField>
                      </Grid>
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                      상세주소
                      </Grid>
                      <Grid item xs={10}>
                        <TextField inputProps={{style: { height: '3px' } }} >드</TextField>
                      </Grid>
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                      도착지
                      </Grid>
                      <Grid item xs={2}>
                        <TextField inputProps={{style: { height: '3px' } }} >필드</TextField>
                      </Grid>
                    </Grid>                          
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                      상세주소
                      </Grid>
                      <Grid item xs={2}>
                        <TextField inputProps={{style: { height: '3px' } }} >필드</TextField>
                      </Grid>
                    </Grid>                          
                  </Grid>
                </div>
                <div>
                  <Button>주행거리검색</Button>
                </div>
                <div>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #D3D3D3', borderTop: '2px solid gray' }}>
                        <th style={{ width: 8, padding: '4px', textAlign: 'center', borderLeft: '1px solid #D3D3D3', borderRight: '1px solid #D3D3D3' }}>
                          NO
                        </th>
                        <th style={{ width: 130, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                          경로
                        </th>
                        <th style={{ width: 170, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                          거리 KM
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {menuItems?.map((item, index) => (
                        <tr key={index}
                          onClick={() => this.handleMenuItemClick(item.valueField)}
                          style={{ borderBottom: '1px solid #D3D3D3' }}
                        >
                          <td style={{ width: 8, padding: '4px', textAlign: 'center', borderLeft: '1px solid #D3D3D3', borderRight: '1px solid #D3D3D3' }}>
                            {item.codeField}
                          </td>
                          <td style={{ width: 130, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                            {/* 경로 */}
                            {item.valueField}
                          </td>
                          <td style={{ width: 170, textAlign: 'center', borderRight: '1px solid #D3D3D3' }}>
                            {/* 거리 */}
                            {item.distance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Acd1012;