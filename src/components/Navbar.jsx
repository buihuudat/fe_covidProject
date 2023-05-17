import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { navData } from "../resources/dataJson";
import { useLocation, useNavigate } from "react-router-dom";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import { useSelector } from "react-redux";
import { ListItemIcon, ListItemText } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
function Navbar() {
  const user = useSelector((state) => state.user.data);
  const settings = [
    {
      name: "Login",
      path: "/dang-nhap",
      icon: <LoginIcon />,
      show: !user?._id ? true : false,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
      show: user?._id && user?.role !== "user" ? true : false,
    },
    {
      name: "Profile",
      path: "/thong-tin-ca-nhan",
      icon: <AccountBoxIcon />,
      show: user?._id ? true : false,
    },
    {
      name: "Logout",
      path: "/dang-xuat",
      icon: <LogoutIcon />,
      show: user?._id ? true : false,
    },
    {
      name: "darkmode",
      path: "/darkmode",
      icon: true ? <DarkModeIcon /> : <ModeNightIcon />,
      show: true,
    },
  ].filter((s) => s.show === true);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (props) => {
    setAnchorElNav(null);
    navigate(props.path);
  };

  const handleCloseUserMenu = (e) => {
    if (e.path) {
      if (e.path === "/dang-xuat") {
        localStorage.removeItem("token");
        navigate("/dang-nhap");
      } else {
        navigate(e.path);
      }
    }
    setAnchorElUser(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <AppBar position="fixed" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CoronavirusIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
            color="error"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Covid
          </Typography>

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
              {navData.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={() => handleCloseNavMenu(item)}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Covid
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                gap: 3,
              },
            }}
          >
            {navData.map((item) => (
              <Button
                key={item.title}
                onClick={() => handleCloseNavMenu(item)}
                sx={{
                  my: 2,
                  color: item.path === pathname ? "primary" : "",
                  fontWeight: item.path === pathname ? 800 : 600,
                  fontSize: item.path === pathname ? 18 : 14,
                  display: "block",
                  "&:hover": {
                    color: "primary",
                  },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          {/* test covid button */}
          <Button variant="contained" onClick={() => navigate("dang-ky-test")}>
            Đăng ký test Covid
          </Button>

          {/* search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>

          <Box sx={{ flexGrow: 0, ml: 4 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user ? `${user.firstName} ${user.lastName}` : "Avatar"}
                  src={user && user.avatar}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting?.name}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <ListItemIcon>{setting?.icon}</ListItemIcon>
                  <ListItemText>{setting?.name}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
