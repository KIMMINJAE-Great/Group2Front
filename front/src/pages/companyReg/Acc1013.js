import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class Acc1013 extends Component {
  render() {
    return (

      <ListItemButton sx={{ pl: 10 }}>

        <ListItemText primary="회사등록" primaryTypographyProps={{ fontSize: '15px' }} />
      </ListItemButton>

    )
  }
}

export default Acc1013
  ;