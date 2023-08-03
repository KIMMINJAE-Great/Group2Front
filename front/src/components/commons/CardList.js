import React, { Component } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import profile from "../../images/profile.png";
class CardList extends Component {
  render() {
    const { content } = this.props;

    let contentArray = [];
    let label = "";

    // content 배열의 각 객체들을 empList와 deptList로 분류
    content.forEach((item) => {
      if (item.hasOwnProperty("emp_cd")) {
        contentArray.push({
          item1: item.emp_id,
          item2: item.emp_nm,
          item3: item.emp_hrd,
          itemcode: item.emp_cd,

        });
        label = "사원 수"
      } else if (item.hasOwnProperty("dept_cd")) {
        contentArray.push({
          item1: item.dept_st,
          item2: item.dept_nm,
          item3: item.dept_cd,
          itemcode: item.dept_cd,

        });
        label = "부서 수"
      } else if (item.hasOwnProperty("tr_cd")) {
        contentArray.push({
          item1: item.tr_cd,
          item2: item.reg_nb,
          item3: item.tr_nm,
          item4: item.tr_fg,
          itemcode: item.tr_cd,
          
        });
        label = "거래처"
      }
    });

    return (
      <div
        class="cardlist-container"
        style={{
          width: "280px",
          maxWidth: "280px",
          minWidth: "280px",
          marginLeft: "10px",
          marginRight: "10px",
          borderTop: "3px solid black",
        }}
      >
        <div>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              style={{ backgroundColor: "#ECECEC", marginBottom: "5px" }}
              class="noHoverEffect"
            >
              <CardContent>
                <Typography variant="caption">
                  {label} : {content.length}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                  최초입사일
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ overflowY: "auto", maxHeight: "600px" }}>
              {/* 스크롤바 영역 설정 */}
              <Grid container spacing={2}>
                {contentArray.map((contentArray, index) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                    <Card
                      sx={{
                        borderRadius: "5px",
                        border: "0.5px solid lightgrey",
                        marginRight: "2px",
                        display: "flex",
                      }}
                      onClick={() =>
                        this.props.handleCardClick(contentArray.itemcode)}
                    >
                      {/* 프로필 이미지 */}
                      <img
                        src={profile}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginLeft: "10px",
                          marginTop: "10px",
                          borderRadius: "3px",
                        }}
                      ></img>
                      <CardContent
                        sx={{ paddingLeft: "3px", paddingRight: "1px" }}
                      >
                        {/* item1,item2 */}
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
                          {contentArray.item1}
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
                          {contentArray.item2}
                        </Typography>
                        <div> </div>
                      </CardContent>
                      <CardContent
                        style={{
                          marginLeft: "30px",
                          paddingLeft: "0",
                          paddingRight: "0",
                          minWidth: "100px",
                        }}
                      >
                        {/* item3 */}
                        <Typography variant="body2">
                          {contentArray.item3}
                        </Typography>
                        {/* item3 */}
                        <Typography variant="body2">
                          {contentArray.item4}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#FFFFFF", color: "#7A7A7A" }}
              onClick={() => this.props.handleNewButtonClick()}
            >
              추가
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

export default CardList;