var express = require('express');
var router = express.Router();
var Icecast = require('../app/icecast');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var icecast = new Icecast;
  var mounts = icecast.mounts();
  res.status(200).json({ mounts: JSON.stringify(mounts) });
});

// POST mounts
router.post('/', function (req, res) {
  var icecast = new Icecast;
  var mount = icecast.add(req.body);
  res.status(201).json({ data: mount });
});

// // PUT mounts
// router.put('/', function (req, res) {
//   var icecast = new Icecast;
//   var mount = icecast.update(req.body);
//   res.status(200).json({ data: mount });
// });

/* GET mounts */
router.get('/:id', function(req, res, next) {
  var icecast = new Icecast;
  var mount = icecast.find(req.params.id);
  res.status(200).json(mount);
});

/* DELETE mounts */
router.delete('/:id', function(req, res, next) {
  var icecast = new Icecast;
  icecast.delete(req.params.id);
  res.status(204).json({});
});


module.exports = router;
