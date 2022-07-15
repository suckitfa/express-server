var express = require('express');
var router = express.Router();
var util = require('../utils/common')
var {getNavMenu,getFooter} = require('../controller/getData')

// 获取footer显示
router.get('/getFooter', getFooter);

// 获取菜单
router.get('/getNavMenu', getNavMenu);
module.exports = router;
