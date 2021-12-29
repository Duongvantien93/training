// @flow
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import StorageKeys from "../../service/contants";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  word: {
    margin: 0,
    padding: 0,
    textTransform: "capitalize",
  },
  div: {
    "& button": {
      margin: 0,
      "& p": {
        margin: 0,
      },
    },
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      margin: 0,
      "& span": {
        margin: 0,
        textTransform: "none",
      },
    },
  },
});

export default function Header({
  login,
  setLogin,
  tab,
}: {
  login: boolean;
  setLogin: (login: boolean) => void;
  tab: any;
}) {
  const classes = useStyles();
  let user = localStorage.getItem(StorageKeys.USER);
  let convertUser = user ? JSON.parse(user) : {};
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
      <Box
        className={classes.div}
        sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}
      >
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
            {tab.map((page: any) => (
              <MenuItem key={page.name}>
                <Typography
                  onClick={() => history.push(page.path)}
                  textAlign="center"
                  className={classes.word}
                >
                  {page.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          className={classes.div}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {tab.map((page: any) => (
            <Button
              key={page.name}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography
                className={classes.word}
                onClick={() => history.push(page.path)}
                textAlign="center"
              >
                {page.name}
              </Typography>
            </Button>
          ))}
        </Box>
        {login && (
          <Box className={classes.box}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Typography
                variant="button"
                onClick={() => {
                  history.push("/account");
                }}
                textAlign="center"
              >
                {convertUser.email}
              </Typography>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Typography
                variant="button"
                onClick={() => {
                  localStorage.removeItem(StorageKeys.TOKEN);
                  setLogin(false);
                  history.push("/login");
                }}
                textAlign="center"
              >
                Logout
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </AppBar>
  );
}
