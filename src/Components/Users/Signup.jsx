import React, { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from "../../util/apiService";

const isEmpty = (value) => value.trim() === "";
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
const isValidPassportNumber = (passportNumber) =>
  /^[A-Z0-9]{9}$/.test(passportNumber);

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        if (onClick) {
          onClick(event);
        }
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Signup() {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    passportNumber: true,
    nationality: true,
    contactDetails: true,
    username: true,
    password: true,
    confirmPassword: true,
  });
  const [formValues, setFormValues] = useState({
    name: "",
    passportNumber: "",
    nationality: "",
    contactDetails: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    const enteredNameIsValid = !isEmpty(formValues.name);
    const enteredPassportNumberIsValid = isValidPassportNumber(formValues.passportNumber);
    const enteredNationalityIsValid = !isEmpty(formValues.nationality);
    const enteredContactDetailsIsValid = isValidEmail(formValues.contactDetails);
    const enteredUsernameIsValid = !isEmpty(formValues.username);
    const enteredPasswordIsValid = isValidPassword(formValues.password);
    const enteredConfirmPasswordIsValid = formValues.password === formValues.confirmPassword;
  
    setFormInputsValidity({
      name: enteredNameIsValid,
      passportNumber: enteredPassportNumberIsValid,
      nationality: enteredNationalityIsValid,
      contactDetails: enteredContactDetailsIsValid,
      username: enteredUsernameIsValid,
      password: enteredPasswordIsValid,
      confirmPassword: enteredConfirmPasswordIsValid,
    });
  
    const formIsValid = enteredNameIsValid && enteredPassportNumberIsValid && enteredNationalityIsValid && enteredContactDetailsIsValid && enteredUsernameIsValid && enteredPasswordIsValid && enteredConfirmPasswordIsValid;
  
    if (!formIsValid) {
      return;
    }
  
    try {
      const response = await apiService.post('/public/auth/passengers/register', formValues);
  
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message || "Signup failed!");
    }
  };
  
  
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton
                variant="soft"
                color="primary"
                size="sm"
                style={{ maxHeight: "5px" }}
              >
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      display: "block",
                      minHeight: "84px",
                      width: "84px",
                    }}
                  />
                </Link>
              </IconButton>
              <Typography level="title-lg">AMS</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link to="/login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSignup}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.name && (
                    <Typography color="error">
                      Name field is empty!
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Passport Number</FormLabel>
                  <Input
                    type="text"
                    name="passportNumber"
                    value={formValues.passportNumber}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.passportNumber && (
                    <Typography color="error">
                      Passport Number must be exactly 9 characters!
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Nationality</FormLabel>
                  <Input
                    type="text"
                    name="nationality"
                    value={formValues.nationality}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.nationality && (
                    <Typography color="error">
                      Nationality field is empty!
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="contactDetails"
                    value={formValues.contactDetails}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.contactDetails && (
                    <Typography color="error">
                      Please enter a valid email address!
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.username && (
                    <Typography color="error">
                      Username field is empty!
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.password && (
                    <Typography color="error">
                      Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character!
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                  />
                  {!formInputsValidity.confirmPassword && (
                    <Typography color="error">
                      Passwords do not match!
                    </Typography>
                  )}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth>
                    Sign up
                  </Button>
                  {error && <Typography color="error">{error}</Typography>}
                  {success && (
                    <Typography color="success">{success}</Typography>
                  )}
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © AMS {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
