import { Grid, MenuItem, Typography } from '@mui/material';
import React, { Component } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from '@mui/material/Select';
import CodePickerManager from '../../components/codepicker/CodePickerManager';



class Acc1012Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { searchSt } = this.props;

    return (
      <div >
        <Box sx={{ maxWidth: '100%', maxHeight: '100%', border: '1px solid #D3D3D3', padding: '10px', mt: 3, ml: 2, mb: 2 }}>
          <Grid container spacing={1}>

            <Grid item xs={12} display="flex" flexDirection="row" alignItems="center">

              <Typography variant="subtitle1" sx={{ marginLeft: 4, fontSize: '13px', fontWeight: 'bold', width: "7%" }}>거래처구분</Typography>

              <Select
                sx={{ width: '14%', height: '80%' }}
                variant="outlined"
                size="small"
                name="tr_fg"
                value={searchSt?.tr_fg || "전체"}
                onChange={(e) => this.props.handleSc_Tr_fgChange(e.target.value)}
                displayEmpty>
                <MenuItem value="전체" >전체</MenuItem>
                <MenuItem value="일반" >일반</MenuItem>
                <MenuItem value="무역" >무역</MenuItem>
                <MenuItem value="주민" >주민</MenuItem>
                <MenuItem value="기타" >기타</MenuItem>
              </Select>

              <Typography variant="subtitle1" sx={{ marginLeft: 6, fontSize: '13px', fontWeight: 'bold', width: "7%" }} name="search_bp_code" >거래처코드</Typography>
              <TextField
                sx={{ width: '15%' }}
                variant="outlined"
                size="small"
                inputProps={{ style: { height: '12px' } }}
                value={searchSt?.tr_cd || ""}
                onChange={(e) => this.props.handleSc_Tr_cdChange(e.target.value)} />

              <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold', width: "6%" }} name="search_bp_name">거래처명</Typography>
              <TextField
                sx={{ width: '15%' }}
                variant="outlined"
                size="small"
                inputProps={{ style: { height: '12px' } }}
                value={searchSt?.tr_nm || ""}
                onChange={(e) => this.props.handleSc_Tr_nmChange(e.target.value)} />
              <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold', width: "10%" }} >사업자등록번호</Typography>
              <TextField sx={{ width: '15%' }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
              <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold', width: "10%" }}  >주민등록번호</Typography>
              <TextField sx={{ width: '15%' }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
              <IconButton
                color="black"
                size="small"
                sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px' }}
                onClick={this.props.handleSearch}
              >
                <SearchIcon />
              </IconButton>
              <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 1, width: '30px', height: '30px' }}>
                <ExpandMoreIcon />
              </IconButton>

            </Grid>

            <Grid item xs={12} display="flex" alignItems="center">
              <Typography variant="subtitle1" sx={{ marginLeft: 4, marginRight: 0, fontSize: '13px', fontWeight: 'bold', width: "5%" }}  >거래처분류</Typography>
              
              <CodePickerManager helpId={'TradeCodePicker'} variant="outlined" sendData={this.props.sendData} handleToAcc1012FromCodePicker={this.props.handleToAcc1012FromCodePicker}/>
              
              <Typography variant="subtitle1" sx={{ marginLeft: 8.5, fontSize: '13px', fontWeight: 'bold' }} >사용여부</Typography>
              <Select
                sx={{ width: '10%', ml: 4.8, height: '75%' }}
                variant="outlined"
                size="small"
                value={searchSt?.useYN || "전체"}
                onChange={(e) => this.props.handleUwChange(e.target.value)}
              >
                <MenuItem value="전체" >전체</MenuItem>
                <MenuItem value="사용" >사용</MenuItem>
                <MenuItem value="미사용" >미사용</MenuItem>

              </Select>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Acc1012Search;







