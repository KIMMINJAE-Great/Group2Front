import React, { Component } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// 아래는 수정한 부분
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, IconButton, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material/styles";
import MonitorIcon from '@mui/icons-material/Monitor';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { color } from "@mui/system";




const GridItem1 = styled(Grid)(({ theme }) => ({
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor:"#FAFAFA"
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#F0F0F0', // 밝은 회색 배경색
    width: theme.spacing(3), // 버튼의 크기를 줄이기 위해 theme.spacing() 사용
  height: theme.spacing(3),
    borderRadius: '50%', // 동그란 모서리
    marginLeft: 10,
    marginTop: -7,
    pointerEvents: 'none'
  }));

  


class Acc1012 extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
      }

      // 클릭 이벤트 핸들러 함수 정의
        // handleButtonClick = () => {
        //     this.setState((prevState) => ({
        //     }));
        // };

    render() {
        return (
            <form>
                <div>
                    <div style={{marginBottom: 7}}>
                <Grid item xs={12} display="flex" alignItems="center">
                    <Typography variant="h2" sx={{ paddingLeft: '10px', textAlign: 'left', fontSize: '16px', fontWeight: 'bold', mb: 1, mt: 0 }}>
                        일반거래처 등록
                    </Typography>
                            <StyledIconButton color="gray">
                                    <MonitorIcon/>
                                    </StyledIconButton>
                                    <StyledIconButton color="gray">
                                    <PlayArrowIcon />
                                    </StyledIconButton>
                                    </Grid>
                                    </div>
                    <Divider sx={{ width: '99vw' }} />
                    {/* 아래에 원하는 그리드 등 추가 요소를 넣어주세요 */}
                    <Box sx={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px', mt: 3, ml: 2 }}>
                        <Grid container spacing={1}>

                            <Grid item xs={12} display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처구분</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처코드</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처명</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>사업자등록번호</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>주민등록번호</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px' }}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 1, width: '30px', height: '30px' }}>
                                    <ExpandMoreIcon />
                                </IconButton>
                                
                            </Grid>

                            <Grid item xs={12} display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처분류</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: 8.5, fontSize: '13px', fontWeight: 'bold' }}>사용여부</Typography>
                                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                            </Grid>
                        </Grid>
                    </Box>

                    <div style={{ display: "flex", float: "left"}}>
                        
                        <div style={{ flex: 0.7 }}>
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

                        <div style={{ flex: 2.5 }}>
                            <div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >   

                                <Grid
                                        item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center"}} >
                                    {/* <Typography variant="subtitle1" sx={{ ml: 5, fontSize: '13px', fontWeight: '540',}}>기본등록사항</Typography> */}
                                    <Button variant="subtitle1" onClick={this.Basic_registrationClick} sx={{ ml: 5, fontSize: '14px', fontWeight: '1000', color: '#00bfff' }}>
                                        기본등록사항
                                    </Button>
                                    <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC'}}>|</Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, fontSize: '13px', fontWeight: '540', color: 'black'}}>거래등록사항</Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC'}}>|</Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, fontSize: '13px', fontWeight: '540'}}>거래처담당자관리</Typography>


                                    </Grid>

                                <Grid 
                                        item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center"}} >
                                     <div>
                                    <button style={{backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', fontWeight: 'bolder', fontSize: '12px', width:'2.5vw', height: '1.5vw'}}>저장</button>
                                     </div>   

                                    </Grid>
                                </div>

                                <Divider sx={{ width: '76vw', borderBottom: '2px solid gray' }} />

                                <Grid
                                        item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center"}} >
                                    <Typography variant="subtitle1" sx={{ ml: 3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>기본정보</Typography>
                                    </Grid>

                                <Divider sx={{ width: '76vw' }} />
                            </div>
                            <div>

                                <Grid container>

                                    {/* 1번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처구분</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처명</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 2번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처코드</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 21.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처약칭</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 3번 째 */}
                                    <Grid 
                                        item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 19.7, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>사업자등록번호</Typography>
                                        <TextField sx={{ width: '29.8%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                        <button style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '60%', width: '6%', marginLeft: 15, fontSize: '11px', fontWeight: 'bold' }}>휴폐업조회</button>
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 4번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 21.3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>주민등록번호</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>대표자명</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 5번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 27.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>업태</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 26.4, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>업종</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 6번 째 */}
                                    <Grid 
                                        item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>사업장주소</Typography>
                                        <TextField sx={{ width: '8%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                        <TextField sx={{ width: '70.6%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <TextField sx={{ width: '79.3%', ml: 32, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                     </Grid>
                                    

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 7번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>전화번호</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>팩스번호</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 8번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>홈페이지</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>메일주소</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 9번 째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>주류코드</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>국가코드</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '76vw' }} />

                                    {/* 여기 까지 기본등록사항 테이블 */}
                                    <Divider sx={{ width: '77vw', mt: 2, borderBottom: '1px solid gray' }} />
     
                                </Grid>
              
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Acc1012;