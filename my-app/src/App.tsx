import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/header/header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import PrivateRoute from "./router/privateRoute";
import StorageKeys from "./service/constants";
import { ReactQueryDevtools } from "react-query/devtools";
import SignUp from "./pages/signUp/signUp";
import { router } from "./router/router";
import { IRouter } from "./types/type";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import SimpleSnackbar from "./components/alert/alert";

const queryClient = new QueryClient();
function App() {
  let token = localStorage.getItem(StorageKeys.TOKEN);
  const [login, setLogin] = useState(token ? true : false);
  let tab: IRouter[] = [
    { name: "Login", path: "/login" },
    { name: "Sign up", path: "/signup" },
  ];
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const handleOpenAlert = (message: string) => {
    setOpenAlert(true);
    setMessage(message);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const tabHeader = login ? router.filter((item) => item.header) : tab;
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Header tab={tabHeader} login={login} setLogin={setLogin} />
          <QueryClientProvider client={queryClient}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/truck" />
              </Route>
              <Route
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    setLogin={setLogin}
                    handleOpenAlert={handleOpenAlert}
                  />
                )}
                exact
              />
              <Route
                path="/signup"
                render={(props) => (
                  <SignUp
                    {...props}
                    setLogin={setLogin}
                    handleOpenAlert={handleOpenAlert}
                  />
                )}
                exact
              />
              {router.map((item: IRouter) => (
                <PrivateRoute
                  key={item.name}
                  login={login}
                  path={item.path}
                  component={item.component}
                  handleOpenAlert={handleOpenAlert}
                  exact
                />
              ))}
            </Switch>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <SimpleSnackbar
            open={openAlert}
            handleCloseAlert={handleCloseAlert}
            message={message}
          />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
