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
import PrivateRoute from "./router/privateRoute";
import StorageKeys from "./service/contants";
import { ReactQueryDevtools } from "react-query/devtools";
import SignUp from "./pages/signUp/signUp";
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
                key={item.name}
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
