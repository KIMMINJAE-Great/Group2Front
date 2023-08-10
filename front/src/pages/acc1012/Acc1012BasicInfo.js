import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Divider } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Postcode from "../../components/commons/Postcode";
import './Acc1012BasicInfo.css';


class Acc1012BasicInfo extends Component {

  /*  사업자번호 포맷 형식 */
  cleanUpInputReg(input) {
    if (input) {
      return input.replace(/[^0-9]/g, "").slice(0, 10);
    }
    return "";
  }

  formatRegistrationNumber(input) {
    const cleanUpInputReg = this.cleanUpInputReg(input);

    let formattedReg = cleanUpInputReg;

    if (cleanUpInputReg.length > 3) {
      formattedReg = formattedReg.slice(0, 3) + "-" + formattedReg.slice(3);
    }
    if (cleanUpInputReg.length > 5) {
      formattedReg = formattedReg.slice(0, 6) + "-" + formattedReg.slice(6);
    }

    return formattedReg;
  }

  // handleInputRegChange = (e) => {
  //   const cleanUpInputReg = this.cleanUpInputReg(e.target.value);
  //   this.props.handleReg_nbChange(cleanUpInputReg);
  // };

  handleReg_nbChange = (input) => {
    const formattedValue = this.formatPhoneNumber(input);
    this.setState({
      selectedSt: {
        ...this.state.selectedSt,
        tr_pn: formattedValue  // Update 'tr_pn' instead of 'reg_nb'
      }
    });
  };

  /*  전화번호 포맷 형식 */

  cleanUpInputTr_pn(input) {
    if (input) {
      if (input.startsWith("02")) {
        return input.replace(/[^0-9]/g, "").slice(0, 10);
      } else {
        return input.replace(/[^0-9]/g, "").slice(0, 11);
      }
    }
    return "";
  }

  formatPhoneNumber(input) {
    const cleanUpInputTr_pn = this.cleanUpInputTr_pn(input);
    let formattedPn = cleanUpInputTr_pn;
  
    if (cleanUpInputTr_pn.startsWith('02')) {
      if (cleanUpInputTr_pn.length > 2) {
        formattedPn = cleanUpInputTr_pn.slice(0, 2) + "-" + cleanUpInputTr_pn.slice(2);
      }
      if (cleanUpInputTr_pn.length > 6) {
        formattedPn = formattedPn.slice(0, 7) + "-" + formattedPn.slice(7, 11);
      }
    } else {
      if (cleanUpInputTr_pn.length > 3) {
        formattedPn = cleanUpInputTr_pn.slice(0, 3) + "-" + cleanUpInputTr_pn.slice(3);
      }
      if (cleanUpInputTr_pn.length > 7) {
        formattedPn = formattedPn.slice(0, 8) + "-" + formattedPn.slice(8, 12);
      }
    }
  
    return formattedPn;
  }
  

  handleInputChangeTr_pn = (e) => {
    const cleanUpInputTr_pn = this.cleanUpInputTr_pn(e.target.value);
    this.props.handleTr_pnChange(cleanUpInputTr_pn);
  };

