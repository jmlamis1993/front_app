//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './helpers/routes';
import { useSelector } from 'react-redux';

//<img src={logo} className="App-logo" alt="logo" />

function App() {
const {loggedIn}= useSelector(state => state.auth);
  const routing = useRoutes(routes(loggedIn));
  return (  
  
    <div className="App">
      {routing}
    </div>
     
  );
}

export default App;
