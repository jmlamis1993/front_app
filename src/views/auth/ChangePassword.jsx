import React from 'react';
import { Formik } from 'formik';
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
import { StartChangePassword } from '../../actions/auth';
import { useDispatch, useSelector } from "react-redux";




export const ChangePassword = () => {

    const dispatch = useDispatch();
    return (
        <Grid container xs={12} sx={{ marginTop: '7%' }}>
            <Card>
                <CardContent>
                    <Formik

                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: '',


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
                    onSubmit={({oldPassword,newPassword},actions) => {
                       //setSubmitted(true);
                       dispatch(StartChangePassword(oldPassword,newPassword));            
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
                                        Cambiar Contraseña
                                    </Typography>

                                </Box>
                                <Grid item >
                                    <TextField
                                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                                        fullWidth
                                        helperText={touched.oldPassword && errors.oldPassword}
                                        label="Contraseña Actual"
                                        size="small"
                                        margin="normal"
                                        name="oldPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.oldPassword}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        error={Boolean(touched.newPassword && errors.newPassword)}
                                        fullWidth
                                        helperText={touched.newPassword && errors.newPassword}
                                        label="Nueva Contraseña"
                                        size="small"
                                        margin="normal"
                                        name="newPassword"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.newPassword}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        fullWidth
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        label="Confirmar Contraseña"
                                        size="small"
                                        margin="normal"
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.confirmPassword}
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
                                            Aceptar
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
