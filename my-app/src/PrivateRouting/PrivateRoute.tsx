import { Route, Redirect } from "react-router-dom";
import StorageKeys from "../service/contants";

export default function PrivateRoute({
  component: Component,
  login,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        login ? <Component {...rest} {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
