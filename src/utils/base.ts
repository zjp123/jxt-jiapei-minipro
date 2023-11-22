interface URL {
    BASE_URL:string
    BASE_URL2:string
    GATE_URL:string
}

const notOnlineApi = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'


// OPEN_API: '"http://jxtopenapi.58v5.cn"',  https://jxtopenapi.xueche.com

const URLLIST: URL = {
    BASE_URL: notOnlineApi ? 'http://jxtopenapi.58v5.cn' : 'https://jxtopenapi.xueche.com',
    BASE_URL2: notOnlineApi ? 'https://jxtguns.58v5.cn' : 'https://jxtguns.58corp.com',
    GATE_URL: notOnlineApi ? 'https://gatewayapi.58v5.cn/jxtsaas_0' : 'https://saas.xueche.com',
    // GATE_URL: 'https://saas.xueche.com'
}
console.log("看看环境是测试环境吗",notOnlineApi,URLLIST.BASE_URL,URLLIST)
//https://saas.xueche.com
// http://jxedtsaastest3.58v5.cn
// http://jxtsaas.58v5.cn
//http://gatewayapi.58v5.cn/jxtsaas_6
//http://10.252.75.119:8080

export default URLLIST
