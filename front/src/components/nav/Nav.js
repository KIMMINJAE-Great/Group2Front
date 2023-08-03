import React, { Component } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CheckIcon from '@mui/icons-material/Check';
import './nav.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { withRouter } from 'react-router-dom';
import { MenuCollection } from './../menu/MenuCollection';
const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '15px',
          fontWeight: 'bold',
          height: '15px',
          lineHeight: '15px'
        },
      },
    },
  }
});

class Nav extends Component {
  state = {
    openSections: {},
    sections: MenuCollection(),
  };

  // 메뉴 열기
  handleMainClick = (index) => {
    this.setState(prevState => ({
      openSections: {
        ...prevState.openSections,
        [index]: !prevState.openSections[index]
      }
    }));
    console.log('메뉴열기')
  };

  // 메뉴 컴포넌트 호출
  handleButtonClick = (value, url, menucd) => {
    console.log('메뉴 컴포넌트 호출')
    this.props.history.push(`/mainpage/${url}`);
    this.props.onButtonClick(value, url, menucd);
  };

  render() {
    const { sections } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <List
          sx={{
            width: '100%',
            bgcolor: '#f5f5f5',
            height: '99.9%',
            borderRight: 'solid 0.1px black',
            overflowY: 'auto'
          }}
          component="nav"
        >
          {sections.map((section, index) => (
            <React.Fragment key={section.title}>
              <ListItemButton onClick={() => this.handleMainClick(index)}>
                <ListItemText primary={section.title} />
                {this.state.openSections[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={this.state.openSections[index] || false} timeout="auto" unmountOnExit>
                {section.subItems.map((subItem, subIndex) => (
                  <ListItemButton
                    sx={{
                      pl: 5,
                      backgroundColor: 'white',
                      marginBottom: '-7px'
                    }}
                    onClick={() => this.handleButtonClick(section.title, section.url[subIndex], section.menucd[subIndex])}
                    data-menucd={section.menucd[subIndex]}
                    key={subItem}
                  >
                    <ListItemText primary={subItem} />
                  </ListItemButton>
                ))}
              </Collapse>
              <hr />
            </React.Fragment>
          ))}
        </List>
      </ThemeProvider>
    );
  }
}

export default withRouter(Nav);