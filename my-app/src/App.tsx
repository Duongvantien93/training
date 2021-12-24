import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryResult,
} from "react-query";
import TruckDetail from "./components/truckDetail/truckDetail";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";
import Driver from "./components/driver/Driver";
import Cargo from "./components/cargo/Cargo";
import Home from "./components/home/home";
import PrivateRoute from "./PrivateRouting/PrivateRoute";
import StorageKeys from "./service/contants";
import NewTruck from "./components/home/newTruck";

const queryClient = new QueryClient();
function App() {
  let token = localStorage.getItem(StorageKeys.TOKEN);
  const [login, setLogin] = useState(token ? true : false);

  return (
    <Router>
      <div>
        <Header login={login} setLogin={setLogin} />
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/login"
              render={(props) => <Login {...props} setLogin={setLogin} />}
              exact
            />
            <PrivateRoute
              login={login}
              path="/driver"
              component={Driver}
              exact
            />

            <PrivateRoute
              login={login}
              path="/truck/newTruck"
              component={NewTruck}
            />
            <PrivateRoute login={login} path="/cargo" component={Cargo} exact />
            <PrivateRoute
              login={login}
              path="/truck/:id"
              component={TruckDetail}
            />
          </Switch>
        </QueryClientProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
