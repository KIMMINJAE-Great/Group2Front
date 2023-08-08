import { Component } from "react";
import { get } from "../../components/api_url/API_URL";
import { Menu, MenuItem, Popover, Select } from "@mui/material";
class StartEndFg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startendfg: [],
      isOpen: false,
      selectedValue: '',
    }
  }
  componentDidMount() {
    this.getstartendfg()

  }

  getstartendfg = async () => {
    try {
      const response = await get('/ace1010/startendfg');
      this.setState({ startendfg: response.data });
    } catch (error) {

    }
  }
  // Popover 닫기
  // handleClose = () => {
  //   this.setState({ isOpen: false });
  //   // 부모 컴포넌트의 onClose 콜백을 호출
  //   if (this.props.onClose) {
  //     this.props.onClose();
  //   }
  // }


  handleSelectChange = (id) => {

    const selectedValue = this.state.startendfg.find(item => item.p_id === id).p_nm;
    this.setState({ selectedValue });
    console.log('selectedValue......... : ' + selectedValue)
    // 부모 컴포넌트에 선택된 d_nm 값 전달
    if (this.props.onSelectStartendfgChange) {
      console.log('selectedValue......... : ' + selectedValue)
      this.props.onSelectStartendfgChange(selectedValue);

    }

  }

  render() {
    const { startendfg } = this.state;
    return (

      <Menu
        open={this.props.startendfgopen}
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
        {startendfg.map((item) =>
          <MenuItem sx={{ width: '118px', textAlign: 'center' }} key={item.p_id} value={item.p_id} onClick={() => this.handleSelectChange(item.p_id)}>{item.p_nm}</MenuItem>
        )}
      </Menu>
    )

  }

}


export default StartEndFg;