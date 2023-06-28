import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/HomePage';
import Error from './pages/errorPage/ErrorPage';
import Login from './pages/loginPage/LoginPage';
import Registration from './pages/registrationPage/RegistrationPage';
import PrivateRoute from './hooks/PrivateRoute.js';
import routes from './routes.js';

const App = () => (
  <Routes>
    <Route path={routes.homePagePath()} element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path={routes.loginPagePath()} element={<Login />} />
    <Route path={routes.signUpPagePath()} element={<Registration />} />
    <Route path="*" element={<Error />} />    
  </Routes>
);

export default App;
