var express = require('express');
var router = express.Router();
var util = require('../utils/common')
var {getNavMenu,getFooter, getLinks, getIndexPic} = require('../controller/getData')

// 获取footer显示
router.get('/getFooter', getFooter);
// 获取菜单
router.get('/getNavMenu', getNavMenu);
// 获取友情链接
router.get('/getLinks', getLinks);
// 获取首页轮播图
router.get('/getIndexPic',getIndexPic)
//获取热点文章
router.get('/getHotArticle',getHotArticle);
module.exports = router;
