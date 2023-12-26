import React, { useState } from 'react';
import { TextField, Button, Box, InputLabel, Typography, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';

// for reference
   // const username = 'kminchelle'; // Replace with your username
    // const password = '0lelplR'; // Replace with your password
    
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrors({
        email: username ? '' : 'Please provide a username.',
        password: password ? '' : 'Please provide a password.',
      });
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        sessionStorage.setItem('authToken', token);
        setToken(token);
        history.push('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrors({ email: 'Error during login. Please try again later.', password: '' });
    }
    
  };

  return (
    <Box maxWidth={400} mx="auto" mt={22} p={3} border="1px solid #ccc">
      <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
        Login
      </Typography>
      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', marginBottom: '16px' }} />
      <Box mb={2}>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <Box display="flex" alignItems="center">
              <InputLabel htmlFor="email" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                Email
              </InputLabel>
              {errors.email && (
                <Typography variant="inherit" color="error">
                  * {errors.email}
                </Typography>
              )}
            </Box>
            <TextField
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.email}
              fullWidth
              margin="normal"
            />
          </Box>

          <Box mb={2}>
            <Box display="flex" alignItems="center">
              <InputLabel htmlFor="password" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                Password
              </InputLabel>
              {errors.password && (
                <Typography variant="inherit" color="error">
                  * {errors.password}
                </Typography>
              )}
            </Box>
            <TextField
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              fullWidth
              margin="normal"
              type="password"
            />
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
