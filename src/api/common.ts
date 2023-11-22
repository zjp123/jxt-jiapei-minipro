import taroRequest from '../utils/request'

//获取openId，unionId
export function getOpenIdApi(method, data = {}) {
    return taroRequest(`/enterprise/wechat/applet/api/jscode2session`, method, data)
}
// 获取首页
export function getIndexPageApi(method, data = {}) {
    return taroRequest(`/api/schWeb/firstPage/search`, method, data)
}