import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Error404 from "../pages/Error404";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const PrivateRoute = ({ component: Component, authed, rest }) => (
  <Route
    {...rest}
    render={props =>
      authed === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PublicRoute = ({ component: Component, authed, rest }) => (
  <Route
    {...rest}
    render={props =>
      authed === false ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
);

const Routes = ({ auth }) => {
  return (
    <Switch>
      <PublicRoute path="/" exact authed={auth} component={Login} />
      <PrivateRoute
        path="/dashboard"
        exact
        authed={auth}
        component={Dashboard}
      />
      <Route component={Error404} />
    </Switch>
  );
};

export default Routes;
