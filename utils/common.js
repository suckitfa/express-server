let util = {}
util.getReturnData = (code, message = '', data = []) => {
    // 保证数据格式正确
    if (!data) {
        data = []
    } 
    return {code,message,data};
}
module.exports = util;