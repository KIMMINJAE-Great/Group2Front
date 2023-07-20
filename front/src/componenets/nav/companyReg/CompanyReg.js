import { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

class CompanyReg extends Component {
  render() {
    return (
      <form>
        <div style={{ padding: "0px" }}>
          <h2 style={{ margin: "0px" }}>
            회사등록<br></br>
          </h2>
          <hr
            style={{
              borderColor: "lightgray",
              float: "left",
              width: "100%",
              padding: "0px",
            }}
          />
        </div>
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

          <div>
            <div style={{ display: "flex" }}>
              <p>상세정보</p>
              <div style={{ float: "right" }}>
                <button>저장</button>
                <button>삭제</button>
              </div>
            </div>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">회사 이름</Typography>
                <TextField fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">회사 주소</Typography>
                <TextField fullWidth variant="outlined" />
              </Grid>
            </Grid>

            <div></div>
          </div>
        </div>
      </form>
    );
  }
}

export default CompanyReg;
