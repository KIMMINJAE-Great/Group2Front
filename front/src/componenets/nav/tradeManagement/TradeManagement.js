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
import { Button, Card, CardContent, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


class TradeManagement extends Component {
    render() {
        return (
            <form>
                
            <div style={{ maxWidth: '1600px'}}>
                <Typography variant="h2" sx={{ paddingLeft: '10px', textAlign: 'left', fontSize: '17px', fontWeight: 'bold', mb: 1, mt: 0.5}}>
                    일반거래처 등록
                </Typography>
                <Divider sx={{ width: '86vw'}} />
                {/* 아래에 원하는 그리드 등 추가 요소를 넣어주세요 */}
                <Box sx={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px', mt: 3, ml: 2 }}>
                    <Grid container spacing={1}>


                    <Grid item xs={12} display="flex" alignItems="center">                        
                    <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처구분</Typography>                            
                        <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                        <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처코드</Typography>                            
                        <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                            <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처명</Typography>                            
                            <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                            <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>사업자등록번호</Typography>                            
                            <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                            <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>주민등록번호</Typography>                            
                            <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                            <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#F5F5F5', border: '1px solid #D3D3D3' }}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3' }}>
                                    <ExpandMoreIcon />
                                </IconButton>
                        </Grid>

                        <Grid item xs={12} display="flex" alignItems="center">                        
                        <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold'  }}>거래처분류</Typography>                            
                        <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                            <Typography variant="subtitle1" sx={{ marginLeft: 8.5, fontSize: '13px', fontWeight: 'bold'  }}>사용여부</Typography>                            
                            <TextField sx={{ width: '10%', ml: 1}} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                        </Grid>
                    </Grid>
                </Box>


                <div style={{ display: "flex", float: "left" }}>
          <div>
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
          </div>
            </div>
            </form>
        )
    }

}

export default TradeManagement;