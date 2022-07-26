import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink as RouterLink } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton  component={RouterLink}  to='/app/home'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton  component={RouterLink}  to='/app/calendar'>
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItemButton>
    <ListItemButton component={RouterLink}  to='/app/project'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Project" />
    </ListItemButton >
    <ListItemButton>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Files" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AlternateEmailIcon />
      </ListItemIcon>
      <ListItemText primary="Email" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
    </ListSubheader>
    <ListItemButton>
       <ListItemIcon>        
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="User Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

  </React.Fragment>
);