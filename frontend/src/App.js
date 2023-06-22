import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/HomePage';
import Error from './pages/errorPage/ErrorPage';
import Login from './pages/loginPage/LoginPage';
import Registration from './pages/registrationPage/RegistrationPage';
import PrivateRoute from './pages/homePage/HomePage';
import routes from './routes.js';

const App = () => (
  <Routes>
    <Route path={routes.homePagePath()} element = {<PrivateRoute><Home /></PrivateRoute>} />
    <Route path={routes.loginPagePath()} element={<PrivateRoute><Login /></PrivateRoute>} />
    <Route path={routes.signUpPagePath()} element={<PrivateRoute><Registration /></PrivateRoute>} />
    <Route path="*" element={<PrivateRoute><Error /></PrivateRoute>} />
  </Routes>
);

export default App;
