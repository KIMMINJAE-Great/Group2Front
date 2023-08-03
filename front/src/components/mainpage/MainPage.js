import { Component } from "react";
import Header from "../header/Header";
import Nav from "../nav/Nav.js";
import LoginImage from '../../images/mainPage.png'
import './mainPage.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import PrivateRoute from '../components/routes/PrivateRoute';
import Acc1010 from './../../pages/empManagement/Acc1010';
import Acc1011 from './../../pages/depManagement/Acc1011';
import Acc1012 from './../../pages/tradeManagement/Acc1012';
import Acd1010 from './../../pages/regCar/Acd1010';
import Acd1011 from './../../pages/carDriveLogManagement/Acd1011';
import Acd1012 from './../../pages/relCostState/Acd1012';
import Ace1010 from './../../pages/carDriveLogPersonal/Ace1010';
import Ace1011 from './../../pages/carDriveExcelUpload/Ace1011';
import Acc1013 from './../../pages/companyReg/Acc1013';

import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Acc1013Con from "../../pages/companyReg/Acc1013Con";
import Acc1012Con from './../../pages/tradeManagement/Acc1012Con';
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
                <Route path='/mainpage/trademanagement' component={Acc1012Con} />
                <Route path='/mainpage/companyreg' component={Acc1013Con} />
                <Route path='/mainpage/regcar' component={Acd1010} />
                <Route path='/mainpage/cardrivelogmanagement' component={Acd1011} />
                <Route path='/mainpage/relcoststate' component={Acd1012} />
                <Route path='/mainpage/cardriveexcelupload' component={Ace1010} />
                <Route path='/mainpage/cardrivelogpersonal' component={Ace1011} />
              </Switch>


            </div>
          </div>

        </div>
      </Router>
    )

  }

}


export default MainPage;