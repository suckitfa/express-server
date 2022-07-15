// 判断用户的状态
const {ALLOW_APP} = require('../config/app')
const util = require('./common')
exports.checkAPP = (req, res, next) => {
    console.log(req.headers)
    if (!ALLOW_APP.includes(req.headers.fapp)) {
        res.json(util.getReturnData(500,"来源不正确"))
    } else {
        // 验证通过执行下一个中间件
        next();
    }
}