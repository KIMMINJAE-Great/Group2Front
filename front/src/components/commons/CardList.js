import React, { Component } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({ content: this.props.content })



    }
  }






  render() {
    const { onCardItemDraw } = this.props;
    const template = onCardItemDraw(this.state.content);





    return (


      <div
        className="cardlist-container"
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
            {template}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#FFFFFF", color: "#7A7A7A", marginTop: '5px' }}
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
