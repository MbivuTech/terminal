var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (username === 'username' && password === 'password') {
    // Set HttpOnly cookie with a short expiration time (1 minute)
    res.cookie('auth', 'validCookieValue', {
      httpOnly: true,
      maxAge: 60 * 1000, // 1 minute
    });

    // After login, reload the page (this will remove the modal)
    return res.redirect('/');
  } else {
    // If login fails, still show the login modal with an error message
    return res.render('index', { title: 'Terminal App', showLoginModal: true, error: 'Invalid username or password' });
  }
});

module.exports = router;
