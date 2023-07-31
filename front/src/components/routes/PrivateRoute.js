import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          sessionStorage.getItem('user') ? (
            <Component {...props} />
          ) : (
            <Redirect to='/login' />
          )
        }
      />
    );
  }
}

export default PrivateRoute;