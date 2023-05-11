import React,{useState} from 'react'
import "./component.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import {Link} from "react-router-dom"
const Navbar = () => {
  const pages = ['Art','Science','Technology','Cinema','Design','Food'];



  const [anchorElNav, setAnchorElNav] = useState(null);
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 

  return (
    <div>
          <AppBar position="fixed" style={{backgroundColor:'black',}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           Hublog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/?cat=${page}`}><Typography textAlign="center">{page}</Typography></Link> 
                </MenuItem>
              ))}
              <Link to="/write" style={{textDecoration:'none',display:'block',padding:'1rem', fontWeight:'bolder'}} >Write</Link>
            <Link to="/login" style={{textDecoration:'none',color:'blueviolet',display:'block',padding:'1rem'}} >Login</Link>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hublog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            {pages.map((page) => (
             <Link to={`/?cat=${page}`} style={{textDecoration:'none'}}><Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: 'white', display: 'block' }}
                style={{width:'7rem'}}
              >
                {page}
              </Button></Link> 
            ))}
            <Link to="/write" style={{textDecoration:'none',color:'white',display:'block',padding:'1rem', fontWeight:'bolder'}} >Write</Link>
            <Link to="/login" style={{textDecoration:'none',color:'blueviolet',display:'block',padding:'1rem'}} >Login</Link>
            
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default Navbar
