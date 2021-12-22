import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { TruckDetail } from "./components/truckDetail/truckDetail";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Login from "./components/login/Login";
import Driver from "./components/driver/Driver";
import Cargo from "./components/cargo/Cargo";
import Home from "./components/home/home";
import PrivateRoute from "./PrivateRouting/PrivateRoute";
const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <div>
        <Header />
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/driver" component={Driver} exact />
            <PrivateRoute path="/cargo" component={Cargo} exact />
            <PrivateRoute path="/truck/:id" component={TruckDetail} exact />
          </Switch>
        </QueryClientProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
