// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { useAuthStore, useThemeStore } from './store';
import {
  Landing,
  Login,
  Register,
  Dashboard,
  Profile,
  AdminDashboard,
  NotFound
} from './pages';
import { Navbar, RequireAuth, AdminRoute } from './components';

function App() {
  const { darkMode } = useThemeStore();
  const { user } = useAuthStore();
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorDefault: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Error Routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
