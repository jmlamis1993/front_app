import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginView from '../views/auth/Login';
import MainLayout from '../layout/mainlayout';
import Dashboard from '../layout/dashboardLayout';
import { Home } from '../views/dashboard/Home';
import { CalendarView } from '../views/calendar/CalendarView';
import { BranchView } from '../views/branch/BranchView';

/*import AccountView from 'src/views/account/AccountView';
import ProfileView from 'src/views/account/AccountView/ProfileDetails';
import CustomerListView from 'src/views/customer/CustomerListView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import ForgotPassword from 'src/views/auth/ForgetPassword';
import ChangePassword from 'src/views/auth/ChangePassword';
import Homologation from 'src/views/homologation/StepComponent';
import Statistics from 'src/views/statistics/statistics';*/



const routes =(isLogging) => [
  {
    path: '/app',    
    element: isLogging ? <Dashboard/>: <Navigate to="/login"/>,
    children: [      
      { path: 'home', element: <Home/> },
      { path: 'calendar', element: <CalendarView/> },
      { path: 'branch', element: <BranchView/> },
      /*{ path: 'profile', element: <ProfileView /> },
      { path: 'misTramites', element: <CustomerListView /> },
      { path: '/solicitud-informacion', element: <Statistics /> },
      { path: '/', element: <Homologation /> },    
      { path: '/change-password', element: <ChangePassword /> },    
      { path: '*', element: <Navigate to="/404" /> },  */
    ]
  },
 {
    path: '/',
    element: !isLogging ? <MainLayout /> : <Navigate to="/app/home"/>,
    children: [
      { path: '/login', element: <LoginView /> },
      /*{ path: '/forgot-password', element: <ForgotPassword /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },      
      { path: '/', element: <Navigate to="/login"/> },
      { path: '*', element: <Navigate to="/404"/> }*/
    ]
  }
];

export default routes;
