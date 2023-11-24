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

// 埋点
export function syncTrackLog(method, data = {}) {
    return taroRequest(`/track/log/syncTrackLog`, method, data, 'JXTCOMMON_API')
}

// 获取明星教练列表
export function getCoachList(method, data = {}) {
    return taroRequest(`/api/schWeb/coach/list`, method, data)
}

// 明星教练详情
export function getCoachDetail(method, data = {}) {
    return taroRequest(`/api/schWeb/coach/coachDetail`, method, data)
}

// 明星教练详情评论
export function getCoachDetailDpList(method, data = {}) {
    return taroRequest(`/api/schWeb/coach/dpList`, method, data)
}

// 驾校资讯列表
export function getCombination(method, data = {}) {
    return taroRequest(`/api/schWeb/combination/search`, method, data)
}

// 驾校资讯详情
export function getCombinationDetail(method, data = {}) {
    return taroRequest(`/api/schWeb/combination/detail`, method, data)
}

