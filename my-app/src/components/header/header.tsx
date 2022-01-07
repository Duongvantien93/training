// @flow
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import StorageKeys from "../../service/constants";
import { IRouter } from "../../types/type";

const Header = ({
  login,
  setLogin,
  tab,
}: {
  login: boolean;
  setLogin: (login: boolean) => void;
  tab: IRouter[];
}) => {
  let user = localStorage.getItem(StorageKeys.USER);
  let convertUser = user ? JSON.parse(user) : {};

  let history = useHistory();
  return (
    <AppBar position="static">
      <Box
        sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {tab.map((page: IRouter) => (
            <Button
              key={page.name}
              sx={{
                color: "white",
                display: "block",
              }}
              onClick={() => history.push(page.path)}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        {login && (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{ color: "white", display: "block", textTransform: "none" }}
              onClick={() => history.push("/account")}
            >
              {convertUser.email}
            </Button>
            <Button
              sx={{ color: "white", display: "block" }}
              onClick={() => {
                localStorage.clear();
                setLogin(false);
                history.push("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </AppBar>
  );
};
export default Header;
