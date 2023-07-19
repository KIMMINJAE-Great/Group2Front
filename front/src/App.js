import './App.css';
import Login from './componenets/login/Login';
import MainPage from './componenets/mainpage/MainPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './componenets/routes/PrivateRoute';
import { Component } from 'react';
import { Switch } from 'react-router-dom';
import Test from './pages/Test';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
  }

  handleClick = () => {
    this.setState({ showComponent: true });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute path='/mainpage' component={MainPage} />
            <Route path="/test" component={Test} />
            <Route path='/' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
