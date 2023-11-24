import taroRequest from '../utils/request'

//获取openId，unionId
export function getOpenIdApi(method, data = {}, domain?) {
    return taroRequest(`/enterprise/wechat/applet/api/jscode2session`, method, data, domain)
}
// 首页联系
export function getIndexPageApi(method, data = {}) {
    return taroRequest(`/api/schWeb/firstPage/search`, method, data)
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
