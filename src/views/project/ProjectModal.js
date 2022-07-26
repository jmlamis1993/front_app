import {React, useState, useEffect} from 'react'
import Modal from '@mui/material/Modal';
import {
    Box,
   
  } from '@mui/material';
  import { useSelector } from 'react-redux'
  import { ProjectForm } from './ProjectForm';
  import { uiCloseProjectModal } from '../../actions/ui';
  import { useDispatch } from 'react-redux'
  import { projectClearActiveEvent } from '../../actions/project';
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',    
    bgcolor: 'background.paper',
    width: 800,
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    height:'90%',
    overflow:'scroll',
  }; 

export const ProjectModal = () => {
 
    const {modalProjectOpen} = useSelector(state => state.ui);
    const dispatch = useDispatch();
     
    const handleClose = () =>
    {
    dispatch(uiCloseProjectModal());
    dispatch(projectClearActiveEvent());
    //setFieldValue(initialValues);
   }

  return (
    <>
    <Modal
      open={modalProjectOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"      
    >
      <Box sx={style}>     
       <ProjectForm />
      </Box>
    </Modal>
    </>
   
  )
}
