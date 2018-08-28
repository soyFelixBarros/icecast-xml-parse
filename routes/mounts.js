var express = require('express');
var router = express.Router();

var Icecast = require('../app/icecast');
// var path = '/etc/icecast2/icecast.xml';
var path = './icecast.xml';

/* GET users listing. */
router.get('/', function(req, res, next) {
  var icecast = new Icecast(path);
  res.send('mounts');
});

// POST method route
router.post('/', function (req, res) {
  // add_mount(req.body, icecast);
  res.status(201).json({ status: 'ok' });
});

module.exports = router;
