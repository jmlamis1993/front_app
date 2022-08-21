import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Snackbar,
    Alert,
  } from "@mui/material";
import { uiCloseAlert } from '../../actions/ui';

export const AlertComponent = () => {
    const activeAlert = useSelector(state => state.ui.activeAlert);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('llego')    
        if(activeAlert){
        setOpen(true);
      }
     
    }, [activeAlert])
    
    
 
   
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setOpen(false);
        dispatch(uiCloseAlert)
      };
  return (
    <>
      <Snackbar open={open}
         anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        autoHideDuration={2000} onClose={handleClose}>
       <Alert onClose={handleClose} severity={activeAlert.type} variant="filled" sx={{ width: '100%' }}>
          {activeAlert.sms}
        </Alert>
      </Snackbar>
  </>
  )
}
