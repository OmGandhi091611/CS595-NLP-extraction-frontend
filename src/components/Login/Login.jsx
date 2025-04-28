import { LockOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });

      // Store user info in localStorage
      const userObj = { name: username, email: `${username}@example.com` };
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);

    //   console.log(response.data.msg);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login Failed", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link href="#" variant="body2" underline="hover">
              Forgot password?
            </Link>
          </Box>
          <Box sx={{ mt: 1, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/signup" variant="body2" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
