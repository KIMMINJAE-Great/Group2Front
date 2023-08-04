import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import MonitorIcon from '@mui/icons-material/Monitor';
import { Button, Card, CardContent, IconButton, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from "@mui/system";
import CardList from "../../components/commons/CardList";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Postcode from "../../components/commons/Postcode";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CodePicker from "../../components/CodePicker/CodePicker";
import CodePickerManager from "../../components/CodePicker/CodePickerManager";




const StyledIconButton = styled(IconButton)(() => ({
  backgroundColor: '#F0F0F0', /* 밝은 회색 배경색 */
  
  borderRadius: '50%',
  marginLeft: 10,
  marginTop: -7,
  pointerEvents: 'none'
}));

class Acd1010Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
  //     regCarCards: [],
  //     regCarCardData: [],
    }
  }

  render() {
    return (

      <div>
        <div style={{ marginRight: "15px" }}>  
          
          <div>
            {/* BOX 영역 시작 */}
            <Box sx={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px'}}>
              <Grid container >
                <Grid container>

                
                  <Grid item xs={1.15} style={{display: "flex",  flexDirection: "row",  alignItems: "center",  justifyContent: "flex-end"}}>
                    <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }} name="search_bp_code" >관리부서</Typography>
                  </Grid>
                  <Grid item xs={1.6} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    
                    {/* 텍스트필드 대신 코드피커 들어가야함 */}
                    <CodePickerManager helpId={'regcar'} variant="outlined" />
                  </Grid>
                  <Grid item xs={0} style={{display: "flex",  flexDirection: "row",  alignItems: "center",  justifyContent: "flex-end"}}>
                    <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }} name="search_bp_name">관리자</Typography>
                  </Grid>
                  <Grid item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <CodePickerManager helpId={'regcar'} variant="outlined" />
                  </Grid>
                  
                  <Grid item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px' }}>
                      <SearchIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={1.15} style={{display: "flex",  flexDirection: "row",  alignItems: "center",  justifyContent: "flex-end"}}>
                    {/* 차량관리 */}
                    <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}  >차량관리</Typography>
                  </Grid>
                  <Grid item xs={0} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <CodePickerManager helpId={'regcar'} variant="outlined" />
                  </Grid>
                  <Grid item xs={1.03} style={{display: "flex",  flexDirection: "row",  alignItems: "center",  justifyContent: "flex-end"}}>
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold' }} >임차구분</Typography>
                  </Grid>
                  <Grid item xs={1} style={{display: "flex",  flexDirection: "row",  alignItems: "center"}}>
                    <Select
                      sx={{ width: '100%', ml: 1, height: '75%' }}
                      variant="outlined"
                      size="small"
                      name="lease_yn"
                      value={this.props.lease_yn}
                      onChange={this.props.onInputChange}
                      displayEmpty
                    >
                      <MenuItem value="owned" >자가</MenuItem>
                      <MenuItem value="rented" >렌트</MenuItem>
                      <MenuItem value="leased" >리스</MenuItem>


                    </Select>

                  </Grid>
                  {/* <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} /> */}
                </Grid>              
              </Grid>
            </Box>
          </div>
          {/* 박스 영역 끝 */}
          {/* 텍스트필드 무리 시작 */}
          

        </div>
      </div>
    )
  }
}

export default Acd1010Search;