import { Component } from "react";
import { get } from "../../components/api_url/API_URL";
import { Menu, MenuItem, Popover, Select } from "@mui/material";
class UseFg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usefg: [],
      isOpen: false,
      selectedValue: '',
    }
  }
  componentDidMount() {
    this.getusefg()

  }

  getusefg = async () => {
    try {
      const response = await get('/ace1010/usefg');
      console.log('여기 ' + JSON.stringify(response.data))
      this.setState({ usefg: response.data });
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

    const selectedValue = this.state.usefg.find(item => item.d_id === id).d_nm;
    this.setState({ selectedValue });
    console.log('selectedValue......... : ' + selectedValue)
    // 부모 컴포넌트에 선택된 d_nm 값 전달
    if (this.props.onSelectUsefgChange) {
      console.log('selectedValue......... : ' + selectedValue)
      this.props.onSelectUsefgChange(selectedValue);

    }

  }

  render() {
    const { usefg } = this.state;
    return (

      <Menu
        open={this.props.usefgopen}
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
        {usefg.map((item) =>
          <MenuItem sx={{ width: '118px', textAlign: 'center' }} key={item.d_id} value={item.d_id} onClick={() => this.handleSelectChange(item.d_id)}>{item.d_nm}</MenuItem>
        )}
      </Menu>
    )

  }

}


export default UseFg;