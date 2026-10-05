module.exports.routes = {
  'POST /auth/register': 'AuthController.register',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/logout': 'AuthController.logout',
  'GET /auth/me': 'AuthController.me',
};
