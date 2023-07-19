import { Component } from "react";
import Header from "../header/Header";
import { Link } from 'react-router-dom';
import Nav from "../nav/Nav.js";
import LoginImage from '../../images/mainPage.png'
import './mainPage.css';
import EmpManagement from "../nav/empManagement/EmpManagement";
import DepManagement from "../nav/depManagement/DepManagement";
import TradeManagement from './../nav/tradeManagement/TradeManagement';
import CompanyReg from './../nav/companyReg/CompanyReg';
import RegCar from "../nav/regCar/RegCar";
import CarDriveLogManagement from "../nav/carDriveLogManagement/CarDriveLogManagement";
import RelCostState from "../nav/relCostState/RelCostState";
import CarDriveLogPersonal from './../nav/carDriveLogPersonal/CarDriveLogPersonal';
import CarDriveExcelUpload from './../nav/carDriveExcelUpload/CarDriveExcelUpload';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import PrivateRoute from '../componenets/routes/PrivateRoute';
import { Switch } from 'react-router-dom';


class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedButton: '',
      componentToShow: null,
      drawer: true,

    };

  }
  // 네브 바 메뉴 열기
  handleButtonClick = async (value) => {
    this.setState({ selectedButton: value }, () => {

    });

  };
  // 네브 바 좌우 열고 닫기
  changeNav() {
    this.setState((prevState) => ({ drawer: !prevState.drawer }));
  }


  render() {

    const { selectedButton, drawer } = this.state;

    return (
      <Router>
        <div class="mainPage-container">
          <Header selectedButton={selectedButton} changeNav={this.changeNav.bind(this)}></Header>

          <div style={{ display: 'flex' }}>

            <div class={drawer === true ? "nav-container" : "navhide"}>

              <Nav onButtonClick={this.handleButtonClick} ></Nav>
            </div>
            <div class="section-container" style={{ paddingLeft: 2 }} >

              <Switch>

                <Route path='/empmanagement' component={EmpManagement} />
                <Route path='/depmanagement' component={DepManagement} />
                <Route path='/trademanagement' component={TradeManagement} />
                <Route path='/companyreg' component={CompanyReg} />
                <Route path='/regcar' component={RegCar} />
                <Route path='/cardrivelogmanagement' component={CarDriveLogManagement} />
                <Route path='/relcoststate' component={RelCostState} />
                <Route path='/cardriveexcelupload' component={CarDriveExcelUpload} />
                <Route path='/cardrivelogpersonal' component={CarDriveLogPersonal} />

              </Switch>


            </div>
          </div>

        </div>
      </Router>
    )

  }

}


export default MainPage;