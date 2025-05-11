import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export default function Profile() {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    display_name: '',
    bio: ''
  });

  const { data } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => api.get(`/users/${user?.id}/`).then(res => res.data),
    enabled: !!user
  });

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username,
        email: data.email,
        display_name: data.display_name,
        bio: data.bio
      });
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData) => 
      api.patch(`/users/${user?.id}/`, data).then(res => res.data),
    onSuccess: (updatedUser) => {
      setUser({ ...user, ...updatedUser });
    }
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>Profile Settings</Typography>
      
      <Box component="form" onSubmit={(e) => {
        e.preventDefault();
        updateMutation.mutate(formData);
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
          label="Display Name"
          margin="normal"
          value={formData.display_name}
          onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Bio"
          multiline
          rows={4}
          margin="normal"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        
        {updateMutation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error updating profile: {updateMutation.error.message}
          </Alert>
        )}
        
        {updateMutation.isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Profile updated successfully!
          </Alert>
        )}
        
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
}
