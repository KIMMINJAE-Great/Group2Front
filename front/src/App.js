import './App.css';
import Login from './components/login/Login';
import MainPage from './components/mainpage/MainPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import { Component } from 'react';


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
            <Route path='/' component={Login} />
          </Switch>
        </Router>
        {/* 깃 커밋 테스트 */}
      </div>
    );
  }

}

export default App;
