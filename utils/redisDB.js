let redis = require('redis');
// 获取数据库配置
const {redisConfig} = require('../config/db');
// 获取redis链接
const redis_client = redis.createClient(redisConfig);
// 连接成功
redis_client.on('connect', () => {
    console.log("链接成功");
});
// 错误处理
redis_client.on('error', (err) => {
    console.log(err);
});
redis = {};
// 根据模式获取全部键
keys = async (cursor, re, count) => {
    let getTempKeys = await new Promise((resolve) => {
        // 从链接中获取该值
        redis_client.scan([cursor, "MATCH", re, "COUNT", count], (err,res) => {
            console.log('res')
            return resolve(res);
        })
    })
    return getTempKeys()
}
// 设置该值进入数据库
redis.set = (key,value) => {
    // 将所有的对象转为JSON字符串进行保存
    // 注：字符串过大，导致性能下降
    value = JSON.stringify(value);
    return redis_client.set(key, value, (err) => {
        if (err) console.log(err)
    });
};
// 获取text在获取的时候可以then调用
text = async key => {
    let getTempValue = await new Promise((resolve) => {
        // 从连接中获取返回值
        redis_client.get(key,(err, res) => {
            return resolve(res)
        });
    });
      // 将值转为本身的对象并返回
      return JSON.parse(getTempValue);
}
// 返回获取的值
redis.get = async (key) => {
    return await text(key)
}
// 设置过期时间
redis.expire = (key,ttl) => {
    redis_client.expire(key,parseInt(ttl));
}
// 获取自增ID
id = async (key) => {
    console.log('查找' + key)
    let id = await new Promise(resolve => {
        redis_client.incr(key, (err,res) => {
            console.log(res)
            return resolve(res);
        })
    })
}
redis.incr = async key=> {
    return await id(key);
}
// 有序集合
// 新增有序集合
redis.zadd = (key, member, num) => {
    member = JSON.stringify(member);
    redis_client.zadd(key,num,member, (err) =>{
        if (err) console.log(err);
    })
}
//获取一定范围内的元素[min,max]
tempData = async (key, min, max) => {
    let tData = await new Promise(resolve => {
        redis_client.zrevrange([key,min,max,"WITHSCORES"],(err,res) =>{
            return resolve(res);
         }
        )
    }) 
    // 同时获取分值，转换为对象
    let oData = [];
    // 构造
    for(let i = 0; i < tData.length; i = i + 2) {
        oData.push({member:JSON.parse(tData[i]),score:tData[i+1]});
    }
    return oData;
}
redis.zrevrange = async (key, min = 0, max = -1) => {
    return tempData[key, min, max];
}

// 有序集合的自增操作
redis.zincrby =(key, member, NUM = 1) => {
    member = JSON.stringify(member)
    redis_client.zincrby(key, NUM, member, (err) => {
        if (err) console.log(err)
    })
}
// 有序集合通过member获取score
tempZscore = async (key, member) => {
    member = JSON.parse(member)
    return await new Promise(resolve => {
        console.log(res)
        resolve(res)
    })
}
redis.zscore = (key,member) => {
    return tempZscore(key,member);
}

module.exports = redis;