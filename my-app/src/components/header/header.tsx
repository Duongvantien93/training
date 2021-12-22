// @flow
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { logoutRequestAction } from "../../redux/actions";
import { RootState } from "../../reducers";

interface HeaderProps extends PropsFromRedux {
  login: boolean;
}
function Header({ login, logoutRequestAction }: HeaderProps) {
  let pages = login
    ? [
        { name: "Home", path: "/" },
        { name: "Driver", path: "/driver" },
        { name: "Cargo", path: "/cargo" },
        { name: "My Account", path: "/account" },
      ]
    : [
        { name: "Sign In", path: "/login" },
        { name: "Home", path: "/" },
      ];
  const [value, setValue] = useState(0);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  let history = useHistory();
  return (
    <AppBar position="static">
      <Button
        onClick={logoutRequestAction}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Go back
      </Button>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.name}>
              <Typography
                onClick={() => history.push(page.path)}
                textAlign="center"
              >
                {page.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <Typography
              onClick={() => history.push(page.path)}
              textAlign="center"
            >
              {page.name}
            </Typography>
          </Button>
        ))}
      </Box>
    </AppBar>
  );
}
const connector = connect(
  (state: RootState) => {
    return {
      login: state.trucks.login,
    };
  },
  {
    logoutRequestAction,
  }
);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Header);
