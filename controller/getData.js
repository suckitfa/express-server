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
// 获取首页轮播图
exports.getIndexPic = (req, res, next) => {
    let key = req.headers.fapp + ":indexPic";
    // 获取数据
    redis.get(key).then(data => {
        console.log(data);
        res.json(util.getReturnData(0,'',data));
    })
}
// 获取热点文章
exports.getHotArticle = (req, res, next) => {
    let key = req.headers.fapp + ":a_view";
    // 获取集合，支取0,1,2,3,4五条数据
    redis.zrevrange(key,0,4).then(async data => {
        console.log(data);
        let result = data.map(item => {
            // 获取每篇文章的题目，和ID, 发表日期
            return redis.get(item.member).then(data1 => {
                console.log(data1);
                if (data1 && data1.show != 0) {
                    return {
                        title: data1.title,
                        date:util.getReturnData(data1.time),
                        id:data1.a_id,
                        view:item.score
                    }
                } else {
                    return {title:"文章暂时未上线",date:'',id:0};
                }
            })
        })
        let t_data = await Promise.all(result);
        res.json(util.getReturnData(0,'',t_data));
    })
}