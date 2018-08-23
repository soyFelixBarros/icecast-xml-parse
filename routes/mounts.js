var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('mounts');
});

// POST method route
router.post('/', function (req, res) {
    console.log(req.body);
    res.status(201).json({ status: 'ok' });
})

module.exports = router;
