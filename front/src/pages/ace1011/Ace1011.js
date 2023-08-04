import { Component } from "react";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


class Ace1011 extends Component {
  render() {
    return (

      <ListItemButton sx={{ pl: 10 }}>
        <ListItemText primary="운행기록부(관리용)" primaryTypographyProps={{ fontSize: '15px' }} />
      </ListItemButton>

    )
  }
}

export default Ace1011;