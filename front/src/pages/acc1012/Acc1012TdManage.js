import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Divider, Grid } from "@mui/material";
import './Acc1012BasicInfo.css';

/* 거래등록사항 컴포넌트를 정의 */
class Acc1012TdManage extends Component {
  render() {
    return (

      <div style={{width: "100%", ml: "40px"}}>

          <div style={{ flex: 2.5 }} >
            <div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >

                <Grid
                  item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                  <Button variant="subtitle1" onClick={this.props.handleMoveBasic} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', width: '150px', backgroundColor: 'white' }}>
                    기본등록사항
                  </Button>
                  <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC' }}>|</Typography>
                  <Button variant="subtitle1" onClick={this.props.handleMoveTrade} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', width: '150px', backgroundColor: 'white' }}>
                    거래등록사항
                  </Button>
                  <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC' }}>|</Typography>
                  <Button variant="subtitle1" onClick={this.props.handleMoveTdManage} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', width: '150px', color: '#408fff', backgroundColor: 'white' }}>
                    거래처담당자관리
                  </Button>
                </Grid>

                <Grid
                  item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
                  　　　　　　　　　　　　　　　　　　</Typography>

                </Grid>
              </div>

              
              <Divider sx={{ borderBottom: '2px solid gray' }} />
             

              <Grid
                item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                <Typography variant="subtitle1" sx={{ ml: 3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처담당자관리</Typography>
              </Grid>

            </div>
            
          </div>
        </div>
  )

  }
}

export default Acc1012TdManage;
