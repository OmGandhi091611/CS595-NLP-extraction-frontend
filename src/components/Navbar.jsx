import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Box, Typography } from '@mui/material';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Don't show user info on login or signup page
  const showUser = user && location.pathname !== '/' && location.pathname !== '/signup';

  // Handle logo click: only redirect to /dashboard if on / or /signup
  const handleLogoClick = (e) => {
    if (location.pathname === '/' || location.pathname === '/signup') {
      e.preventDefault(); // Prevent redirect if on / or /signup
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Box component="nav" sx={{
      width: '100%',
      background: '#222',
      color: '#fff',
      py: '12px',
      mb: 4.5,
      boxShadow: '0 2px 8px #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <Box sx={{
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
      }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLogoClick}>
          <Typography sx={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, cursor: 'pointer' }}>
            NLP Extraction
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {/* Add navigation links back if needed */}
          {showUser && (
            <Box sx={{ color: '#e0e0e0', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ background: '#444', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                {user.name[0].toUpperCase()}
              </Box>
              <Typography component="span" sx={{ color: '#e0e0e0', fontWeight: 500, fontSize: 15 }}>{user.name}</Typography>
              {/* <Typography component="span" sx={{ color: '#bbb', fontSize: 13 }}>({user.email})</Typography> */}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
