import { Component } from "react";
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
import { styled, } from "@mui/material/styles";


const GridItem1 = styled(Grid)(({ theme }) => ({
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor:"#FAFAFA"
  }));


class TradeManagement extends Component {
    render() {
        return (
            <form>
                <div style={{ maxWidth: '1600px' }}>
                    <Typography variant="h2" sx={{ paddingLeft: '10px', textAlign: 'left', fontSize: '17px', fontWeight: 'bold', mb: 1, mt: 0.5 }}>
                        일반거래처 등록
                    </Typography>
                    <Divider sx={{ width: '100vw' }} />
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
                                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3 }}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 1 }}>
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

                    <div style={{ display: "flex", float: "left" }}>
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
                                    <p style={{ height: '3px' }}>기본정보</p>
                                    <div>
                                        <button style={{backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', fontWeight: 'bolder', fontSize: '12px', width:'2.5vw', height: '1.5vw' }}>저장</button>
                                    </div>
                                </div>
                                <Divider sx={{ width: '70vw' }} />
                            </div>
                            <div>

                                <Grid container>

                                    {/* 1번째 */}
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

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 2번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처코드</Typography>
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{  mt: 1, mb: 1, ml: -0.5, fontSize: '13px', fontWeight: 'bold'}}>거래처약칭</Typography>
                                        <TextField sx={{ width: '60%', ml: 23, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 3번째 경호경호경호*/}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, ml: 11.8, fontSize: '13px', fontWeight: 'bold'}}>사업자등록번호</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                        <button style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '60%', width: '12%', marginLeft: 15, fontSize: '11px', fontWeight: 'bold' }}>휴폐업조회</button>
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 4번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>주민등록번호</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 1, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>대표자명</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 5번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>업태</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 1, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>업종</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 6번째 */}
                                    <Grid 
                                        item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>사업장주소</Typography>
                                        <TextField sx={{ width: '8%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                        <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />

                                    </Grid>
                                    

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 7번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처구분</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 1, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처명</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 8번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처구분</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 1, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처명</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 9번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처구분</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 1, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처명</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />

                                    {/* 10번째 */}
                                    <Grid 
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 15, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처구분</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>
                                    <Grid
                                        item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Typography variant="subtitle1" sx={{ ml: 1, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold'}}>거래처명</Typography>
                                        <TextField sx={{ width: '50%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                                    </Grid>

                                    <Divider sx={{ width: '70vw' }} />
     
                </Grid>
              
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default TradeManagement;
