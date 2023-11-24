import Taro from '@tarojs/taro'
import URLLIST from './base'
import { get as getGlobalData } from '../global_data'

 //获取小程序appid
 const accountInfo = Taro.getAccountInfoSync();
 console.log('11111appid------------',accountInfo?.miniProgram?.appId) // 小程序 appId

const TaroRequest = (
	url,
	method,
	data = {},
	domain = 'BASE_URL',
) => {
	//   let resUrl = `${URLLIST[domain]}` ? `${URLLIST[domain]}${url}` : `${domain}${url}`
	let resUrl = ''
	if (domain && URLLIST[domain]) {
		console.log('没有传递的域名', domain, process.env.NODE_ENV, '测试', `${URLLIST[domain]}${url}`)
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
				console.log("拦截失败",result)
				let msg = result.message || result.msg
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
      ydtCode: getGlobalData('schoolId'),
      openCookieId: Taro.getStorageSync('tokenId')
    },
		data: {...data, appId: accountInfo?.miniProgram?.appId},
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
