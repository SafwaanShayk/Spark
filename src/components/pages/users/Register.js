import { LoadingButton } from "@mui/lab";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import CustomSnackbar from "../../../utils/CustomSnackbar"; // Import your CustomSnackbar component
import { UserAuth } from "../../../services/api";
import { useState } from "react";
import { useAuth } from "../../../services/AuthContext";

export default function Register() {
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
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
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
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}
