import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useLoad, useDidShow } from '@tarojs/taro'
import './my.scss'
// import { set as setGlobalData } from '../../global_data'
import Taro from '@tarojs/taro'
import { getPhoneApi, loginApi, getOrderListApi} from "@/api/common"
import { useEffect, useState } from 'react'
import SingleOrder from './single-order'
// let openId = ''
export default function My() {
  const store_phone = Taro.getStorageSync('phone')
  const [phoneState, setPhoneState] = useState(store_phone || '')
  const [orderList, setOrderList] = useState<Array<any>>([])
  useLoad(() => {
    console.log('Page loaded.', Taro.getStorageSync('phone'))
  })

  useDidShow(() => {
    console.log('useDidShow-------')
    if (!phoneState && Taro.getStorageSync('phone')) {
      setPhoneState(Taro.getStorageSync('phone'))
      getOrderFn()
    }
  })

  // useTabItemTap((item) => {
  //   console.log(item.index)
  //   console.log(item.pagePath)
  //   console.log(item.text)
  // })


  // useReady(() => { 
  //   openId = Taro.getStorageSync('openId')
  //   if (openId) { // 如果已有openid 不在重新获取
  //     return
  //   }
  //   Taro.login({
  //     async success(res) {
  //       if (res.code) {
  //           console.log("第一个code", res)
  //           //发起网络请求
  //           let data: any  = null
  //           try {
  //               data = await getOpenIdApi('POST',{ code: res.code }, 'BASE_SAAS')
  //               console.log('获取openid结果', data)
  //               if (data.code === 0) {
  //                 openId = data.data.openid
  //                 // 存储 openid
  //                 Taro.setStorage({
  //                   key:"openId",
  //                   data:openId
  //                 })
  //                 setGlobalData('openId', openId)
  //               }
  //           } catch (error) {
  //               console.log('getopenidgetopenidgetopenid', error)
  //           }
            
  //       } else {
  //           console.log("登录失败！" + res.errMsg);
  //       }
  //     },
  //   });
  // })

  const getOrderFn = async() => {
    Taro.showLoading()
    try {
      const res = await getOrderListApi('POST')
      Taro.hideLoading()
      setOrderList(res.data?.orders || [])
    } catch (error) {
      Taro.hideLoading()
      console.log(error)
    }
  }

  useEffect(() => {
    if (Taro.getStorageSync('phone')) {
      getOrderFn()
    }
  }, [])

  const loginFn = async(data) => {
    return await loginApi('POST', {...data})
  }

  const getPhoneFn = async (e) => {
        console.log(e)
        if (!e.target.code) {
          Taro.showToast({
            title: '需要您允许获取手机号码，查询订单信息',
            icon: 'error',
            duration: 2000
          })
          return
        }
        try {
            const store_openid = Taro.getStorageSync('openId')
            Taro.showLoading()
            const res = await getPhoneApi('POST', {code: e.target.code, openId: store_openid})
            console.log(res, '手机号手机号手机号手机号手机号')
            const telPhone = res.data.phone
            Taro.setStorage({
              key:"phone",
              data: telPhone
            })
            const loginRes = await loginFn({phone: telPhone, loginType: 3, openId: store_openid})
            setPhoneState(telPhone)
            console.log(loginRes, '获取token获取token获取token获取token')
            Taro.setStorage({
              key:'tokenId',
              data: loginRes.data.token
            })
            const orderListRes = await getOrderListApi('POST')
            console.log(orderListRes, '订单列表订单列表订单列表')
            Taro.hideLoading()
            setOrderList(orderListRes.data?.orders || [])
        } catch (error) {
            Taro.hideLoading()
            console.log(error, '登录发生错误')
        }
  }

  // const getUserInfoFn = () => {
  //   Taro.getUserProfile({
  //       desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //       success: (res) => {
  //           console.log(res, '获取昵称和头像结果')
  //           // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //       },
  //       fail: () => {
  //           console.log('拒绝获取头像和昵称')
  //       }
  //   })
  // }

  const trasformPhone = (str) => {
    return str.replace(/(\d{3})\d*(\d{4})/, "$1****$2")
  }

  return (
    <View id='my-wrap'>
        <View className="my-header">
            <View className="img-text">
                <Image src={phoneState ? 'https://img.58cdn.com.cn/dist/jxt/images/jxtschool/logined.png' : "https://img.58cdn.com.cn/dist/jxt/images/jxtschool/adv-default.png"}/>
                {(!phoneState || !Taro.getStorageSync('phone')) ? <View className="login-btn">
                    <AtButton openType='getPhoneNumber' onGetPhoneNumber={getPhoneFn} className="btn">点击登录/注册</AtButton>
                    {/* <Button className="btn" openType='getPhoneNumber' onGetPhoneNumber={getPhoneFn}>点击登录/注册</Button> */}
                    {/* <Button className="btn" onClick={getUserInfoFn}>登录</Button> */}
                    <Text className="more">登录后获取更多信息～</Text>
                    {/* <Text className="nickName">Hi，微信昵称</Text>
                    <Text className="phone">188****8888</Text> */}
                </View> : <View className="tel-phone">{trasformPhone(phoneState || '')}</View>}
            </View>
        </View>
        <View className="my-order">
            <Text className="order-title">我的订单</Text>
              {!orderList.length ? <View className="img-wrap">
                  <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/jqqd.png"/>
                  <Text>暂无数据~</Text>
              </View> :
              <View className="my-order-list">
                  {
                    orderList.map((item, index) => {
                      return <SingleOrder key={item.className + item.actualFee} item={item} lastChild={index === orderList.length - 1}/>
                    })
                  }
              </View>
            }
        </View>
        
    </View>
  )
}
