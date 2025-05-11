// src/components/Login.tsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api";
import { Button, TextField, Box } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const loginMutation = useMutation({
    mutationFn: (creds: { username: string; password: string }) => 
      apiClient.post("/token/", creds).then(res => res.data)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto" }}>
      <TextField
        fullWidth
        label="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        margin="normal"
      />
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2 }}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};

export default Login;
