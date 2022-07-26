import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Menu, MenuItem, IconButton, Typography, Toolbar, AppBar, Drawer } from "@material-ui/core";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { Work, Home, ShoppingCart } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

import TaskIcon from '@mui/icons-material/Task';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import StorefrontIcon from '@mui/icons-material/Storefront';

const styles = () => ({
  root: {
    // textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    color: "#000133",
  },
  appBar: {
    background: "#00022E",
    color: "#FC86AA",
  },
  icon: {
    padding: "10px",
  },
  title: {
    margin: "auto",
  },
  container: {
    display: "flex",
    flex: 1,
  },
  drawer: {
    background: "#D8DCD6",
    position: "static",
    transition: "width .2s",
  },
  closed: {
    width: "60px",
    overflow: "hidden"
  },
  opened: {
    width: "240px",
  },
  noPad: {
    padding: 0
  },
  listText: {
    // width: '200px',
    overflow: 'hidden',
    background: "#fff"
  },
  main: {
    flex: 1,
    background: "#f7f5f5",
    color: "black",
  },
  footer: {
    background: "#00022E",
    height: "50px",
    color: "#FC86AA",
  },
});

const useStyles = makeStyles(styles);

export default function Layout({ children }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpened, setIsOpened] = useState(true);
  const [auth, setAuth] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile", { replace: true })
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          {/* <IconButton color="inherit" onClick={() => setIsOpened(!isOpened)}
          >
            {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Project Management
          </Typography>
          {auth && (
            <div>
              <IconButton aria-label="account of current user" aria-controls="menu-appbar"
                aria-haspopup="true" onClick={handleMenu} color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className={classes.container}>
        <Drawer variant="permanent"
          classes={{
            paper: clsx(classes.drawer, {
              [classes.closed]: !isOpened,
              [classes.opened]: isOpened,
            }),
          }}
        >
          <List >
            <CustomListItem to="/" text="Home" icon={<Home/>} />
            <CustomListItem to="/employees" text="Employees" icon={<WorkspacesIcon/>} />
            <CustomListItem to="/projects" text="Projects" icon={<Work/>} />
            <CustomListItem to="/" text="Tasks" icon={<TaskIcon/>} />
            <CustomListItem to="/" text="Timesheet" icon={<ViewTimelineIcon/>} />
            <CustomListItem to="/" text="Purchases" icon={<ShoppingCart/>} />
            <CustomListItem to="/" text="Vendors" icon={<StorefrontIcon/>} />
          </List>
        </Drawer>
        <main className={classes.main}>
          {children}
        </main>
      </div>
    </div>
  );
};

function CustomListItem({ icon, text, to, className }) {
  const navigate = useNavigate();
  return (
    <ListItem onClick={() => { navigate(to) }} className={className || ''}>
      <ListItemButton >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}