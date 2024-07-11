import { LoadingButton } from "@mui/lab";
import { Paper, Typography, Box, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomSnackbar from "../../../utils/CustomSnackbar"; // Import your CustomSnackbar component
import { UserAuth } from "../../../services/api";
import { useState } from "react";
import { useAuth } from "../../../services/AuthContext";
import { makeStyles } from "@mui/styles";
import LoginBgImage from "../../../images/LoginImage.jpg"; // Import the image

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

export default function Register() {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const { showSnackbar } = useAuth();

  function handleApiErrors(errors) {
    console.log(errors);
    if (errors) {
      errors.forEach((error) => {
        if (error.code === "PasswordRequiresNonAlphanumeric") {
          setError("password", {
            message:
              "Password must have at least one non-alphanumeric character.",
          });
        } else if (error.code === "PasswordRequiresUpper") {
          setError("password", {
            message: "Password must have at least one uppercase letter.",
          });
        } else if (error.code === "DuplicateUserName") {
          setError("username", { message: "Username is already taken." });
        } else if (error.code === "DuplicateEmail") {
          setError("email", {
            message: "Email address is already registered.",
          });
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Registration failed. Please try again.");
          setOpenSnackbar(true);
        }
      });
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = async (data) => {
    try {
      await UserAuth.register(data);
      showSnackbar("Registration successful - you can now login", "success");
      navigate("/login");
    } catch (error) {
      handleApiErrors(error.response.data);
    }
  };

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
            Start your Journey 🚀
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "white", mt: 2, fontSize: "1rem" }}
          >
            Today is a new day. It's your day. <br /> You shape it. Sign up to
            start your journey.{" "}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              className={classes.CustomTextField}
              margin="normal"
              required
              fullWidth
              autoFocus
              label="Username"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              className={classes.CustomTextField}
              margin="normal"
              required
              fullWidth
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                  message: "Not a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              className={classes.CustomTextField}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /(?=^.{6,14}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,

                  message:
                    "Password must be between 6 to 14 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character.",
                },
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
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
                Register
              </LoadingButton>
            </Box>
            <Grid container>
              <Grid item>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Already have an account?{" "}
                  <span style={{ color: "#F64C72" }}>Sign in</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />

      <Grid item xs={5} sx={{ marginLeft: "-80px" }}>
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
