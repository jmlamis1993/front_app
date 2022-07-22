import React from 'react'
import {Box,Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../actions/ui';


export const AddNewFab = () => {
    const dispatch = useDispatch();
    const handleClickNew = () => {
       dispatch(uiOpenModal());  
    }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} className='fab'>
      <Fab color="primary"  aria-label="add" onClick={handleClickNew}>
        <AddIcon />
      </Fab>
      </Box>
  )
}
