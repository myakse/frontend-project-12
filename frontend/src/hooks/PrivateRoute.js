import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContent }  from './useAuthContent.js';
import routes from '../routes.js';

const PrivateRoute = ( { children } ) => {
    const auth = useAuthContent();    
    if (!!auth) {
      return children;
    }
    return <Navigate to={routes.loginPagePath()} />     
  };

export default PrivateRoute;
