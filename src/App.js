//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './helpers/routes';
import { useSelector } from 'react-redux';
import {AlertComponent} from './components/Alert/AlertComponent'


function App() {
const {loggedIn}= useSelector(state => state.auth);
  const routing = useRoutes(routes(loggedIn));

  return (   
    <div className="App"> 
    <div>
    <AlertComponent/>
    </div>      
    {routing}
    </div>
     
  );
}

export default App;
