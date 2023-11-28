const isDev = process.env.NODE_ENV === 'development'
const globalData = {
    navBarHeight:0,// 导航栏高度
    menuHeight:0,//胶囊按钮 高度
    statusBarHeight:0,//状态栏高度
    menuRight:0,//胶囊按钮 距离屏幕右边的距离
    openId: '',
    userInfo: {
        phone: ''
    },
    schoolId: isDev ? '1128592555575894016' : '1707325546549014529'
    // '1707325546549014529'
    // schoolId: '1426060676178128896' 1128592555575894016
}

export function set(key, val) {
  globalData[key] = val
}

export function get(key) {
  return globalData[key]
}