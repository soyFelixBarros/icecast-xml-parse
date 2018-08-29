var express = require('express');
var router = express.Router();
var Icecast = require('../app/icecast');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('mounts');
});

// POST mounts
router.post('/', function (req, res) {
  var icecast = new Icecast;
  var key = icecast.add(req.body);
  res.status(201).json({ key: key });
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
  var deleted = icecast.delete(req.params.id);
  res.status(204).json({ deleted: deleted });
});


module.exports = router;
