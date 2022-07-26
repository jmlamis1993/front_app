import {React, useState,useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
  Box,  
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  InputAdornment ,
   
} from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { branchAddNew, branchClearActiveEvent, branchDelete, branchUpdate } from '../../actions/branch';
import { useDispatch, useSelector} from 'react-redux'
import { uiCloseBranchModal } from '../../actions/ui';
import InputField from '../../components/FormFields/InputField';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { v4 as uuid } from 'uuid';
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



const initialValues = {

  name:'',
  description:'',
  startDate: '',
  EndDate: '',
  status: 1606916400000,

} 


export const ProjectForm = () => {

  const {activeEvent} = useSelector(state => state.project);
  const dispatch = useDispatch();    
  const[values,setFieldValue]=useState(initialValues);   
  const[descript,setDescription]=useState((activeEvent) ? activeEvent.description : '');
  const now = moment().minutes(0).seconds(0).add(1,'hours');
  const[start,setSartDate]=useState((activeEvent) ? values.start : now);
  const[end,setEndDate]=useState((activeEvent) ? values.end : now);
  
  useEffect(() => {    
    if(activeEvent)
     {
       setFieldValue(activeEvent);                  
     }  
     else{
       setFieldValue(initialValues);                
     }     
    },[activeEvent,setFieldValue])
    const handleDeleteClick = () =>{
      if(activeEvent){
       /*Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!',
       }).then((result) => {
         dispatch(eventDeleted());
         dispatch(uiCloseModal());
         if (result.isConfirmed) {
           Swal.fire(
             'Deleted!',
             'Your Event has been deleted.',
             'success'
           )
         }
       })*/  
       dispatch(branchDelete());
       dispatch(uiCloseBranchModal());
       dispatch(branchClearActiveEvent()); 
      }
      else{
       dispatch(uiCloseBranchModal());
      }
    }
  
   
    const handleDescription = (e) => {
      setDescription(e);
    }
    const handleStartDateChange = (e) =>{
      setSartDate(e);
    }
    const handleEndDateChange = (e) =>{
      setEndDate(e);
    }
    
  return (
    <>
    <Formik 
   enableReinitialize={true}          
   initialValues={
     values      
   }
   validationSchema={
     Yup.object().shape({
       /*task_name: Yup.string().max(255).required('La contraseña actual es requerida'),     
       project: Yup.string().max(255).required('La nueva contraseña  es requerida'), 
       time_spent: Yup.string().max(255).required('La nueva contraseña  es requerida'),        
       est_time: Yup.string().max(255).required('Debe confirmar la contraseña').oneOf([Yup.ref("newPassword"), null],"Las contraseñas no coinciden"),
       //description: Yup.string().max(255).required('La nueva contraseña  es requerida'), 
       tags: Yup.string().max(255).required('La nueva contraseña  es requerida'),
       priority: Yup.string().max(255).required('La nueva contraseña  es requerida'),
       type: Yup.string().max(255).required('La nueva contraseña  es requerida'),
       status: Yup.string().max(255).required('La nueva contraseña  es requerida'),  
       start_date: Yup.string().max(255).required('La nueva contraseña  es requerida'),  
       end_date: Yup.string().max(255).required('La nueva contraseña  es requerida'),*/              
     })
   }
   onSubmit={(values,actions) => { 
     if(activeEvent){
       dispatch(branchUpdate( 
         {        
       ...values, 
       'description' : descript,    
       'start' : start,         
       'end': end,          
     }
       ))      
     }
     else{
       dispatch(branchAddNew( 
         {  
           'id': uuid(),      
       ...values,       
     'description' : descript, 
     'start' : start,         
      'end': end,     
     }
       ))      
     }       
     dispatch(uiCloseBranchModal());       
   }}
 >
   {({
     errors,
     handleBlur,      
     handleSubmit,
     handleChange,
     touched,
     values,      
   }) => (
     <form onSubmit={handleSubmit}>
       <Box mb={3}>
         <Typography
           color="textPrimary"
           variant="h5"
         >
          {(activeEvent) ? 'Update Project' : 'New Project'}
         </Typography>
        
       </Box>       
         
       <Grid container spacing={2}>
       <Grid item xs={12} >
       <InputField
           size="small"
            margin="normal"
            type="text"
             name="name"
             label="Project Name"
             variant="outlined"
             value={values.name}
             fullWidth                 

         />
       </Grid>  
       <Grid item xs={12} >  
       <TextareaAutosize
       aria-label="minimum height"
       minRows={6}
       placeholder="Description"        
       style={{ width: '100%', fontSize:'16px'}}   
       value = {descript}
       onChange = {(e) => handleDescription(e.target.value)}     
       />       
       <LocalizationProvider dateAdapter={AdapterDateFns}>
       <Grid container spacing={2}>
       <Grid item xs={4} >
       <DatePicker
         label="Start Date"
         value= {start}
         onChange={handleStartDateChange}         
        renderInput={ (params) => <TextField size="small" margin="normal" required id='start' name='date' fullWidth  variant="outlined" InputLabelProps={{ shrink: true }}{...params}/>}/>
       </Grid> 
     <Grid item xs={4} >
     <DatePicker
         label="End Date"
         value= {end}
         onChange={handleEndDateChange}         
         renderInput={(params) => <TextField
          size="small"
          margin="normal"  
          required id='end' 
          name='end'
          fullWidth  
          variant="outlined" 
          InputLabelProps={{ shrink: true }}
          {...params} />}/>    
     </Grid> 
       </Grid> 
       </LocalizationProvider>
       
   </Grid>
   <Grid item xs={12} >
   <Grid container >
   <Grid item xs={8} >
       <InputField
        fullWidth   
       size="small"
       margin="normal"
       id="input-with-icon-textfield"
       label="Email"
       InputProps={{
         startAdornment: (
           <InputAdornment position="start">
             <MarkunreadIcon />
           </InputAdornment>
         ),
       }}
       variant="outlined"
       value={values.status}
       name="email"
     />
   </Grid>   
   </Grid>   
   </Grid>        
   <Grid item xs={3}>
       <Button
                   size="large"
                   margin="normal" 
                   type="submit"
                   variant="contained"                    
                   color="primary" 
                   fullWidth                  
                 >    {(activeEvent) ? 'Edit' : 'Add'}   
       </Button>
       </Grid>
       <Grid item xs={3}>
       <Button
                   size="large"
                   margin="normal"                     
                   variant="contained"                    
                   color= {(activeEvent) ? 'error' : 'inherit'} 
                   fullWidth                  
                    onClick={handleDeleteClick}                   
                 >    {(activeEvent) ? 'Delete' : 'Cancel'}   
       </Button>
       </Grid>
       </Grid>
      
     </form>
   )}
</Formik>
   </>
  )
}
