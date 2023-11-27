import { syncTrackLog } from '@/api/common'
import { get } from '@/global_data'


export function getUrlData(val) {
	//val为导航栏链接 x为要获取的参数的字段名称
	let arr = val.split("?")[1] || []; //?后边的数据
	let data = arr.length > 0 ? arr.split("&") : []; //['a=100','b=200','c=300']的形式
	let result: any = {}; //{a:100,b:200,c:300}
	if (data.length > 0) {
		data.forEach((item) => {
			const a = item.split("=");
			result[a[0]] = a[1];
		});
	}

	return result;
}

export function cellPhoneValid(value: any) {
	return /^0?(12[0-9]|13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/.test(value)
}

export const addSyncTrackLog = (btn, href, info) => {
	const ydtCode = get('schoolId')
	syncTrackLog('POST', {
		appId: "6",
		trackId: "jxtjp_gw_wechat_click",
		clientInfo: info,
		tenantId: ydtCode,
		attrMap: {
			attr2: href,
			attr1: btn
		}
	})
}

export const url = `http://jxtguns.58v5.cn/h5/#`
// process.env.NODE_ENV === 'production'
// 	? `https://jxtm.jxedt.com/h5/#`
// 	: process.env.NODE_ENV === 'development'
// 		? `http://jxtguns.58v5.cn/h5/#`
// 		: `http://jxtguns.58v5.cn/h5/#`
