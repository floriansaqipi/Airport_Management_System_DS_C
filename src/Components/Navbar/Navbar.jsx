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
import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
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

  const auth = useRouteLoaderData("root");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link to="/">
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
              </Link>

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
                  <MenuItem key="home" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
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
                    </Typography>
                  </MenuItem>
                  {auth && auth.role=="ADMIN"&&(
                  <MenuItem key="users" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
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
                    </Typography>
                  </MenuItem>)}
                  {auth && auth.role=="ADMIN" && (
                  <MenuItem key="abilities" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/abilities"
                        style={{
                          display: "block",
                          padding: "10px",
                          color: "hsl(240, 1%, 48%)",
                          borderRadius: "5px",
                        }}
                      >
                        Abilities
                      </NavLink>
                    </Typography>
                  </MenuItem>)}
                  <MenuItem key="flights" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
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
                    </Typography>
                  </MenuItem>
                  {auth && (
                    <MenuItem key="tickets" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
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
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem key="airports" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
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
                    </Typography>
                  </MenuItem>
                  <MenuItem key="airlines" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/airlines"
                        style={{
                          display: "block",
                          padding: "10px",
                          color: "hsl(240, 1%, 48%)",
                          borderRadius: "5px",
                        }}
                      >
                        Airlines
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  {auth && (
                    <MenuItem key="baggage" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
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
                      </Typography>
                    </MenuItem>
                  )}
                  {auth && (
                    <MenuItem key="boarding_passes" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink
                          to="/boarding_passes"
                          style={{
                            display: "block",
                            padding: "10px",
                            color: "hsl(240, 1%, 48%)",
                            borderRadius: "5px",
                          }}
                        >
                          Boarding Passes
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  )}
                  {auth && auth.role !== "PASSENGER" && (
                    <MenuItem key="passengers" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
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
                      </Typography>
                    </MenuItem>
                  )}
                  {auth && auth.role === "ADMIN" && (
                    <MenuItem key="employees" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
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
                      </Typography>
                    </MenuItem>
                  )}
                  {auth && auth.role === "ADMIN" && (
                    <MenuItem key="users" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
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
                      </Typography>
                    </MenuItem>
                  )}
                  {!auth && (
                    <MenuItem key="login" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink
                          to="/login"
                          style={{
                            display: "block",
                            padding: "10px",
                            color: "hsl(240, 1%, 48%)",
                            borderRadius: "5px",
                          }}
                        >
                          Login
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  )}
                  {!auth && (
                    <MenuItem key="signup" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink
                          to="/signup"
                          style={{
                            display: "block",
                            padding: "10px",
                            color: "hsl(240, 1%, 48%)",
                            borderRadius: "5px",
                          }}
                        >
                          Signup
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  )}
                  {auth && (
                    <Form action="/logout" method="post">
                      <Button
                        onClick={handleCloseNavMenu}
                        type="submit"
                        sx={{
                          color: "hsl(240, 1%, 48%)",
                          display: "block",
                        }}
                        style={{
                          padding: "10px 26px",
                          borderRadius: "5px",
                          width: "100%",
                          height: "100%",
                          textAlign: "left",
                        }}
                      >
                        Logout
                      </Button>
                    </Form>
                  )}
                </Menu>
              </Box>
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
                {auth &&(
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
                )}
                {auth &&(
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                  >
                    <NavLink
                      to="/boarding_passes"
                      style={{
                        display: "block",
                        padding: "10px",
                        color: "hsl(240, 1%, 48%)",
                        borderRadius: "5px",
                      }}
                    >
                      Boarding Passes
                    </NavLink>
                  </Button>
                )}
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
                    to="/airlines"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "hsl(240, 1%, 48%)",
                      borderRadius: "5px",
                    }}
                  >
                    Airlines
                  </NavLink>
                </Button>
                {auth && (
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
                )}
                {auth && auth.role !== "PASSENGER" && (
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
                )}
                {auth && auth.role == "ADMIN" && (
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "hsl(240, 1%, 48%)", display: "block" }}
                  >
                    <NavLink
                      to="/abilities"
                      style={{
                        display: "block",
                        padding: "10px",
                        color: "hsl(240, 1%, 48%)",
                        borderRadius: "5px",
                      }}
                    >
                      Abilities
                    </NavLink>
                  </Button>
                )}
                {auth && auth.role === "ADMIN" && (
                  <React.Fragment>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "hsl(240, 1%, 48%)",
                        display: "block",
                      }}
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
                      sx={{
                        my: 2,
                        color: "hsl(240, 1%, 48%)",
                        display: "block",
                      }}
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
                  </React.Fragment>
                )}
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", justifyContent: "right" },
                }}
              >
                {!auth && (
                  <React.Fragment>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "hsl(240, 1%, 48%)",
                        display: "block",
                      }}
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
                        Login
                      </NavLink>
                    </Button>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "hsl(240, 1%, 48%)",
                        display: "block",
                      }}
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
                        Signup
                      </NavLink>
                    </Button>
                  </React.Fragment>
                )}
                {auth && (
                  <Form action="/logout" method="post">
                    <Button
                      onClick={handleCloseNavMenu}
                      type="submit"
                      sx={{
                        my: 2,
                        color: "hsl(240, 1%, 48%)",
                        display: "block",
                      }}
                      style={{
                        padding: "16px 18px",
                        borderRadius: "5px",
                      }}
                    >
                      Logout
                    </Button>
                  </Form>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Navbar;
