import taroRequest from '../utils/request'

//获取openId，unionId
export function getOpenId(method, data = {}) {
    return taroRequest(`/enterprise/wechat/applet/api/jscode2session`, method, data)
}