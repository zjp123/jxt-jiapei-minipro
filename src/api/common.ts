import taroRequest from '../utils/request'

//获取openId，unionId
export function getOpenId(method, data = {}) {
    return taroRequest(`/enterprise/wechat/applet/api/jscode2session`, method, data)
}

// 获取班制列表
export function getClassList(method, data = {}) {
    return taroRequest(`/api/schWeb/class/out/list`, method, data, 'BA_API')
}
