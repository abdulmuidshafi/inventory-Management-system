import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import pic from '../assets/photo_2022-02-10_07-16-12.jpg';

const Layout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('token'));
  
  // Define anchorEl and open state for the user profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    // Clear token and redirect (implementation depends on your setup)
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
            <Avatar alt="Store Logo" src={pic} />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {user?.role === 'admin' && (
            <div>
              <Button color="inherit" component={Link} to="/products">
                <i className="bi bi-box-seam"></i> Products
              </Button>
              <Button color="inherit" component={Link} to="/user">
                <i className="bi bi-people-fill"></i> Users
              </Button>
            </div>
          )}
          <Button color="inherit" component={Link} to="/sales">
            <i className="bi bi-cart4"></i> Sales
          </Button>
          {user?.role === 'admin' && (
            <div>
              <Button color="inherit" component={Link} to="/purchase">
                <i className="bi bi-cash-stack"></i> Purchases
              </Button>
              <Button color="inherit" component={Link} to="/supplier">
                <i className="bi bi-truck"></i> Suppliers
              </Button>
            </div>
          )}
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
               
                <Button color="inherit" component={Link} to="/profile/edit">Edit Profile</Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <KeyIcon fontSize="small" />
                </ListItemIcon>
                
                <Button color="inherit" component={Link} to="/profile/changepassword">changepassword</Button>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 64 }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;