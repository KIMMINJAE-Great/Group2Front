import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class Acd1010 extends Component {
  render() {
    return (

      <ListItemButton sx={{ pl: 10 }}>
        <ListItemText primary="차량등록" primaryTypographyProps={{ fontSize: '15px' }} />
      </ListItemButton>

    )
  }
}

export default Acd1010;