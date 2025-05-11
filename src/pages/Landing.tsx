import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to RecoAI
      </Typography>
      <Typography variant="h5" gutterBottom>
        AI-Powered Content Recommendations
      </Typography>
      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/login"
        sx={{ mt: 4 }}
      >
        Get Started
      </Button>
    </Box>
  );
}
