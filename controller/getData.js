let redis = require('../utils/redisDB')
const util = require('../utils/common')
exports.getNavMenu = (req,res, next) => {
    let key = req.headers.fapp + ":nav_menu"
    // 获取数据
    redis.get(key).then(data => {
        console.log("navMenuData = ",data)
        res.json(util.getReturnData(0,'',data))
    })
}
// 获取footer信息
exports.getFooter = (req, res, next) => {
    let key = req.headers.fapp + ":footer"
    // 获取数据
    redis.get(key).then(data => {
        console.log(data);
        res.json(util.getReturnData(0,"",data));
    })
}
// 获取友情链接
exports.getLinks = (req, res, next) => {
    let key = req.headers.fapp + ":links"
    // 获取数据
    redis.get(key).then(data => {
        console.log(data)
        res.json(util.getReturnData(0, '', data));
    })
}