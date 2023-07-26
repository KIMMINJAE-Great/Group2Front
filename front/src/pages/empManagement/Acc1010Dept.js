import { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import profile from "../../images/profile.png";
import SearchIcon from "@mui/icons-material/Search";
import { Box, height } from "@mui/system";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import acc1010 from "./acc1010.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
class Acc1010Dept extends Component {

  render() {
    return (
      <div className="acc1010-dept-container">


        {/* submenu > */}

        {/* input container < */}
        <div class="acc1010-input-container">
          <Grid
            container
            spacing={0.4}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* 사진*/}


            {/* 이름 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px', borderTop: '3px solid black' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>회사코드</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }} >
                <TextField
                  sx={{ backgroundColor: '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ style: { height: "12px" } }}
                />
              </Grid>
            </Grid>

            {/* 로그인 ID, 메일 ID */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서코드</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  sx={{ backgroundColor: '#F2F2F2' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>

            </Grid>

            {/* 로그인 비밀번호, 결재 비밀번호 */}
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>부서명</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  sx={{ backgroundColor: '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>

            </Grid>
            <Grid container item xs={11.980} sx={{ borderBottom: '1px solid lightgray', padding: '4px' }}>
              <Grid item xs={1.1} style={{ textAlign: "right" }}>
                <Typography>
                  <h5 style={{ margin: "5px" }}>사원번호</h5>
                </Typography>
              </Grid>
              <Grid item xs={10.9} sx={{ backgroundColor: 'white', paddingLeft: '5px' }}>
                <TextField
                  sx={{ backgroundColor: '#FEF4F4' }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ style: { height: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              </Grid>

            </Grid>






            {/* 마지막 Grid */}
          </Grid>

        </div>
        {/* input container < */}




      </div>
    )
  }
}

export default Acc1010Dept;