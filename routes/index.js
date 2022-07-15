var express = require('express');
var router = express.Router();
var util = require('../utils/common')
/* GET home page. */
router.get('/getFooter', function(req, res, next) {
  res.json(util.getReturnData(0,'success'))
  // res.render('index', { title: 'Express' });
});

module.exports = router;
