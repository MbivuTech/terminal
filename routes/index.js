var express = require('express');
var router = express.Router();
const { exec } = require('child_process');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Terminal App' });
});

/* POST to execute command. */
router.post('/execute', function (req, res, next) {
  const command = req.body.command;

  if (!command) {
    return res.status(400).json({ error: 'No command provided!' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      output: stdout || stderr || 'No output',
    });
  });
});

module.exports = router;
