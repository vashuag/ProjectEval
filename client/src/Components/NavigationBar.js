import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const NavigationBar = () => {
  const mentor = JSON.parse(localStorage.getItem("mentor"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMentorChange = () => {
    localStorage.clear();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {mentor ? (
            <>
              <MenuItem onClick={() => handleClose()}>
                <Link to="/student-select" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Add Student
                </Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <Link to="/student-view" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Student
                </Link>
              </MenuItem>
              <MenuItem onClick={() => handleMentorChange()}>End Session</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => handleClose()}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Select Mentor
              </Link>
            </MenuItem>
          )}
        </Menu>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
