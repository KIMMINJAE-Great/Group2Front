import React, { Component } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

/* 아래는 수정한 부분 */
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { color } from "@mui/system";
import { post, get, del } from '../../components/api_url/API_URL';
import profile from '../../images/logo.png'
import Postcode from "../../components/commons/Postcode";
import LocationOnIcon from '@mui/icons-material/LocationOn';

/* 아이콘 버튼 테마 css */
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#F0F0F0', /* 밝은 회색 배경색 */
  width: theme.spacing(3), /* 버튼의 크기를 줄이기 위해 사용 */
  height: theme.spacing(3),
  borderRadius: '50%',
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
  /* 돋보기 버튼 클릭시 조회조건에 따라 검색, card List 불러오기 */
  handleSearchClick = async () => {
    const requestData = {
      /* 예시: tradeManagementDTO 데이터를 사용 예정 */
    };

    try {
      const response = post('/tradeManagement/getSearchData', requestData);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  render() {
    /* Acc1012Con.js 에서 데이터 값 받아오기 */
    const {
      select_bp_classification,
      select_nationality,
    } = this.props;

    /* const employeeCards = Array.from({ length: 10 }); 10개의 빈 카드 배열 생성 */
    const departmentCards = [
      { dept_st: '부서유형1', dept_nm: '부서명1', dept_cd: '부서코드1' },
      { dept_st: '부서유형2', dept_nm: '부서명2', dept_cd: '부서코드2' },
      /* 추가적인 항목들... */
    ];

    return (
      <form>
        <div>
          <div style={{ marginBottom: 7 }}>
            <Grid item xs={12} display="flex" alignItems="center">
              <Typography variant="h2" sx={{ paddingLeft: '10px', textAlign: 'left', fontSize: '16px', fontWeight: 'bold', mb: 1, mt: 0 }}>
                일반거래처 등록
              </Typography>
              {/* 모니터, 재생모양 button */}
              <StyledIconButton color="gray">
                <MonitorIcon />
              </StyledIconButton>
              <StyledIconButton color="gray">
                <PlayArrowIcon />
              </StyledIconButton>
            </Grid>
          </div>
          <Divider sx={{ width: '99vw' }} />
          <Box sx={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto', border: '1px solid #D3D3D3', padding: '10px', mt: 3, ml: 2 }}>
            <Grid container spacing={1}>

              <Grid item xs={12} display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}>거래처구분</Typography>

                <Select
                  sx={{ width: '10%', ml: 1, height: '75%' }}
                  variant="outlined"
                  size="small"
                  name="search_bp_classification"
                  value={this.props.search_bp_classification}
                  onChange={this.props.onInputChange}
                  displayEmpty>
                  <MenuItem value="전체" style={{ color: this.props.search_bp_classification === '전체' ? 'gray' : 'black' }}>전체</MenuItem>
                  <MenuItem value="일반" style={{ color: this.props.search_bp_classification === '일반' ? 'gray' : 'black' }}>일반</MenuItem>
                  <MenuItem value="무역" style={{ color: this.props.search_bp_classification === '무역' ? 'gray' : 'black' }}>무역</MenuItem>
                  <MenuItem value="주민" style={{ color: this.props.search_bp_classification === '주민' ? 'gray' : 'black' }}>주민</MenuItem>
                  <MenuItem value="기타" style={{ color: this.props.search_bp_classification === '기타' ? 'gray' : 'black' }}>기타</MenuItem>
                </Select>

                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }} name="search_bp_code" >거래처코드</Typography>
                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }} name="search_bp_name">거래처명</Typography>
                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }} >사업자등록번호</Typography>
                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}  >주민등록번호</Typography>
                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} />
                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 3, width: '30px', height: '30px' }}>
                  <SearchIcon />
                </IconButton>
                <IconButton color="black" size="small" sx={{ borderRadius: 0, backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', ml: 1, width: '30px', height: '30px' }}>
                  <ExpandMoreIcon />
                </IconButton>

              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginLeft: 7, fontSize: '13px', fontWeight: 'bold' }}  >거래처분류</Typography>
                <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" placeholder="거래처그룹 코드도움" inputProps={{ style: { height: '12px' } }} />
                <Typography variant="subtitle1" sx={{ marginLeft: 8.5, fontSize: '13px', fontWeight: 'bold' }} >사용여부</Typography>
                <Select
                  sx={{ width: '10%', ml: 1, height: '75%' }}
                  variant="outlined"
                  size="small"
                  name="search_useWhether"
                  value={this.props.search_useWhether}
                  onChange={this.props.onInputChange}
                  displayEmpty
                >
                  <MenuItem value="전체" style={{ color: this.props.search_useWhether === '전체' ? 'gray' : 'black' }}>전체</MenuItem>
                  <MenuItem value="사용" style={{ color: this.props.search_useWhether === '사용' ? 'gray' : 'black' }}>사용</MenuItem>
                  <MenuItem value="미사용" style={{ color: this.props.search_useWhether === '미사용' ? 'gray' : 'black' }}>미사용</MenuItem>

                </Select>
                {/* <TextField sx={{ width: '10%', ml: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} /> */}
              </Grid>
            </Grid>
          </Box>

          {/* <div style={{ display: "flex", float: "left"}}> */}

          {/* 카드리스트 Start > */}

          <div style={{ display: "flex", float: "left" }}>
            <div style={{ flex: 0.7 }}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                {/* 카드리스트 > */}
                <div
                  class="cardlist-container"
                  style={{
                    maxWidth: "280px",
                    marginLeft: "5px",
                    marginTop: "1px",
                    marginRight: "5px",
                    borderTop: "2px solid black",
                  }}
                >
                  <div>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <Card
                        style={{
                          backgroundColor: "#ECECEC",
                          marginBottom: "5px",
                        }}
                      >
                        <CardContent>
                          <Typography variant="caption">
                            회사: Count(*)개

                          </Typography>
                        </CardContent>
                      </Card>
                      <Box sx={{ overflowY: "auto", maxHeight: "600px" }}>
                        {/* 스크롤바 영역 설정 */}
                        <Grid container spacing={2} >
                          {this.props.companyCards.map((sco, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              key={index}
                            ><Button onClick={(e) => {
                              this.props.handleCardClick(sco);
                            }} // 카드 클릭 시 이벤트 처리
                              sx={{
                                padding: 0, // 기본 패딩 제거
                                display: 'block', // 버튼은 블록 요소로 표시되도록 설정
                                textAlign: 'left', // 좌측 정렬
                                width: '100%', // 버튼을 100% 너비로 설정하여 전체 영역에 클릭 영역을 만듦
                              }}>
                                <Card
                                  sx={{
                                    borderRadius: "5px",
                                    border: "0.5px solid lightgrey",
                                    marginRight: "2px",
                                    display: "flex",
                                  }}
                                >
                                  <CardContent
                                    sx={{
                                      paddingLeft: "5px",
                                      paddingRight: "100px", //오른쪽으로가게끔
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "90px",
                                        maxWidth: "90px",
                                      }}
                                    >
                                      {sco.bp_code} {/* 부서코드 */}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "90px",
                                        maxWidth: "90px",
                                      }}
                                    >
                                      {sco.bp_name} {/* 부서명 */}
                                    </Typography>
                                    <div> </div>
                                  </CardContent>
                                  <CardContent
                                    style={{
                                      marginRight: "10px",
                                      paddingLeft: "0",
                                      paddingRight: "0",
                                    }}
                                  >
                                    {sco.bp_name}
                                    <Typography
                                      variant="body2"
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "90px",
                                        maxWidth: "90px",
                                      }}
                                    >
                                      {sco.bp_abbreviation} {/* 부서 닉네임 */}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ backgroundColor: "#FFFFFF", color: "#7A7A7A" }}
                      >
                        추가
                      </Button>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </div>
            {/* 카드리스트 End > */}
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
                    item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Button variant="subtitle1" onClick={this.Basic_registrationClick} sx={{ ml: 5, fontSize: '14px', fontWeight: '1000', color: '#00bfff' }}>
                      기본등록사항
                    </Button>
                    <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC' }}>|</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2, fontSize: '13px', fontWeight: '540', color: 'black' }}>거래등록사항</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2, mt: 1, mb: 1, fontSize: '14px', color: '#DCDCDC' }}>|</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2, fontSize: '13px', fontWeight: '540' }}>거래처담당자관리</Typography>
                  </Grid>

                  <Grid
                    item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <div>
                      <button style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', fontWeight: 'bolder', fontSize: '12px', width: '2.5vw', height: '1.5vw', cursor: 'pointer' }}
                        onClick={this.props.handleInsertClick} >저장</button>
                    </div>

                  </Grid>
                </div>

                <Divider sx={{ width: '76vw', borderBottom: '2px solid gray' }} />

                <Grid
                  item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                  <Typography variant="subtitle1" sx={{ ml: 3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>기본정보</Typography>
                </Grid>

                <Divider sx={{ width: '76vw' }} />
              </div>
              <div>

                <Grid container>

                  {/* 1번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처구분</Typography>
                    <Select
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1, height: '28px', backgroundColor: '#FFF0F5' }}
                      variant="outlined"
                      size="small"
                      name="select_bp_classification"
                      value={this.props.select_bp_classification}
                      onChange={this.props.onInputChange}

                      displayEmpty>
                      <MenuItem value="전체" style={{ color: this.props.select_bp_classification === '전체' ? 'gray' : 'black' }}>전체</MenuItem>
                      <MenuItem value="1. 일반" style={{ color: this.props.select_bp_classification === '1. 일반' ? 'gray' : 'black' }}>1. 일반</MenuItem>
                      <MenuItem value="2. 무역" style={{ color: this.props.select_bp_classification === '2. 무역' ? 'gray' : 'black' }}>2. 무역</MenuItem>
                      <MenuItem value="3. 주민" style={{ color: this.props.select_bp_classification === '3. 주민' ? 'gray' : 'black' }}>3. 주민</MenuItem>
                      <MenuItem value="4. 기타" style={{ color: this.props.select_bp_classification === '4. 기타' ? 'gray' : 'black' }}>4. 기타</MenuItem>

                    </Select>
                    {/* 2번 째 */}
                  </Grid>
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처명</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1, backgroundColor: '#FFF0F5' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='bp_name'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 3번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처코드</Typography>
                    {/* <TextField sx={{ width: '60%', ml: 1, mt: 1, mb:1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} /> */}
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='bp_code'
                      onChange={this.props.onInputChange} />
                  </Grid>
                  {/* 4번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 21.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>거래처약칭</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1, backgroundColor: '#FFF0F5' }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='bp_abbreviation'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 5번 째 */}
                  <Grid
                    item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 19.7, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>사업자등록번호</Typography>
                    <TextField
                      sx={{ width: '29.8%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='com_reg_num'
                      onChange={this.props.onInputChange} />
                    <button style={{ backgroundColor: '#FAFAFA', border: '1px solid #D3D3D3', height: '60%', width: '6%', marginLeft: 15, fontSize: '11px', fontWeight: 'bold' }}>휴폐업조회</button>
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 6번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 21.3, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>주민등록번호</Typography>
                    <Select
                      sx={{ width: '20%', ml: 1, mt: 1, mb: 1, height: '28px' }}
                      variant="outlined"
                      size="small"
                      name="select_nationality"
                      value={this.props.select_nationality}
                      onChange={this.props.onInputChange}
                      // onChange={(e) => this.props.handleSelectChange("select_nationality", e.target.value)}
                      displayEmpty>

                      <MenuItem value="내국인" style={{ color: this.props.select_nationality === '내국인' ? 'gray' : 'black' }}>내국인</MenuItem>
                      <MenuItem value="외국인" style={{ color: this.props.select_nationality === '외국인' ? 'gray' : 'black' }}>외국인</MenuItem>

                    </Select>
                    <TextField
                      sx={{ width: '38.8%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="______-_______"
                      name='res_reg_num'
                      onChange={this.props.onInputChange} />
                  </Grid>
                  {/* 7번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>대표자명</Typography>
                    {/* <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} /> */}
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='rep_name'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />
                  {/* 8번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 27.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>업태</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='bus_conditions'
                      onChange={this.props.onInputChange} />
                  </Grid>
                  {/* 9번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 26.4, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>업종</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='sectors'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 10번 째 */}
                  <Grid
                    item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 23, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>사업장주소</Typography>

                    <TextField
                      sx={{ width: '8%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="우편번호"
                      name='postcode'
                      value={this.props.postcode}
                      onChange={this.props.onInputChange} />
                    <Postcode style={{ marginLeft: "10px", height: '40px', marginTop: '5px' }} onComplete={this.props.onComplete} />

                    <TextField
                      sx={{ width: '64.5%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="기본주소"
                      name='primary_address'
                      value={this.props.jibunAddress}
                      onChange={this.props.onInputChange} />
                  </Grid>
                  <Grid item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TextField
                      sx={{ width: '79.3%', ml: 32, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="상세주소"
                      name='detailed_address'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 11번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>전화번호</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='phone_num'
                      onChange={this.props.onInputChange} />
                  </Grid>
                  {/* 12번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>팩스번호</Typography>
                    {/* <TextField sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }} variant="outlined" size="small" inputProps={{ style: { height: '12px' } }} /> */}
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='fax_num'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 13번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>홈페이지</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='home_page'
                      onChange={this.props.onInputChange} />
                  </Grid>
                  {/* 14번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>메일주소</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='mail_address'
                      onChange={this.props.onInputChange} />
                  </Grid>

                  <Divider sx={{ width: '76vw' }} />

                  {/* 15번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 24.5, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>주류코드</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      name='main_code'
                      onChange={this.props.onInputChange} />
                  </Grid>
                  {/* 16번 째 */}
                  <Grid
                    item xs={6} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Typography variant="subtitle1" sx={{ ml: 22.8, mt: 1, mb: 1, fontSize: '13px', fontWeight: 'bold' }}>국가코드</Typography>
                    <TextField
                      sx={{ width: '60%', ml: 1, mt: 1, mb: 1 }}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { height: '12px' } }}
                      type="text"
                      placeholder="국가코드"
                      name='country_code'
                      onChange={this.props.onInputChange} />
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