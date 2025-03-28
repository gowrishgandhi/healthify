import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Admin from './components/dashboard/Admin.js';
import Home from './components/dashboard/Home.js';
import DHome from './components/dashboard/DHome.js';

import CPass from '../src/components/auth/CPass';

import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';


import Register2 from './components/auth/Register2.js';


const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />        
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register2 />} />
          
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
           <Route
            path="cpass"
            element={<PrivateRoute component={CPass} />}
          />
          

          <Route
            path="admin"
            element={<PrivateRoute component={Admin} />}
          />

          <Route
            path="home"
            element={<PrivateRoute component={Home} />}
          />

          <Route
            path="dhome"
            element={<PrivateRoute component={DHome} />}
          />

         
          {/* <Route
            path="upload"
            element={<PrivateRoute component={FileUpload} />}
          /> */}

         
         
          
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Alert />
      </Router>
    </Provider>
  );
};

export default App;
