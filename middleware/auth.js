function checkAuth(req, res, next) {
  const { authorization } = req.headers;

  // If no Authorization header exists, prompt the user for authentication
  if (!authorization) {
    return res.setHeader('WWW-Authenticate', 'Basic realm="Terminal App"')
              .status(401)
              .send('Authentication required');
  }

  // Parse the authorization header
  const authValue = authorization.split(' ')[1];
  const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');

  // Check if the credentials match the hard-coded values
  if (username === 'username' && password === 'password') {
    return next(); // Credentials are correct, proceed to the next middleware
  }

  // If credentials are incorrect, send a 401 Unauthorized response
  return res.setHeader('WWW-Authenticate', 'Basic realm="Terminal App"')
            .status(401)
            .send('Authentication failed');
}

module.exports = checkAuth;
