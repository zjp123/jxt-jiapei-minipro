const globalData = {
    navBarHeight:0,// 导航栏高度
    menuHeight:0,//胶囊按钮 高度
    statusBarHeight:0,//状态栏高度
    menuRight:0,//胶囊按钮 距离屏幕右边的距离
    openId: '',
    userInfo: {
        phone: ''
    },
    schoolId: '1128592555575894016'
}

export function set(key, val) {
  globalData[key] = val
}

export function get(key) {
  return globalData[key]
}