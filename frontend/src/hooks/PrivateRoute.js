import React, { useContext, } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/context';
import routes from '../routes.js';

const PrivateRoute = ( { children } ) => {
    const { isLogin } = useContext(MyContext);
    if (!!isLogin) {
      return children;
    }
    return <Navigate to={routes.loginPagePath()} />     
  };

export default PrivateRoute;
