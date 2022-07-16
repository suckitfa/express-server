let util = {}
util.getReturnData = (code, message = '', data = []) => {
    // 保证数据格式正确
    if (!data) {
        data = []
    } 
    return {code,message,data};
}
// 格式化时间
util.getLocalDate = (t) => {
    let date = new Date(parseFloat(t));
    return date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
module.exports = util;