import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => 
      api.post('/register/', data).then(res => res.data),
    onSuccess: () => {
      navigate('/login');
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(formData);
      }}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Registering...' : 'Register'}
        </Button>
        <Box sx={{ mt: 2 }}>
          <Button component={Link} to="/login">Already have an account? Login</Button>
        </Box>
      </Box>
    </Box>
  );
}
