var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(util.getReturnData(0,'success'))
  // res.render('index', { title: 'Express' });
});

module.exports = router;
