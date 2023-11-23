import { View, Text, Image, Button } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import { useLoad } from '@tarojs/taro'
import './my.scss'
import { set as setGlobalData } from '../../global_data'
import Taro, { useReady } from '@tarojs/taro'
import { getOpenIdApi } from "@/api/common"


export default function My() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  useReady(() => { 
    Taro.login({
      async success(res) {
        if (res.code) {
            console.log("第一个code", res)
            //发起网络请求
            let data: any  = null
            try {
                data = await getOpenIdApi('POST',{ code: res.code }, 'BASE_SAAS')
                console.log('获取openid结果', data)
                if (data.code === 0) {
                  const openId = data.data.openid
                  setGlobalData('openId', openId)
                }
            } catch (error) {
                console.log('getopenidgetopenidgetopenid', error)
            }
            
        } else {
            console.log("登录失败！" + res.errMsg);
        }
      },
    });
  });


  const getPhoneFn = (e) => {
        console.log(e)
  }

  const getUserInfoFn = () => {
    Taro.getUserProfile({
        desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
            console.log(res, '获取昵称和头像结果')
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        },
        fail: () => {
            console.log('拒绝获取头像和昵称')
        }
    })
  }

  return (
    <View id='my-wrap'>
        <View className="my-header">
            <View className="img-text">
                <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/adv-default.png"/>
                <View className="login-btn">
                    {/* <AtButton className="btn" type='primary' size='small'>点击登录/注册</AtButton> */}
                    <Button className="btn" openType='getPhoneNumber' onGetPhoneNumber={getPhoneFn}>获取手机号</Button>
                    {/* <Button className="btn" onClick={getUserInfoFn}>登录</Button> */}
                    <Text className="more">登录后获取更多信息～</Text>
                    {/* <Text className="nickName">Hi，微信昵称</Text>
                    <Text className="phone">188****8888</Text> */}
                </View>
            </View>
        </View>
        <View className="my-order">
            <Text className="order-title">我的订单</Text>
            {/* <View className="img-wrap">
                <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/jqqd.png"/>
                <Text>暂无数据~</Text>
            </View> */}
            <View className="my-order-list">
                <View className="single-order">
                    <View className="order-level-left">
                        <View className="order-level-top">
                            <Text className="bac-style">C1</Text>
                            <Text className="order-desc">速考无忧普通班</Text>
                        </View>
                        <Text className="order-level-bottom">佛山58驾校</Text>
                    </View>
                    <View className="order-level-right">
                        <Text className="cny-sym">￥</Text>
                        <Text>3800</Text>
                    </View>
                </View>
                <View className="single-order">
                    <View className="order-level-left">
                        <View className="order-level-top">
                            <Text className="bac-style">C1</Text>
                            <Text className="order-desc">速考无忧普通班</Text>
                        </View>
                        <Text className="order-level-bottom">佛山58驾校</Text>
                    </View>
                    <View className="order-level-right">
                        <Text className="cny-sym">￥</Text>
                        <Text>3800</Text>
                    </View>
                </View>
                <View className="single-order">
                    <View className="order-level-left">
                        <View className="order-level-top">
                            <Text className="bac-style">C1</Text>
                            <Text className="order-desc">速考无忧普通班</Text>
                        </View>
                        <Text className="order-level-bottom">佛山58驾校</Text>
                    </View>
                    <View className="order-level-right">
                        <Text className="cny-sym">￥</Text>
                        <Text>3800</Text>
                    </View>
                </View>
            </View>
        </View>
        
    </View>
  )
}
