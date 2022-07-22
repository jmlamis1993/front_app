//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './helpers/routes';

//<img src={logo} className="App-logo" alt="logo" />

function App() {

  const routing = useRoutes(routes(true
    ));
  return (  
  
    <div className="App">
      {routing}
    </div>
     
  );
}

export default App;
