import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.modules.css";


// Custom theme with provided colors and fonts
const customTheme = createTheme({
  palette: {
    primary: {
      main: "hsl(180, 15%, 95%)",
    },
    secondary: {
      main: "#f0f4f4",
    },
    text: {
      primary: "#212121", // Slightly darker gray for primary text
      secondary: "#424242", // Slightly lighter gray for secondary text
    },
    background: {
      default: "hsl(0, 0%, 96%)", // Very light gray background
    },
  },
  typography: {
    fontFamily: '"Spartan", "Montserrat", sans-serif',
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
    },
    button: {
      textTransform: "none", // Disable uppercase transformation
    },
  },
});

const pages = ["Products", "Pricing", "Blog"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img
                src={logo}
                alt="Logo"
                style={{
                  display: "block",
                  marginRight: "1rem",
                  height: "84px",
                  width: "84px",
                }}
              />

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
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                    end
                  >
                    Home
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/flights"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Flights
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/tickets"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Tickets
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/airports"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Airports
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/baggage"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Baggage
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/passengers"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Passengers
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/employees"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Employees
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/users"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Users
                  </NavLink>
                </Button>
                
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: "right" } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/login"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                    end
                  >
                    Log In
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/signup"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Sign Up
                  </NavLink>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                >
                  <NavLink
                    to="/logout"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Logout
                  </NavLink>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Navbar;
