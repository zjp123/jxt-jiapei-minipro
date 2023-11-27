import Taro from '@tarojs/taro'
import URLLIST from './base'
import { get as getGlobalData } from '../global_data'

 //获取小程序appid
 const accountInfo = Taro.getAccountInfoSync();
 console.log('appidappidappid------------',accountInfo?.miniProgram?.appId) // 小程序 appId
const TaroRequest = (
	url,
	method,
	data = {},
  domain = 'BASE_URL',
  ydtId? //首页路由带过来的
) => {
    //   let resUrl = `${URLLIST[domain]}` ? `${URLLIST[domain]}${url}` : `${domain}${url}`
    let resUrl = ''
    if (domain && URLLIST[domain]) {
      console.log('没有传递的域名', domain, process.env.NODE_ENV, '测试', `${URLLIST[domain]}${url}`, ydtId, getGlobalData('schoolId'))
      resUrl = `${URLLIST[domain]}${url}`
    } else {
      console.log('直接传递的域名',process.env.NODE_ENV, `${domain}${url}`)
      resUrl = `${domain}${url}`
    }

    const interceptor = function (chain) {
      const requestParams = chain.requestParams
      return chain.proceed(requestParams).then((res) => {
        let obj = res?.data || res?.result
        let result = obj?.code || obj?.code === 0 || obj?.status === 0 ? obj : res
        // console.log('拦截器',res,obj,result)
        if (result.code === 0 || result.status === 0) {
          return result
        } else {
          let msg = result.message || result.msg
          if (result.code === 4100 || result.status === 4100) {
            Taro.showToast({
              title: msg || '请求有误',
              icon: 'none',
              duration: 2000,
              complete: () => {
                Taro.removeStorageSync('phone')
                Taro.removeStorageSync('tokenId')
                Taro.navigateTo({
                  url: '/pages/my/my'
                })
              }
            })
            return
          }
          console.log("拦截失败",result)
          Taro.showToast({
            title: msg || '请求有误',
            icon: 'none',
            duration: 2000,
          })
          return result
        }
      })
    }
    //添加拦截器效果
    Taro.addInterceptor(interceptor)
    return Taro.request({
      url: `${resUrl}`,
      method,
      // data: {...data, appId: accountInfo?.miniProgram?.appId
      header: {
        ydtCode: ydtId || getGlobalData('schoolId'),
        openCookieId: Taro.getStorageSync('tokenId')
      },
      data: {appId: accountInfo?.miniProgram?.appId, ...data},
      success: function () {},
      fail: function (res: any) {
        console.log('封装请求失败', res)
        Taro.showToast({
          title: res.data.message || '请求有误',
          icon: 'none',
          duration: 2000,
        })
      },
      complete: function () {},
    })
}

export default TaroRequest
