import React from 'react'
import { View } from '@tarojs/components'
import Taro,{useLoad} from '@tarojs/taro'

const Index: React.FC = () => {
    const params: any = Taro.getCurrentInstance().router?.params;
    useLoad(() => {
        requestPayment(params)
    })

    const requestPayment = (obj) => {
        console.log("reportEntry页面获取参数======>obj", obj)
        const objPay = JSON.parse(decodeURIComponent(obj.payParam));
        console.log("reportEntry页面获取参数======>objPay", objPay)
        //调起微信支付
        Taro.requestPayment({
            //相关支付参数
            // appId: objPay.appId,
            timeStamp: objPay.timeStamp,
            nonceStr: objPay.nonceStr,
            package: objPay.package,
            signType: objPay.signType,
            paySign: objPay.paySign,
            //小程序微信支付成功的回调通知
            success: function (res) {
                console.log("付款成功", res)
                //成功之后拉起微信支付 微信支付完成之后跳转到微信自带的支付成功页面 点击页面上的 ‘确定’ 按钮   返回到首页
                Taro.redirectTo({
                    url: `/pages/webview/result?payStatus=1`
                })
            },
            //小程序支付失败的回调通知
            fail: function (res) {
                console.log('支付失败', res)
                Taro.redirectTo({
                    url: `/pages/webview/result`
                })

            }
        });
    }

    return (
        <View></View>
    )
}

export default Index
