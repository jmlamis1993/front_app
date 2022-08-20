import {React, useEffect, useState} from 'react'
import Modal from '@mui/material/Modal';
import {
  Box,
  Button, 
 
} from '@mui/material';
import { useSelector } from 'react-redux'
import { CalendarForm } from './CalendarForm';
import { uiCloseModal } from '../../actions/ui';
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { eventClearActiveEvent } from '../../actions/event';


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

export const CalendarModal = () => {
    const now = moment().minutes(0).seconds(0).add(1,'hours');

    const {modalOpen} = useSelector(state => state.ui);
    const dispatch = useDispatch();   
    const initEvent = {
      task_name: '',
      project: '',          
      tags: '',  
      priority: '',  
      type: '',      
      status: '',
      start: now.toDate(),
      end : now.toDate(),
      time_spent : 0,
      est_time : 0,          
      description: '',
      'user' : {
             _id : '',
            name: '',
         }
    }
    const {activeEvent} = useSelector(state => state.calendar);
    const[values,setFieldValue]=useState(initEvent);

    const handleClose = () =>
    {
      dispatch(uiCloseModal());
      dispatch(eventClearActiveEvent());
      setFieldValue(initEvent);
    } 

    useEffect(() => {     
      if(activeEvent)
      {       
        setFieldValue(activeEvent);
      }
      else{
        setFieldValue(initEvent);
      }
     },[activeEvent,setFieldValue])

   
 
  return (
    <>
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"      
    >
      <Box sx={style}>     
       <CalendarForm values = {values}/>
      </Box>
    </Modal>
    </>
   
  )
}
