import { Component } from "react";
import LoginImage from '../images/mainPage.png'
class MainPageHome extends Component {
  render() {
    return (
      <img src={LoginImage}
        alt=""
        style={{ marginLeft: '200px', width: '1090px', }}
      />
    )
  }

}
export default MainPageHome;