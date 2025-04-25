import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Box, Typography, Menu, MenuItem, IconButton } from '@mui/material';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Don't show user info on login or signup page
  const showUser = user && location.pathname !== '/' && location.pathname !== '/signup';

  // Handle logo click: only redirect to /dashboard if not already inside
  const handleLogoClick = (e) => {
    if (location.pathname === '/' || location.pathname === '/signup') {
      e.preventDefault(); // Prevent redirect if on / or /signup
    } else {
      navigate('/dashboard');
    }
  };

  // Avatar (user badge) click handler
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    setUser(null);
    navigate('/');
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
            <>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0, background: 'none', '&:hover': { background: 'none' } }}>
                <Box sx={{ background: '#444', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#fff', marginRight: 1 }}>
                  {user.name[0].toUpperCase()}
                </Box>
                <Typography component="span" sx={{ color: '#e0e0e0', fontWeight: 500, fontSize: 15 }}>{user.name}</Typography>
                {/* <Typography component="span" sx={{ color: '#bbb', fontSize: 13 }}>({user.email})</Typography> */}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { mt: 1, minWidth: 120 } }}
              >
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
