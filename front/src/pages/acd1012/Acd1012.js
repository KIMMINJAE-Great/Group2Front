import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class Acd1012 extends Component {
  render() {
    return (

      <ListItemButton sx={{ pl: 10 }}>

        <ListItemText primary="관련비용명세서" />
      </ListItemButton>

    )
  }
}

export default Acd1012;