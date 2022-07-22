import React from 'react'
import {Box,Fab} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { eventDeleted } from '../actions/event';
import { useDispatch } from 'react-redux';




export const DeleteEventFab = () => {
const dispatch = useDispatch();
const handleClickDelete = () => {
        dispatch(eventDeleted());  
     }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} className='fabdelete'>
      <Fab color="error"  aria-label="delete" onClick={handleClickDelete}>
        <DeleteIcon />
      </Fab>
      </Box>
  )
}
