import logo from "../assests/logo.png";
import { Link } from 'react-router-dom';
import "../styles/navbar.css";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';

function Navbar() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Logged out');
        setAnchorEl(null);
      })
      .catch((error) => console.error('Logout error:', error));
  };
  return (
  //  <AppBar position="static">
  // <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}> 
   <div className="nav">
     <div className="navImg">
        <img src={logo} alt="Icon" className="logo"/>
     </div>
     <div className="navLink">
        <h2><Link to="/" className="heading">Home</Link></h2>
        <h2><Link to="/myList" className="heading">My List</Link></h2>
      </div>    
     {user ? (
          <Box>
            <Avatar
              sx={{ bgcolor: '#636262ff', cursor: 'pointer', marginTop:"20px" }}
              className="button"
              onClick={handleMenuOpen}
            >
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{user.displayName || user.email}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/login"
          >
            <h2 className="button">Login</h2>
          </Button>
        )}
    
     
   </div>
   // </Toolbar> 
  //  </AppBar> */} 
  );
}

export default Navbar;