import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

const Header = () => {
  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h5">
                Komplete Compare
      </Typography>
    </Toolbar>
  </AppBar>;
};

export default Header;
