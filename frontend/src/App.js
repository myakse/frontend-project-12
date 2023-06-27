import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/HomePage';
import Error from './pages/errorPage/ErrorPage';
import Login from './pages/loginPage/LoginPage';
import Registration from './pages/registrationPage/RegistrationPage';
import routes from './routes.js';
import PrivateRoute from './hooks/PrivateRoute.js';

const App = () => (
  <Routes> 
    <Route path={routes.homePagePath()} element = { <PrivateRoute><Home /></PrivateRoute> } />
    <Route path={routes.loginPagePath()} element={ <PrivateRoute><Login /></PrivateRoute> } />
    <Route path={routes.signUpPagePath()} element={ <PrivateRoute><Registration /></PrivateRoute> } />
    <Route path="*" element={<Error />} />
    
  </Routes>
);

export default App;
