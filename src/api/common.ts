import taroRequest from '../utils/request'

//获取openId，unionId
export function getOpenIdApi(method, data = {}, domain?) {
    return taroRequest(`/enterprise/wechat/applet/api/jscode2session`, method, data, domain)
}

// 获取班制列表
export function getClassList(method, data = {}) {
    return taroRequest(`/api/schWeb/class/out/list`, method, data)
}

// 班型详情
export function getClassDetail(method, data = {}) {
    return taroRequest(`/api/schWeb/class/out/detail`, method, data)
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

// 首页联系
export function getIndexPageApi(method, data = {}, ydtId?) {
    return taroRequest(`/api/schWeb/firstPage/search`, method, data, undefined, ydtId)
}
// 场地
export function getFieldListApi(method, data = {}) {
  return taroRequest(`/api/schWeb/region/list`, method, data)
}
// 班型介绍
export function getClassTypeApi(method, data = {}) {
  return taroRequest(`/api/schWeb/class/out/list`, method, data)
}

// 明显教练
export function getCocahStarApi(method, data = {}) {
  return taroRequest(`/api/schWeb/coach/list`, method, data)
}

// 资讯
export function getNewsApi(method, data = {}) {
  return taroRequest(`/api/schWeb/news/out/list`, method, data)
}

// 获取手机号
export function getPhoneApi(method, data = {}) {
  return taroRequest(`/api/schWeb/clue/phone`, method, data)
}

// 登录
export function loginApi(method, data = {}) {
  return taroRequest(`/api/schWeb/login`, method, data)
}

// 订单
export function getOrderListApi(method, data = {}) {
  return taroRequest(`/api/schWeb/personal/order/list`, method, data)
}

// 用户登录信息
export function getPersonalInfo(method, data = {}) {
  return taroRequest(`/api/schWeb/personal/info`, method, data)
}

// 场地详情
export function getFieldDetailApi(method, data = {}) {
  return taroRequest(`/api/schWeb/region/detail`, method, data)
}