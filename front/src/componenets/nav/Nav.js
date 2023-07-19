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
import RegCar from './regCar/RegCar';
import CarDriveLogManagement from './carDriveLogManagement/CarDriveLogManagement';
import RelCostState from './relCostState/RelCostState';
import CheckIcon from '@mui/icons-material/Check';
import './nav.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { withRouter } from 'react-router-dom';

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
  };

  handleMainClick = (index) => {
    this.setState(prevState => ({
      openSections: {
        ...prevState.openSections,
        [index]: !prevState.openSections[index]
      }
    }));
  };
  handleButtonClick = (value, url) => {
    this.props.history.push(`/${url}`);
    this.props.onButtonClick(value);
  };


  sections = [
    {
      auth: 'ROLE_USER',
      title: '기초정보관리',
      subItems: ['사원관리', '부서관리', '거래처관리', '회사등록'],
      url: ['empmanagement', 'depmanagement', 'trademanagement', 'companyreg'],
    },
    {
      auth: 'ROLE_MANAGER',
      title: '업무승용차관리(회계)',
      subItems: ['차량등록', '운행기록부(관리용)', '관련비용명세서'],
      url: ['regcar', 'cardrivelogmanagement', 'relcoststate'],
    },
    {
      auth: 'ROLE_ADMIN',
      title: '업무승용차관리(임직원)',
      subItems: ['운행기록부(개인화)', '운행기록부(엑셀업로드)'],
      url: ['cardrivelogpersonal', 'cardriveexcelupload']
    },
    // 추가적인 섹션을 여기에 추가
  ];

  getUserRole = () => {
    const user = sessionStorage.getItem('user');
    const userAuthObj = JSON.parse(user);
    return userAuthObj.authorities[0].authority;
  }

  getFilteredSections = () => {
    const userRole = this.getUserRole();
    const rolesHierarchy = {
      'ROLE_USER': ['ROLE_USER'],
      'ROLE_MANAGER': ['ROLE_USER', 'ROLE_MANAGER'],
      'ROLE_ADMIN': ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN']
    };

    return this.sections.filter(section => rolesHierarchy[userRole].includes(section.auth));
  }
  render() {
    const filteredSections = this.getFilteredSections();
    return (
      <ThemeProvider theme={theme}>
        <List
          sx={{
            width: '100%',
            bgcolor: '#f5f5f5',
            height: '100%',
            borderRight: 'solid 0.1px black',
            overflowY: 'auto'
          }}
          classses={{
            root: 'classes-state-root',
            disabled: 'disabled',
          }}
          component="nav"
        >
          {filteredSections.map((section, index) => (
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
                    onClick={() => this.handleButtonClick(subItem, section.url[subIndex])}
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