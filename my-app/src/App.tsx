import React, { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Driver from "./pages/driver/driver";
import Cargo from "./pages/cargo/cargo";
import PrivateRoute from "./router/privateRoute";
import StorageKeys from "./service/contants";
import Home from "./pages/home/home";
import DetailTruck from "./pages/detailTruck/detailTruck";
import NewTruck from "./pages/newTruck/newTruck";
import { ReactQueryDevtools } from "react-query/devtools";
import DetailDriver from "./pages/detailDriver/detailDriver";
import NewDriver from "./pages/newDriver/newDriver";
import DetailCargo from "./pages/detailCargo/detailCargo";
import NewCargo from "./pages/newCargo/newCargo";
import SignUp from "./pages/signUp/signUp";
import MyAccount from "./pages/myAccount/myAccount";
import { router } from "./router/router";

const queryClient = new QueryClient();
function App() {
  let token = localStorage.getItem(StorageKeys.TOKEN);
  const [login, setLogin] = useState(token ? true : false);
  let tab = [
    { name: "Login", path: "/login" },
    { name: "Sign up", path: "/signup" },
  ];
  const tabHeader = login ? router.filter((item: any) => item.header) : tab;
  return (
    <Router>
      <div>
        <Header tab={tabHeader} login={login} setLogin={setLogin} />
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/truck" />
            </Route>
            <Route
              path="/login"
              render={(props) => <Login {...props} setLogin={setLogin} />}
              exact
            />
            <Route
              path="/signup"
              render={(props) => <SignUp {...props} setLogin={setLogin} />}
              exact
            />
            {router.map((item: any) => (
              <PrivateRoute
                login={login}
                path={item.path}
                component={item.component}
                exact
              />
            ))}
          </Switch>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
