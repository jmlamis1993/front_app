import React from 'react';
import { Formik } from 'formik';
//import { useStore } from 'react-redux'
import {
    Box,
    Button,
    Grid,
    CircularProgress,
    Link,
    TextField,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from "react-redux";
import CallIcon from '@mui/icons-material/Call';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import InputField from '../../components/FormFields/InputField';
import { StartUpdateProfile } from '../../actions/auth';

const initialValues = {
    first_name: '',
    email: '',
    address: '',
    last_name: '',
    name: '',
    phone_number:  '',
    avatar: '',
}

export const UserPerfilForm = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

  return (
    
            <Card fullWidth justify="center" sx={{marginLeft: '10%',marginRight: '10%' }}>
                <CardContent>
                    <Formik

                        initialValues={user}
                        validationSchema={
                            Yup.object().shape({
                              
                            })
                        }
                    onSubmit={(values,actions) => {
                       dispatch(StartUpdateProfile( {avatar: null,...values}));            
                       
                       
                     }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mb={1}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h5"
                                    >
                                        Personal Data
                                    </Typography>

                                </Box>
                                <Grid item >
                                    <InputField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Name"
                                        size="small"
                                        margin="normal"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <InputField
                                        error={Boolean(touched.first_name && errors.first_name)}
                                        fullWidth
                                        helperText={touched.first_name && errors.first_name}
                                        label="First Name"
                                        size="small"
                                        margin="normal"
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.first_name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <InputField
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        fullWidth
                                        helperText={touched.last_name && errors.last_name}
                                        label="Last Name"
                                        size="small"
                                        margin="normal"
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.first_name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <InputField
                                        error={Boolean(touched.phone_number && errors.phone_number)}
                                        fullWidth
                                        helperText={touched.phone_number && errors.phone_number}
                                        label="Phone Numer"
                                        InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                  <CallIcon />
                                              </InputAdornment>
                                            ),
                                          }}
                                        size="small"
                                        margin="normal"
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="phone"
                                        value={values.phone_number}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <InputField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Email"
                                        InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <AlternateEmailIcon />
                                               
                                              </InputAdornment>
                                            ),
                                          }}
                                        size="small"
                                        margin="normal"
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="email"
                                        value={values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <InputField
                                        error={Boolean(touched.address && errors.address)}
                                        fullWidth
                                        helperText={touched.address && errors.address}
                                        label="Address"
                                        InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <MarkAsUnreadIcon />
                                              </InputAdornment>
                                            ),
                                          }}
                                        size="small"
                                        margin="normal"
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.address}
                                        variant="outlined"
                                    />
                                </Grid>
                                
                    
                                <Grid item>
                                    <Box my={2} >
                                        <Button
                                            color="primary"
                                            size="small"
                                            margin="normal"
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Grid>
                            </form>
                        )}
                    </Formik>

                </CardContent>
            </Card>
      
  )
}
