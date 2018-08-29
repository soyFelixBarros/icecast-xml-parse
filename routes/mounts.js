var express = require('express');
var router = express.Router();
var Icecast = require('../app/icecast');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('mounts');
});

// POST method route
router.post('/', function (req, res) {
  var icecast = new Icecast;
  var key = icecast.add(req.body);
  res.status(201).json({ key: key });
});

/* GET mount */
router.get('/:id', function(req, res, next) {
  var icecast = new Icecast;
  var mount = icecast.find(req.params.id);
  res.status(200).json(mount);
});


module.exports = router;
