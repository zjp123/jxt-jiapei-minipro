// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SmartSchool = () => {
    return <View id="smart-school-box">
        <View className="smart-title">
            <View>
                <Text className="smart-card-title">智慧驾校</Text>
                <Text className="smart-card-level-title">多全智慧打造学车体验</Text>
            </View>
        </View>
        <View className="smart-imgs">
            <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/znbzr.png"></Image>
            <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/znmnq.png"></Image>
            <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/znjqr.png"></Image>
        </View>
    </View>
}

export default SmartSchool