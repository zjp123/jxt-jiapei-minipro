// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import './index.scss'

interface ContactProp{
    contactInfo: {[key: string]: any}
}

const ContactUs = (props: ContactProp) => {
    // Taro.hideTabBar()
    const {contactInfo} = props
    const systemInfo = wx.getSystemInfoSync()
    console.log(systemInfo, '111111111')

    const makePhoneCallFn = (e) => {
        const phoneNumber = e.target.dataset.phone
        wx.makePhoneCall({
            phoneNumber: phoneNumber
        })
    }
    // const handleLongPress = (e) => {
    //     // console.log(8888)
    //     console.log(e)
    //     const qrcodeSrc = e.target.dataset.src; // 获取二维码图片的路径  
    //     if (qrcodeSrc) {  
    //         Taro.previewImage({  
    //             current: qrcodeSrc, // 当前显示图片的链接，不填则默认为 urls 的第一张  
    //             urls: [qrcodeSrc] // 需要预览的图片链接列表  
    //         })  
    //     } else {  
    //         Taro.showToast({  
    //             title: '请确保二维码图片路径正确',  
    //             icon: 'none',  
    //             duration: 2000  
    //         })  
    //     }  
    // }
    return <View id="contact-us-box">
        <View className="contact-us-title">
            <View>
                <Text className="contact-us-card-title">联系我们</Text>
            </View>
        </View>
        <View className="contact-img-text">
            <View className="left">
                <View className="left-level-box">
                    <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/lianxi-us-logo.png" />
                    <Text></Text>
                    <View>
                        <Text className="lianxiren">联系人：</Text>
                        <Text>{contactInfo.contact || ''}</Text>
                    </View>
                    <View>
                        <Text className="shouji">手<Text style={{visibility: 'hidden'}}>的</Text>机：</Text>
                        <Text data-phone={contactInfo.contactPhone || ''} onClick={makePhoneCallFn}>{contactInfo.contactPhone || ''}</Text>
                    </View>
                </View>
            </View>
            <View className="right">
                {/* <View><Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/baoming.png" /></View> */}
                {/* <Image data-src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/baoming.png" onLongPress={handleLongPress} src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/baoming.png" /> */}
                <Image showMenuByLongpress src={contactInfo.wxQrCode || ''} />
                <View className="text-box">
                    <Text className="text-one">长按下载至相册</Text>
                    <Text>微信识别咨询报名</Text>
                </View>
            </View>
        </View>
    </View>
}

export default ContactUs