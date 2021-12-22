import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";

function PrivateRoute({ component: Component, login: login, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        login ? <Component {...rest} {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
const connector = connect((state: RootState) => {
  return {
    login: state.trucks.login,
  };
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PrivateRoute);
