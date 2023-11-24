
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/consultation/consultation',
    'pages/registration/registration',
    'pages/my/my',
    'pages/classbrief/classbrief',
    'pages/webview/webview',
    'pages/classbriefDetail/classbriefDetail',
    'pages/webview/result',
    'pages/webview/pay',
    'pages/coach/coach',
    'pages/coachDetail/coachDetail',
    'pages/news/news',
    'pages/newsDetail/newsDetail',
    'pages/field/field',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  },
  tabBar: {
    "color": '#666',
    "selectedColor": '#333',
    "list": [{
      "pagePath": "pages/index/index",
      "selectedIconPath": 'static/images/shouye_active.png',
      "iconPath": 'static/images/shouye.png',
      "text": "首页"
    },{
      "pagePath": "pages/consultation/consultation",
      "selectedIconPath": 'static/images/consulta_active.png',
      "iconPath": 'static/images/consulta.png',
      "text": "咨询"
    },{
        "pagePath": "pages/registration/registration",
        "selectedIconPath": 'static/images/regis_active.png',
        "iconPath": 'static/images/regis.png',
        "text": "报名"
      },{
        "pagePath": "pages/my/my",
        "selectedIconPath": 'static/images/my_active.png',
        "iconPath": 'static/images/my.png',
        "text": "我的"
      }
    ]
  },
})
