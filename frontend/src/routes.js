const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),

  loginPagePath: () => '/login',
  homePagePath: () => '/',
  signUpPagePath: () => '/signup',
};

export default routes;
