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

export const UserPerfilForm = () => {
  return (
    <Grid container xs={12} sx={{ marginTop: '7%' }}>
            <Card>
                <CardContent>
                    <Formik

                        initialValues={{
                            first_name: '',
                            email: '',
                            address: '',
                            last_name: '',
                            name: '',
                            phone_number:  '',


                        }}
                        validationSchema={
                            Yup.object().shape({
                                oldPassword: Yup.string().max(255).required('La contraseña actual es requerida'),
                                newPassword: Yup.string().max(255).required('La nueva contraseña  es requerida')
                /*.matches(
                  "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
                  "Debe contener 8 caracteres, un número y un carácter en mayúsculas y minúsculas"
                )*/,
                                confirmPassword: Yup.string().max(255).required('Debe confirmar la contraseña').oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
                            })
                        }
                    /* onSubmit={(values,actions) => {
                       setSubmitted(true);
                       dispatch(userActions.changePassword(values.oldPassword,values.newPassword));            
                       
                       
                     }}*/
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
                                    <TextField
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
                                    <TextField
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
                                    <TextField
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
        </Grid>
  )
}
