import { ComponentType } from "react";
import { Route, Redirect } from "react-router-dom";

interface IProps {
  component?: ComponentType;
  login: boolean;
  exact: boolean;
  path: string;
  handleOpenAlert: (message: string) => void;
}
const PrivateRoute = ({ component: Component, login, ...rest }: IProps) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        login && Component ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
