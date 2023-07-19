import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class CompanyReg extends Component{
  render(){
    return(
     
      <ListItemButton sx={{ pl: 10 }}>
      
        <ListItemText primary="회사등록"  primaryTypographyProps={{fontSize: '15px'}}/>
      </ListItemButton>
    
    )
  }
}

export default CompanyReg
;