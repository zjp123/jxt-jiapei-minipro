const app = getApp();
Component({
  //接收 外部传入到属性值
  properties:{
    defaultSetting:{
      type:Object,
      value:{
        title:'默认标题',
        height:20,
        paddingTop:0,
        backgroundColor:'#124233',
        size:'default'
      }
    },
  },
  // 定义响应式数据
  data:{
    height:app.globalData.navBarHeight + app.globalData.statusBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    navBarHeight:app.globalData.navBarHeight,
  },
  // 定义方法
  methods:{
    bindCallBack(){
      wx.navigateBack({
        delta: 1,
      });
    }
  }
})