import {React, useState,useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectField from '../../components/FormFields/SelectField';
import {
  Box,  
  TextField,
  Typography,
  Button
} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { priority,type, status } from '../../helpers/constants';
import moment from 'moment'
import { eventStartAddNew, eventClearActiveEvent, eventDeleted, eventStartUpdate } from '../../actions/event';
import { useDispatch, useSelector} from 'react-redux'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { uiCloseModal } from '../../actions/ui';


// DataSet
const project=[
    {
      value: 'OJS',
      label: 'OJS'
    },
    {
      value: 'Microsoft',
      label: 'Microsoft'
    },
    {
      value: 'Drupal',
      label: 'Drupal'
    }, 
  ];

  
export const CalendarForm = ({values}) => {
  
    const[time_spent,setTime_spent]=useState(values.time_spent);
    const[est_time,setEst_time]=useState(values.est_time);
    const now = moment().minutes(0).seconds(0).add(1,'hours');
    const[start,setSartDate]=useState(values.start);
    const[end,setEndDate]=useState(values.end);
    const[descrip,setDescrip]=useState(values.description);
    const {activeEvent} = useSelector(state => state.calendar);
    const dispatch = useDispatch(); 


    const handleStartDateChange = (e) =>{
      setSartDate(e);
    }
    const handleEndDateChange = (e) =>{
      setEndDate(e);
    }
    const handleTimeSpentChange = (e) =>{
      setTime_spent(e.target.value);
    }

    const handleTimeEstChange = (e) =>{
      setEst_time(e.target.value);
    } 
    const handleDescrip = (value) =>{
      setDescrip(value);
    }
    const handleCancelClick = () =>{        
          dispatch(uiCloseModal());
          dispatch(eventClearActiveEvent());      
        
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
        //actions.preventDefault();
          dispatch(eventStartUpdate( 
            {         
          ...values,         
          'time_spent' : est_time,
          'est_time' : est_time,
          'description' : descrip,
          'start' : start,         
          'end': end,        
        }
          ))      
      }
      else{
        dispatch(eventStartAddNew(
        {      
          ...values,         
          'time_spent' : est_time,
          'est_time' : est_time,
          'description' : descrip,
          'start' : start,
          'end': end,        
        }
      )); 
      }       
      dispatch(uiCloseModal());       
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
           Task
          </Typography>
         
        </Box>
        <Grid item xs={5} sm={7}> 
        <TextField
          size="small"
          error={Boolean(touched.task_name && errors.task_name)}
          fullWidth
          helperText={touched.task_name && errors.task_name}
          label="Title"
          margin="normal"
          name="task_name"
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          value={values.task_name}
          variant="outlined"                  
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SelectField size="small" required name='project' label='Project' data={project} fullWidth  variant="outlined" />
        </Grid>     
        <Grid container spacing={2}>
        <Grid item xs={4} >
        <TextField
            size="small"
             margin="normal"
             type="number"
              name="est_time"
              label="Est time (hours)"
              variant="outlined"
              value={est_time}
              fullWidth
              onChange={handleTimeEstChange}          

          />
        </Grid>
        <Grid item xs={4} >
        <TextField
            size="small"
             margin="normal"
             type="number"
             fullWidth
              name="time_spent"
              label="Time Spent (hours)"
              variant="outlined"
              value={time_spent}
              onChange={handleTimeSpentChange}            

          />
        </Grid>
        </Grid>              
          <Typography
            color="textPrimary"
            variant="p"
            size="small"
          >
           Description
          </Typography>
          <hr/>   
        <Grid item xs={12} >
        <CKEditor
                    editor={ ClassicEditor }
                    data={values.description}
                    onReady={ editor => {                        
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData(); 
                        handleDescrip(data); 
                                        
                    } }
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
                    } }
                /> 
        </Grid>
        <Grid item xs={12} >
        <TextField
          size="small"
          error={Boolean(touched.tags && errors.tags)}
          fullWidth
          helperText={touched.tags && errors.tags}
          label="Tag"
          margin="normal"
          name="tags"
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          value={values.tags}
          variant="outlined"                  
        />
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={5} >
        <SelectField size="small" required name='priority' margin="normal" label='Priority' data={priority} fullWidth  variant="outlined" />
        </Grid>
        <Grid item xs={5} >
        <SelectField  size="small" required name='type'  margin="normal" label='Type' data={type} fullWidth  variant="outlined" />
        </Grid>        
        </Grid> 
        <Grid container spacing={2}>
        <Grid item xs={5} >
        <SelectField size="small" required name='status'  margin="normal" label='Status' data={status} fullWidth  variant="outlined" />
        </Grid>
        </Grid>
        <Typography
            color="textPrimary"
            variant="p"
          >
           Date
          </Typography>
          <hr/> 
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          
        <Grid container spacing={2}>
        <Grid item xs={5} >
        <DatePicker
         label="Start Date"
         value= {start}
         onChange={handleStartDateChange}         
        renderInput={ (params) => <TextField size="small" margin="normal" required id='start' name='date' fullWidth  variant="outlined" InputLabelProps={{ shrink: true }}{...params}/>}/>
      </Grid>
        <Grid item xs={5} >
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
          {...params} />}
      />
      </Grid>
      </Grid>
      </LocalizationProvider>
       <br/>
       <Grid container spacing={2}>
       <Grid item xs={6}>
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
                    color= { 'inherit'} 
                    fullWidth                  
                     onClick={handleCancelClick}                   
                  >    {'Cancelar'}   
        </Button>
        </Grid>
        </Grid>
       
      </form>
    )}
</Formik>
    </>
   
  )
}
