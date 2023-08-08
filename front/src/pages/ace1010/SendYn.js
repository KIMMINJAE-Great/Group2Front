import { Component } from "react";
import { get } from "../../components/api_url/API_URL";
import { Menu, MenuItem, Popover, Select } from "@mui/material";
class SendYn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendyn: [],
      isOpen: false,
      selectedValue: '',
    }
  }
  componentDidMount() {
    this.getsendyn()

  }

  getsendyn = async () => {
    try {
      const response = await get('/ace1010/sendyn');
      this.setState({ sendyn: response.data });
      console.log(JSON.stringify(response.data))
    } catch (error) {

    }
  }
  // Popover 닫기
  handleClose = () => {
    this.setState({ isOpen: false });
    // 부모 컴포넌트의 onClose 콜백을 호출
    if (this.props.onClose) {
      this.props.onClose();
    }
  }


  handleSelectChange = (id) => {

    const selectedValue = this.state.sendyn.find(item => item.s_id === id).s_nm;
    this.setState({ selectedValue });
    console.log('selectedValue......... : ' + selectedValue)
    // 부모 컴포넌트에 선택된 d_nm 값 전달
    if (this.props.onSelectsendynChange) {
      console.log('selectedValue......... : ' + selectedValue)
      this.props.onSelectsendynChange(selectedValue);

    }

  }

  render() {
    const { sendyn } = this.state;
    return (

      <Menu
        open={this.props.sendynopen}
        anchorEl={this.props.anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
        {sendyn.map((item) =>
          <MenuItem sx={{ width: '118px', textAlign: 'center' }} key={item.s_id} value={item.s_id} onClick={() => this.handleSelectChange(item.s_id)}>{item.s_nm}</MenuItem>
        )}
      </Menu>
    )

  }

}


export default SendYn;