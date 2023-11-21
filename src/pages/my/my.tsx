import { View, Text, Image, Button } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import { useLoad } from '@tarojs/taro'
import './my.scss'
import { get as getGlobalData } from '../../global_data'

export default function My() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  const getPhoneFn = (e) => {
        console.log(e)
  }

  return (
    <View id='my-wrap'>
        <View className="my-header">
            <View className="img-text">
                <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/adv-default.png"/>
                <View className="login-btn">
                    {/* <AtButton className="btn" type='primary' size='small'>点击登录/注册</AtButton> */}
                    <Button className="btn" openType='getPhoneNumber' onGetPhoneNumber={getPhoneFn}>获取手机号</Button>
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
