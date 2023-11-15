export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/consultation/consultation',
    'pages/registration/registration',
    'pages/my/my',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    },{
      "pagePath": "pages/consultation/consultation",
      "text": "咨询"
    },{
        "pagePath": "pages/registration/registration",
        "text": "报名"
      },{
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ]
  },
})
