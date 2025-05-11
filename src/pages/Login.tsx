import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (creds) => api.post('/token/', creds),
    onSuccess: (tokenData) => {
      localStorage.setItem('access', tokenData.data.access);
      api.get('/users/me/').then(res => {
        setUser(res.data);
        navigate('/dashboard');
      });
    }
  });
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(credentials);
      }}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
        <Box sx={{ mt: 2 }}>
          <Button component={Link} to="/register">Create new account</Button>
        </Box>
      </Box>
    </Box>
  );
}
