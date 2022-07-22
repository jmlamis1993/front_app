import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import{Outlet} from 'react-router-dom';


const theme = createTheme();

const MainLayout = () => {
  //const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline /> 
           
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://app.riverafence.com/uploads/domain/40785/background/IMG_0159_c42d6db396b71b1d75f8fe2f11c9f12a.JPG)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}  className = "login" >
        <Outlet/>
      </Grid>      
    </Grid>
  </ThemeProvider>
  );
};

export default MainLayout;
