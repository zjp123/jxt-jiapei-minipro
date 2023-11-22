import taroRequest from '../utils/request'

//获取openId，unionId
export function getOpenIdApi(method, data = {}) {
    return taroRequest(`/enterprise/wechat/applet/api/jscode2session`, method, data)
}

// 获取班制列表
export function getClassList(method, data = {}) {
    return taroRequest(`/api/schWeb/class/out/list`, method, data)
}

// 班型详情
export function getClassDetail(method, data = {}) {
    return taroRequest(`/api/schWeb/class/out/detail`, method, data)
}

// 获取首页
export function getIndexPageApi(method, data = {}) {
    return taroRequest(`/api/schWeb/firstPage/search`, method, data)
}
