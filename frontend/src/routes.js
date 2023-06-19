const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  getDataPath: () => [apiPath, 'data'].join('/'),
  createNewUserPath: () => [apiPath, 'signup'].join('/'),

  loginPagePath: () => '/login',
  homePagePath: () => '/',
  signUpPagePath: () => '/signup',
};

export default routes;
