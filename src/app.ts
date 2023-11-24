import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'
import { set as setGlobalData } from './global_data'
import 'taro-ui/dist/style/index.scss' // 引入组件样式 - 方式一

function App({ children }: PropsWithChildren<any>) {
    useLaunch(() => {
        const systemInfo = wx.getSystemInfoSync(); //获取系统信息
        const menuInfo = wx.getMenuButtonBoundingClientRect(); // 获取胶囊按钮的信息
        // this.globalData.menuHeight = menuInfo.height; // 获取胶囊按钮的高
        // this.globalData.statusBarHeight = systemInfo.statusBarHeight; // 获取状态栏的高
        // this.globalData.menuRight = menuInfo.right; // 获取胶囊按钮的距离屏幕最右边的距离（此处用于设置导航栏左侧距离屏幕的距离）
        // this.globalData.navBarHeight = (menuInfo.top - systemInfo.statusBarHeight) * 2 + menuInfo.height; // 计算出导航栏的高度
        console.log(systemInfo, 'App launched. systemInfo')
        const tabbarHeight = systemInfo.screenHeight - systemInfo.windowHeight
        console.log(tabbarHeight, menuInfo, 'tabbarHeight')
        setGlobalData('menuHeight', menuInfo.height)
        setGlobalData('statusBarHeight', systemInfo.statusBarHeight)
        setGlobalData('menuRight', menuInfo.right)
        setGlobalData('navBarHeight', (menuInfo.top - systemInfo.statusBarHeight) * 2 + menuInfo.height)
        setGlobalData('tabbarHeight', tabbarHeight)
    })

    // children 是将要会渲染的页面
    return children
}

export default App
