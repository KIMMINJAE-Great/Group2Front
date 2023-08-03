import { Component } from "react";
import LoginImage from '../images/mainPage.png'
class MainPageHome extends Component {
  render() {
    return (
      <img src={LoginImage}
        alt=""
        style={{ overflowY: 'auto', marginLeft: '200px', marginTop: '20px', width: '60%', height: 'auto', maxHeight: '100%', objectFit: 'cover' }}
      />
    )
  }

}
export default MainPageHome;