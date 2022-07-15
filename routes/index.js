var express = require('express');
var router = express.Router();
var util = require('../utils/common')
var {getNavMenu} = require('../controller/getData')
// 获取footer显示
router.get('/getFooter', function(req, res, next) {
  res.json(util.getReturnData(0,'success'))
  // res.render('index', { title: 'Express' });
});
// 获取菜单
router.get('/getNavMenu', getNavMenu);
module.exports = router;
