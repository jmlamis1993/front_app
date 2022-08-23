import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Formik } from "formik";
import * as Yup from "yup";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputField from "../../components/FormFields/InputField";
import { useDispatch } from "react-redux";
import { tagsStartAddNew } from '../../actions/tag';

export const TagForm = (props) => {
 
     const { onClose, selectedValue, open } = props;
     const dispatch = useDispatch(); 

  const handleClose = () => {
    onClose(selectedValue);
  };

 
    return (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Add New Tag</DialogTitle>
          <Formik
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
        name: Yup.string().max(50).required('Should be a tag valid'),     
      
        })}
        onSubmit={(values, actions) => {
            dispatch(tagsStartAddNew(values))
            
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
           

            <Grid container spacing={2} sx={{padding:'15px'}}>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  margin="normal"
                  type="text"
                  name="name"
                  label="Tag Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  margin="normal"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  
                  Add
                </Button>
              </Grid>
            
            </Grid>
          </form>
        )}
      </Formik>
        </Dialog>
      );
}
