import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../actions/auth';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

export const Logout = () => {
    const dispatch = useDispatch();
    const handleClick =() =>{
        dispatch(startLogout())
    }
  return (
    <div>
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    </div>
  )
}
