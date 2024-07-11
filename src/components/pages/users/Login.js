import { Paper, Typography, Box, TextField, Grid, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { UserAuth } from "../../../services/api";
import { useAuth } from "../../../services/AuthContext";
import React, { useEffect } from "react";
import LoginBgImage from "../../../images/LoginImage.jpg"; // Import the image
import { makeStyles } from "@mui/styles";

// ----------------------
// ----------------------
// STYLING
// ----------------------
// ----------------------
const useStyles = makeStyles({
  CustomTextField: {
    backgroundColor: "#242582",
    marginTop: "2rem",
    borderRadius: 4,
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "primary.main",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "white",
    },
  },

  CustomButton: {
    backgroundColor: "#F64C72",
    color: "white",
    "&:hover": {
      backgroundColor: "#ff2757",
    },
    "&:disabled": {
      backgroundColor: "gray",
    },
  },
});

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, auth, showSnackbar } = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard/comparison");
    }
  }, [auth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data) {
    try {
      const response = await UserAuth.login(data);
      login(response.data.token);
      showSnackbar("Login successful!", "success");
      navigate("/dashboard/comparison");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data || "Login failed. Please try again.";
      showSnackbar(errorMessage, "error");
    }
  }

  return (
    <Grid
      container
      component="main"
      sx={{ height: "70vh", marginTop: "100px" }}
    >
      <Grid
        item
        xs={6}
        component={Paper}
        elevation={3}
        sx={{
          backgroundColor: "#242582",
          mx: "2rem",
          my: "2rem",
          zIndex: 1,
          borderRadius: "5px 50px 50px 5px ",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#F64C72", mt: 1 }}
          >
            Welcome Back 👋
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "white", mt: 2, fontSize: "1rem" }}
          >
            Today is a new day. It's your day. <br /> You shape it. Sign in to
            start your journey.{" "}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{ mt: 5 }}
          >
            <TextField
              className={classes.CustomTextField}
              margin="normal"
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              className={classes.CustomTextField}
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box textAlign="center">
              <LoadingButton
                className={classes.CustomButton}
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "30%" }}
              >
                Sign In
              </LoadingButton>
            </Box>
            <Grid container>
              <Grid item>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Don't have an account?{" "}
                  <span style={{ color: "#F64C72" }}>Sign Up</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={5} sx={{ marginLeft: "-40px" }}>
        <Box
          sx={{
            backgroundImage: `url(${LoginBgImage})`,
            backgroundSize: "cover",
            opacity: "0.8",
            height: "100%",
          }}
        ></Box>
      </Grid>
    </Grid>
  );
}
