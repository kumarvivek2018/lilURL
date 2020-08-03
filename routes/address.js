var express = require('express');
var router = express.Router();

/* GET urls listing. */
router.route('/')
.get((req, res, next) => {
  res.send('respond with a source');
});

module.exports = router;