interface URL {
    BASE_URL:string
    BASE_SAAS:string
    GATE_URL:string
    JXTCOMMON_API: string
}

const notOnlineApi = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'


// OPEN_API: '"http://jxtopenapi.58v5.cn"',  https://jxtopenapi.xueche.com

const URLLIST: URL = {
    BASE_URL: 'http://jxtopenapi.58v5.cn',
    BASE_SAAS: 'https://jxtsaas.58v5.cn',
    GATE_URL: 'https://gatewayapi.58v5.cn/jxtsaas_0',
    JXTCOMMON_API: 'https://jxt-common.58v5.cn',
    // GATE_URL: 'https://saas.xueche.com'
}
console.log("看看环境是测试环境吗",notOnlineApi,URLLIST.BASE_URL,URLLIST)
//https://saas.xueche.com
// http://jxedtsaastest3.58v5.cn
// http://jxtsaas.58v5.cn
//http://gatewayapi.58v5.cn/jxtsaas_6
//http://10.252.75.119:8080

export default URLLIST
