import React from 'react'
import {Box,Fab} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { eventStartDelete } from '../actions/event';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { eventClearActiveEvent } from '../actions/event';
import { uiOpenModal } from '../actions/ui';


export const DeleteEventFab = () => {
const dispatch = useDispatch();
const handleClickDelete = () => {
  
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {             
          if (result.isConfirmed) {
            dispatch(eventStartDelete());
            dispatch(eventClearActiveEvent());  
              Swal.fire(
                'Deleted!',
                'Your Event has been deleted.',
                'success'
              )
            }
          })         
     }
    const handleClickCancel = () =>{
      dispatch(eventClearActiveEvent()); 

    }
    const handleClickEdit = () =>{
      dispatch(uiOpenModal()); 

    }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} className='fabdelete'>
      <Fab color="primary"  aria-label="edit" onClick={handleClickEdit}>
        <EditIcon />
      </Fab>
      <Fab color="error"  aria-label="delete" onClick={handleClickDelete}>
        <DeleteIcon />
      </Fab>      
      <Fab color="inherit"  aria-label="cancel" onClick={handleClickCancel}>
        <ClearIcon />
      </Fab>
      </Box>
  )
}
