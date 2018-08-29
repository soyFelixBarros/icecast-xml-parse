var express = require('express');
var router = express.Router();

var Icecast = require('../app/icecast');
var path = '/etc/icecast2/icecast.xml';
// var path = './icecast.xml';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('mounts');
});

// POST method route
router.post('/', function (req, res) {
  // add_mount(req.body, icecast);
  var icecast = new Icecast(path);
  var key = icecast.add(req.body);
  res.status(201).json({ status: 'ok', key: key });
});

/* GET mount */
router.get('/:id', function(req, res, next) {
  var icecast = new Icecast(path);
  var mount = icecast.find(req.params.id);
  res.status(200).json(mount);
});


module.exports = router;