    render() {
        const { selectedSt, newTrade} = this.props;
        const inputRegLength = this.cleanUpInputReg(selectedSt?.reg_nb || "").length;
        const isFullReg = inputRegLength === 10;

        const inputPn = selectedSt?.tr_pn || "";
        const cleanUpInputTr_pn = this.cleanUpInputTr_pn(inputPn);
        const inputPnLength = cleanUpInputTr_pn.length;
        const isFullPn = (cleanUpInputTr_pn.startsWith('02') ? inputPnLength === 10 : inputPnLength === 11);


        var readonly = newTrade === 'N';

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
                    <Button variant="subtitle1" onClick={this.props.handleMoveBasic} sx={{ ml: 1, fontSize: '14px', fontWeight: '1000', color: '#408fff', width: '150px', backgroundColor: 'white' }}>
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

              <Grid
                container
                item
                xs={12}
              >
                <Grid container xs={12} style={{ margin: "1px" }}>  
                  {/* 1번 째 */}
                  <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey'}} >
                    <Typography variant="subtitle1"  sx={{fontSize: '13px', fontWeight: 'bold', mr: 1}}>거래처구분</Typography>
                  </Grid>
                  <Grid xs={4} style={{borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey'}}>
                    <div style={{backgroundColor: "white",}}>
                    <Select
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, height: '30px', backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
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
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{fontSize: '13px', fontWeight: 'bold', mr: 1}} >거래처명</Typography>
                  </Grid>
                  <Grid item xs={4} style={{borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey'}}>
                    <div style={{backgroundColor: "white"}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
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
                  </Grid>
                  <Grid container xs={12} style={{ margin: "1px" }}>
                  {/* 3번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey'}} >
                    <Typography variant="subtitle1" sx={{fontSize: '13px', fontWeight: 'bold', mr: 1 }}>거래처코드</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{  fontSize: '13px', fontWeight: 'bold', mr: 1}}>거래처약칭</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1, backgroundColor: readonly ? '#F2F2F2' : '#FEF4F4' }}
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
                  </Grid>



                  <Grid container xs={12} style={{ margin: "1px" }}>
                  {/* 5번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1 }}>사업자등록번호</Typography>
                  </Grid>
                  <Grid xs={10}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
                    <TextField
                      sx={{  width: '38%', ml: 1, mt: 1, mb: 1, backgroundColor: 'white' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      InputProps={{
                        endAdornment: isFullReg ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '15px',
                              height: '15px',
                              borderRadius: '50%',
                              backgroundColor: '#00CC22',
                              border: 'none',
                              marginRight: '-6px'
                            }}
                          >
                            <span style={{ 
                              color: 'white',
                              width: '10px',
                              height: '24px',
                              marginRight: '1px'
                            }}>
                              {selectedSt?.reg_nb ? "✔" : ""}
                            </span>
                          </div>
                        ) : null
                      }}
                      type="text"
                      name='reg_nb'
                      value={this.formatRegistrationNumber(selectedSt?.reg_nb || "")}
                      onChange={(e) => this.props.handleReg_nbChange(this.cleanUpInputReg(e.target.value))}
                      />
                    </div>
                  </Grid>
                  </Grid>
                  <Grid container xs={12} style={{ margin: "1px" }}>
                  {/* 6번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1 }}>주민등록번호</Typography>
                    </Grid>
                    <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                      sx={{  ml: 1, mt: 1, mb: 1, width: '58.5%' }}
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
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1 }}>대표자명</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                  </Grid>
                  
                  
                  {/* 8번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{  fontSize: '13px', fontWeight: 'bold', mr: 1 }}>업태</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1 }}>업종</Typography>
                  </Grid>
                  <Grid xs={4}>  
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                  <Grid container xs={12} style={{ margin: "1px" }}>
                  {/* 10번 째 */}
                  
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }} >
                        <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1, mb: -5 }}>사업장주소</Typography>
                    </Grid>
                      <div style={{backgroundColor: "white", display: "flex", flexDirection: "row", alignItems: "center", width: "83.3%", borderBottom:'1px solid lightgrey'}}>
                      <Grid item xs={1}>
                          <TextField
                            sx={{ width: '110%', ml: 1, mt: 1, mb: 1 }}
                            variant="outlined"
                            size="small"
                            inputProps={{ style: { height: '12px' } }}
                            type="text"
                            placeholder="우편번호"
                            name='tr_ps_cd'
                            value={selectedSt?.tr_ps_cd || ""}
                            />
                            
                      </Grid>
                      <Grid item xs={0} sx={{ml: 3, mt: 1, mr: 1, mb: 0.5}}>
                            <Postcode style={{ height: '40px', alignItems: "center" }} onComplete={this.props.handlePostComplete} />
                      </Grid>
                      <Grid item xs={10}>
                            <TextField
                            sx={{ width: '98.4%'}}
                            variant="outlined"
                            size="small"
                            inputProps={{ style: { height: '12px' } }}
                            type="text"
                            placeholder="기본주소"
                            name='tr_ad1'
                            value={selectedSt?.tr_ad1 || ""}
                            />
                        
                      </Grid>
                      </div>
                    <Grid container xs={12} style={{ margin: "1px" }}>
                    <Grid item xs={2} style={{ margin: "1px"}}>
                    </Grid>
                  
                        
                    <Grid item xs={9.98} style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white"}}>
                      <TextField
                        sx={{ width: '98.5%', ml: 0.5, mt: 1, mb: 1 }}
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
                  </Grid>
                  {/* <Grid container xs={12} style={{ margin: "1px" }}></Grid> */}
                  {/* 11번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{  fontSize: '13px', fontWeight: 'bold', mr: 1 }}>전화번호</Typography>
                  </Grid>
                  <Grid xs={4}>  
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey'}}>
                    <TextField
                      sx={{ width: '95%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      InputProps={{
                        endAdornment: isFullPn ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '15px',
                              height: '15px',
                              borderRadius: '50%',
                              backgroundColor: '#00CC22',
                              border: 'none',
                              marginRight: '-6px'
                            }}
                          >
                            <span style={{ 
                              color: 'white',
                              width: '10px',
                              height: '24px',
                              marginRight: '1px'
                            }}>
                              {selectedSt?.tr_pn ? "✔" : ""}
                            </span>
                          </div>
                        ) : null
                      }}
                      type="text"
                      name='tr_pn'
                      // value={selectedSt?.tr_pn || ""}
                    // onChange={(e) => this.props.handleTr_pnChange(e.target.value)}
                    value={this.formatPhoneNumber(selectedSt?.tr_pn || "")}
                    onChange={(e) => this.props.handleTr_pnChange(this.cleanUpInputTr_pn(e.target.value))}

                      />
                      </div>
                  </Grid>
                  {/* 12번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{  fontSize: '13px', fontWeight: 'bold', mr: 1 }}>팩스번호</Typography>
                  </Grid>
                  <Grid xs={4}>  
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey', borderTop:'1px solid lightgrey'}}>
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
                <Grid container xs={12} style={{ margin: "1px" }}>
                  {/* 13번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1 }}>홈페이지</Typography>
                    </Grid>
                    <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{fontSize: '13px', fontWeight: 'bold' , mr: 1}}>메일주소</Typography>
                    </Grid>
                    <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                  </Grid>
                  <Grid container xs={12} style={{ margin: "1px" }}>
                  {/* 15번 째 */}
                  <Grid
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{  fontSize: '13px', fontWeight: 'bold', mr: 1 }}>주류코드</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                    item xs={2} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'1px solid lightgrey' }} >
                    <Typography variant="subtitle1" sx={{ fontSize: '13px', fontWeight: 'bold', mr: 1 }}>국가코드</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <div style={{backgroundColor: "white", borderBottom:'1px solid lightgrey'}}>
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
                  </Grid>
                  {/* 여기까지 기본등록사항 테이블 */}
                  {/* <Divider sx={{  mt: 2, borderBottom: '3px solid gray' }} /> */}
                  <Grid
                    item xs={12} style={{ marginTop: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderBottom:'2px solid lightgrey' }} ></Grid>
                </Grid>
              </div>
            </div>
          </div>
    )
  }
        
    };

export default Acc1012BasicInfo;