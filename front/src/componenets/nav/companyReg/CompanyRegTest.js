import React from "react";
import { styled, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  
} from "@mui/material";

const GridItem1 = styled(Grid)(({ theme }) => ({
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor:"#FAFAFA"
  }));

const GridItem3 = styled(Grid)(({ theme }) => ({
display: "flex", 
flexDirection: "row", 
alignItems: "center",
justifyContent: "flex-end",
backgroundColor: '#FAFAFA',
}));

/*
const 함수이름 = styled(TextField)(({theme}) => ({

스타일로 넣을것:"속성",
ex) backgroundColor:"black",
display: "flex", 
flexDirection: "row", 
alignItems: "center",
justifyContent: "flex-end",
backgroundColor: '#FAFAFA',
}));
*/



/* 아래 코드는 
<TextField variant=
"outlined" inputProps={{ style: { height: '12px' } }} 
style={{ marginLeft: "10px", width:"100%" }} />*/
const MyTextField = styled(TextField)(({theme}) => ({
marginLeft: "10px",
width:"100%",
padding: theme.spacing(0.5),
'& input': {
    height: '12px',   
}, 
'& .MuiOutlinedInput-root': { // TextField의 루트 요소에 스타일 적용
    borderRadius: 0, // 모서리를 완전히 직사각형으로 만듭니다.    
},
}));

const FieldName = styled(Typography)(({theme}) => ({
fontWeight: 'bold',
fontSize: '14px'
}));





class CompanyRegTest extends React.Component {
    //저장버튼
    handleSave = () => {        
        // Save related logic
        console.log('Save button clicked');
      };
    //삭제버튼
    handleDelete = () => {
        // Delete related logic
        console.log('Delete button clicked');
      };
    //Erp 연동활성화
    handleErpActivation = () => {
        // ERP Activation related logic
        console.log('ERP Activation button clicked');
      };
    
  render() {
    const { classes } = this.props;
    
    return (
      <form>
        <div style={{ padding: "0px" }}>
          <h2 style={{ margin: "0px" }}>회사 등록</h2>
          <hr />
        </div>
        <div style={{ display: "flex", float: "left" }}>
          <div style={{ flex:0.7, marginRight:30}}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">카드 제목</Typography>
                  <Typography variant="body2" color="textSecondary">
                    카드 설명
                  </Typography>
                  <TextField fullWidth variant="outlined" label="입력 필드" />
                  <Button variant="contained" color="primary" fullWidth>
                    버튼
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div style={{flex:2.5}}> 
            <div>
              <div
                style={{
                  marginLeft:"10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{height:'3px'}}>기본정보</p>
                <div>
                  <button onClick={this.handleSave}>저장</button>
                  <button onClick={this.handleDelete}>삭제</button>
                  <button onClick={this.handleErpActivation}>erp연동활성화</button>
                </div>
              </div>
              <hr style={{height:'3px', color:'black'}}/>
            </div>
            <div>
                
            <Grid container>
                {/* 1번째 */}
                
                <Grid container >
                    <GridItem1 item xs={2}>
                        <FieldName variant="body1">회사코드</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <FieldName variant="subtitle1" >사용여부</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="use"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="use" control={<Radio />} label="사용" />
                                <FormControlLabel value="unused" control={<Radio />} label="미사용" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>                         
                </Grid>
                
              {/* 2번째 */}
                <Grid container>
                    <GridItem1 item xs={2}>
                        <FieldName variant="subtitle1">회사명</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={10} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                        <button>▼</button> 
                    </Grid>          
                         
                </Grid>
                {/* 3번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">회사약정</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <FieldName variant="subtitle1">기본언어</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                        <button>▼</button>
                    </Grid>
                </Grid>
                {/* 4번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">행정표준코드</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={9} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <Grid 
                        item xs={1} style={{display:"flex", flexDirection:"row", alignItems: "right"}} >
                        <button>타회사 코드참조</button>
                    </Grid>                
                </Grid>
                {/* 5번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">업태</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2}  >
                        <FieldName variant="subtitle1">종목</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                </Grid>
                {/* 6번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">대표전화</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={1} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <Grid
                        item xs={3} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <FieldName variant="subtitle1">대표팩스</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                </Grid>
                {/* 7번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">사업자번호</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <FieldName variant="subtitle1">법인번호</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <Grid
                        item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                </Grid>
                {/* 8번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">설립일</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <FieldName variant="subtitle1">개/폐업일</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <Grid
                        item xs={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                </Grid>
                {/* 9번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">대표자명</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <FieldName variant="subtitle1">주민등록번호</FieldName>
                    </GridItem3>
                    <Grid
                        item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined"  />
                    </Grid>
                    <Grid
                        item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined"  />
                    </Grid>
                </Grid>
                {/* 10번째 */}
                <Grid container >
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">기본도메인</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={7} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        @<MyTextField variant="outlined" />
                    </Grid>                    
                </Grid>

                {/* 10번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">회사주소</FieldName>
                    </GridItem1>
                    <Grid item xs={6} container >
                        <Grid item xs={12} container>
                            <Grid
                                item xs={0} style={{display: "flex", flexDirection: "column", alignItems: "center",}} >
                                <MyTextField variant="outlined"  />
                            </Grid>
                            <button>우편번호</button>
                            </Grid>
                        <Grid item xs={12} container>
                            <Grid
                                item xs={0} style={{display: "flex", flexDirection: "column", alignItems: "center",}} >
                                <MyTextField variant="outlined"  />
                            </Grid>
                            <Grid
                                item xs={0} style={{display: "flex", flexDirection: "column", alignItems: "center",}} >
                                <MyTextField variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>       
                </Grid>
                {/* 12번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">회계기수</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={1} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined"  />
                    </Grid>
                    <Grid
                        item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <Typography variant="subtitle1">기</Typography>
                    </Grid>
                    <Grid
                        item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined" />
                    </Grid>
                    <button>회계기수 등록</button>
                </Grid>
                {/* 13번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">회사계정유형</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={10} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined" label="일반" />
                    </Grid>
                </Grid>
                {/* 14번째 */}
                <Grid container>
                    <GridItem1 item xs={2} style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <FieldName variant="subtitle1">홈페이지주소</FieldName>
                    </GridItem1>
                    <Grid
                        item xs={4} style={{display: "flex", flexDirection: "row", alignItems: "center",}} >
                        <MyTextField variant="outlined"  />
                    </Grid>
                    <GridItem3 item xs={2} >
                        <Typography variant="subtitle1">정렬</Typography>
                    </GridItem3>
                    <Grid
                        item xs={4} style={{ display: "flex", flexDirection: "row", alignItems: "center", }} >
                        <MyTextField variant="outlined"  />
                    </Grid>
                </Grid>
                  
            </Grid>     
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{height:'3px'}}>인감정보</p>
                
              </div>
              <hr style={{height:'3px', color:'black'}}/>
            </div>       
            </div>
          </div>
          
        </div>
      </form>
    );
  }
}

export default CompanyRegTest; 
