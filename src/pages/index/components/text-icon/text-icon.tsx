// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const TextIcon = () => {
    return <View className="text_icon_box">
        <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/zhjx.png"></Image>
            <Text>智慧驾校</Text>
        </View>
        <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/1d1.png"></Image>
            <Text>1对1专属班主任</Text>
        </View>
        <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/zykc.png"></Image>
            <Text>自有考场</Text>
        </View>
        <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/mxjld.png"></Image>
            <Text>明星教练对</Text>
        </View>
    </View>
}

export default TextIcon