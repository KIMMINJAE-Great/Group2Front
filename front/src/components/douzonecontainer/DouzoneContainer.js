import { Button, Select } from "@mui/material";
import { Component } from "react"
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./douzonecontainer.css"
class DouzoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const showDelete = this.props.onDelete
    return (
      <div className="douzone-container">
        <div className="container-header">
          <div className="container-header-left" >
            {this.props.title}
          </div>
          <div className="container-header-right">
            <div className="functionButton">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={this.handleClick}
              >
                기능모음
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={this.state.anchorEl}
                open={open}
                onClose={this.handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
            <span style={{ color: 'lightgrey' }}>|</span>
            <DeleteIcon className="deleteIcon" onClick={this.props.delete} sx={{ fontSize: 30 }}></DeleteIcon>


          </div>
        </div>

        <div className="children" style={{ marginTop: '10px' }}>
          {this.props.children}
        </div>
      </div >
    )
  }
}

export default DouzoneContainer;