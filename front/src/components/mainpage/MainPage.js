import { Component } from "react";
import Header from "../header/Header";
import Nav from "../nav/Nav.js";
import LoginImage from '../../images/mainPage.png'
import './mainPage.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import PrivateRoute from '../components/routes/PrivateRoute';
import Acc1010 from './../../pages/acc1010/Acc1010';
import Acc1011 from './../../pages/acc1011/Acc1011';
import Acc1012 from './../../pages/acc1012/Acc1012';
import Acd1010 from './../../pages/acd1010/Acd1010';
import Acd1011 from './../../pages/acd1011/Acd1011';
import Acd1012 from './../../pages/acd1012/Acd1012';
import Ace1010 from './../../pages/ace1010/Ace1010';
import Ace1011 from './../../pages/ace1011/Ace1011';
import Acc1013 from './../../pages/acc1013/Acc1013';

import { Redirect } from "react-router-dom/cjs/react-router-dom";
import MainPageHome from "../../pages/MainPageHome";
import PrivateRoute from "../routes/PrivateRoute";

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedButton: '',
      isButtonClicked: false,// 이미지 제거 
      componentToShow: null,
      drawer: true,

    };

  }
  // 네브 바 메뉴 열기
  handleButtonClick = async (value) => {
    this.setState({ selectedButton: value, isButtonClicked: true }, () => {

    });

  };
  // 네브 바 좌우 열고 닫기
  changeNav() {
    this.setState((prevState) => ({ drawer: !prevState.drawer }));
  }


  render() {

    const { selectedButton, drawer, isButtonClicked } = this.state;

    return (
      <Router>
        <div className="mainPage-container">
          <Header selectedButton={selectedButton} changeNav={this.changeNav.bind(this)}></Header>

          <div style={{ display: 'flex' }}>

            <div className={drawer === true ? "nav-container" : "navhide"}>

              <Nav onButtonClick={this.handleButtonClick} ></Nav>
            </div>
            <div className="section-container" style={{ paddingLeft: 2 }} >

              <Switch>
                <Route path='/mainpage' exact component={MainPageHome} />
                <Route path='/mainpage/empmanagement' component={Acc1010} />
                <Route path='/mainpage/depmanagement' component={Acc1011} />
                <Route path='/mainpage/trademanagement' component={Acc1012} />
                <Route path='/mainpage/companyreg' component={Acc1013} />
                <Route path='/mainpage/regcar' component={Acd1010} />
                <Route path='/mainpage/cardrivelogmanagement' component={Acd1011} />
                <Route path='/mainpage/relcoststate' component={Acd1012} />
                <Route path='/mainpage/cardrivelogpersonal' component={Ace1010} />
                <Route path='/mainpage/cardriveexcelupload' component={Ace1011} />
              </Switch>


            </div>
          </div>

        </div>
      </Router>
    )

  }

}


export default MainPage;