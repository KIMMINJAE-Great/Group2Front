import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Divider } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Postcode from "../../components/commons/Postcode";
import './Acc1012Con.css';


class Acc1012Con extends Component {
    
    render() {
        const { selectedSt, newTrade } = this.props;
        var readonly = newTrade === "N";

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
                    <Button variant="subtitle1" onClick={this.props.handleMoveBasic} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', color: '#00bfff', width: '150px', backgroundColor: 'white' }}>
                      기본등록사항
                    </Button>
                    <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC' }}>|</Typography>
                    <Button variant="subtitle1" onClick={this.props.handleMoveTrade} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', width: '150px', backgroundColor: 'white' }}>
                      거래등록사항
                    </Button>
                    <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC' }}>|</Typography>
                    <Button variant="subtitle1" onClick={this.props.handleMoveTdManage} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', width: '150px', backgroundColor: 'white' }}>
                      거래처담당자관리
                    </Button>
                  </Grid>

                  <Grid
                    item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <div>
                      <button 
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', fontWeight: 'bolder', fontSize: '12px', width: '100%', height: '1.5vw', cursor: 'pointer' }}
                        onClick={this.props.handleSaveClick} >저장</button>
                    </div>

                  </Grid>
                </div>

                <Divider sx={{ borderBottom: '2px solid gray' }} />

                <Grid
                  item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                  <Typography variant="subtitle1" sx={{ ml: 3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>기본정보</Typography>
                </Grid>

              </div>
              <div className='acc1012-input-container'>

                <Grid container>

                  {/* 1번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처구분</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <Select
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, height: '28px', backgroundColor: '#FFF0F5' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ readOnly: readonly }}
                      name="tr_fg"
                      value={selectedSt?.tr_fg || "전체"}
                      onChange={(e) => this.props.handleTr_fgChange(e.target.value)}
                      >
                      <MenuItem value="전체" >전체</MenuItem>
                      <MenuItem value="일반" >1. 일반</MenuItem>
                      <MenuItem value="무역" >2. 무역</MenuItem>
                      <MenuItem value="주민" >3. 주민</MenuItem>
                      <MenuItem value="기타" >4. 기타</MenuItem>
                    </Select>
                    </div>
                  </Grid>
                    {/* 2번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처명</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, backgroundColor: '#FFF0F5' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' }, readOnly: readonly }}
                      type="text"
                      name='tr_nm'
                      value={selectedSt?.tr_nm || ""}
                      onChange={(e) => this.props.handleTr_nmChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 3번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey'}} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처코드</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, backgroundColor: '#f0f0f0'}}
                      placeholder="거래처코드는 자동 채번됩니다."
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' }, readOnly: true }}
                      type="text"
                      name='tr_cd'
                      value={selectedSt?.tr_cd || ""}
                      onChange={(e) => this.props.handleTr_cdChange(e.target.value)}

                      />
                      </div>
                  </Grid>
                  {/* 4번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 21.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처약칭</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, backgroundColor: '#FFF0F5' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' }, readOnly: readonly }}
                      type="text"
                      name='tr_al'
                      value={selectedSt?.tr_al || ""}
                      onChange={(e) => this.props.handleTr_alChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 5번 째 */}
                  <Grid
                    item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 19.7, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>사업자등록번호</Typography>
                    <div style={{backgroundColor: "white", width: '79.2%'}}>
                    <TextField
                      sx={{ width: '35.5%', ml: 1, mt: 1, mb: 1, backgroundColor: 'white', paddingLeft: '5px' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='reg_nb'
                      value={selectedSt?.reg_nb || ""}
                      onChange={(e) => this.props.handleReg_nbChange(e.target.value)}
                      />
                  </div>
                  </Grid>
                  {/* 6번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 21.3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>주민등록번호</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <Select
                      sx={{ width: '35%', ml: 1, mt: 1, mb: 1, height: '28px', backgroundColor: 'white', paddingLeft: '5px' }}
                      variant="outlined"
                      size="small"
                      name="tr_na"
                      value={selectedSt?.tr_na || "내국인"}
                      onChange={(e) => this.props.handleTr_naChange(e.target.value)}
                      displayEmpty>

                      <MenuItem value="내국인" >내국인</MenuItem>
                      <MenuItem value="외국인" >외국인</MenuItem>

                    </Select>
                    
                    <TextField
                      sx={{ width: '59%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="______-_______"
                      name='re_id'
                      value={selectedSt?.re_id || ""}
                      onChange={(e) => this.props.handleRe_idChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 7번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>대표자명</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_ceo_nm'
                      value={selectedSt?.tr_ceo_nm || ""}
                    onChange={(e) => this.props.handleTr_ceo_nmChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 8번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 27.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>업태</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_bt'
                      value={selectedSt?.tr_bt || ""}
                    onChange={(e) => this.props.handleTr_btChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 9번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 26.4, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>업종</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_bc'
                      value={selectedSt?.tr_bc || ""}
                    onChange={(e) => this.props.handleTr_bcChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 10번 째 */}
                  <Grid container item xs={12}> 
                  <Grid
                    item xs={1.9} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>사업장주소</Typography>
                    </Grid>
                    <Grid item xs={10.1} container sx={{backgroundColor: "white"}} style={{borderBottom:'1px solid lightgrey'}}>
                    <Grid item xs={12} container>
                    <TextField
                      sx={{ width: '10%', mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="우편번호"
                      name='tr_ps_cd'
                      value={selectedSt?.tr_ps_cd || ""}
                      />
                      
                    <Postcode style={{ marginLeft: "10px", height: '40px', alignItems: "center" }} onComplete={this.props.handlePostComplete} />

                    <TextField
                      sx={{ width: '72.5%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="기본주소"
                      name='tr_ad1'
                    value={selectedSt?.tr_ad1 || ""}
                      />
                      </Grid>
                      </Grid>
                      <Grid item xs={1.9} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>

                      </Grid>
                      
                  <Grid item xs={10.1} style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white" }}>
                    <TextField
                      sx={{ width: '92.5%', mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="상세주소"
                      name='tr_ad2'
                      value={selectedSt?.tr_ad2 || ""}
                    onChange={(e) => this.props.handleTr_ad2Change(e.target.value)}
                      />
                  </Grid>
                  </Grid>
                  
                  {/* 11번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>전화번호</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_pn'
                      value={selectedSt?.tr_pn || ""}
                    onChange={(e) => this.props.handleTr_pnChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 12번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>팩스번호</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_fn'
                      value={selectedSt?.tr_fn || ""}
                    onChange={(e) => this.props.handleTr_fnChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 13번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>홈페이지</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_hp'
                      value={selectedSt?.tr_hp || ""}
                    onChange={(e) => this.props.handleTr_hpChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 14번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>메일주소</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_email'
                      value={selectedSt?.tr_email || ""}
                      onChange={(e) => this.props.handleTr_emailChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 15번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>주류코드</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='tr_mn_cd'
                      value={selectedSt?.tr_mn_cd || ""}
                      onChange={(e) => this.props.handleTr_mn_cdChange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 16번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>국가코드</Typography>
                    <div style={{backgroundColor: "white", width: '60%'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="국가코드"
                      name='tr_ct_cd'
                      value={selectedSt?.tr_ct_cd || ""}
                      onChange={(e) => this.props.handleTr_ct_cdchange(e.target.value)}
                      />
                      </div>
                  </Grid>
                  {/* 여기까지 기본등록사항 테이블 */}
                  <Divider sx={{  mt: 2, borderBottom: '1px solid gray' }} />
                </Grid>
              </div>
            </div>
          </div>
    )
  }
        
    };

export default Acc1012Con;