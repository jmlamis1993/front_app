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


const initialValues = {       
  name: '',
  createdAt: '',
  id_user : '',
  description: '',
  avatar: '',
  phone:'',
  website:'',
  email:'',
  tags: '',
  contact : {
    id : 1,
    username : 'Jose Manuel Lamis'
  },      
} 

export const BranchForm = () => {

  //const {description} = useSelector(state => state.branch.activeEvent);  
  const {activeEvent} = useSelector(state => state.branch);
  const [avatar, setAvatar]= useState('');
  const dispatch = useDispatch();    
  const[values,setFieldValue]=useState(initialValues);   
  const[descript,setDescription]=useState((activeEvent) ? activeEvent.description : '');   


  

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
  const handleAvatar = (e) => {
        setAvatar(e);
  }
  const handleDescription = (e) => {
    setDescription(e);
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
        'avatar' : avatar,        
      }
        ))      
      }
      else{
        dispatch(branchAddNew( 
          {  
            'id': uuid(),      
        ...values,         
        'avatar' : avatar,  
        'description' : descript,      
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
           {(activeEvent) ? 'Update branch' : 'New Branch'}
          </Typography>
         
        </Box>       
          
        <Grid container spacing={2}>
        <Grid item xs={12} >
        <InputField
            size="small"
             margin="normal"
             type="text"
              name="name"
              label="Branch Name"
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
         <label> Avatar </label>
          <br/>      
           {/*<InputField            
            variant="outlined"
            required
            name='avatar'
            onChange={(e)=> handleAvatar(e)
            }           
            id='avatar'
            type="file"  
            inputProps={{accept:".doc,.docx,.pdf"}}                
           />*/}
           <Grid item xs={12} >
          <InputField
            size="small"
             margin="normal"
             type="text"
              name="tags"
              label="tags"
              variant="outlined"
              value={values.tags}
              fullWidth                

          />
        </Grid> 
        <Grid container spacing={2}>
        <Grid item xs={4} >
        <InputField
         fullWidth   
        size="small"
        margin="normal"
        id="input-with-icon-textfield"
        label="Phone"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={values.phone}
        name="phone"
      />
      </Grid> 
      <Grid item xs={8} >
        <InputField
         fullWidth   
        size="small"
        margin="normal"
        id="input-with-icon-textfield"
        label="Website"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WebAssetIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={values.website}
        name="website"
      />
      </Grid> 
        </Grid> 
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
        value={values.email}
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
                  >    {(activeEvent) ? 'Editar' : 'Adicionar'}   
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
                  >    {(activeEvent) ? 'Eliminar' : 'Cancelar'}   
        </Button>
        </Grid>
        </Grid>
       
      </form>
    )}
</Formik>
    </>
  )
}
