import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <div>
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          DANCEFEST
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
