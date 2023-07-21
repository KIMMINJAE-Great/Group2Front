import { Component } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class Acc1012 extends Component {
    render() {
        return (
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 10 }}>
                    <ListItemText primary="거래처관리" />
                </ListItemButton>
            </List>

        )
    }

}

export default Acc1012;