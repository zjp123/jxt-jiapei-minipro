// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SingleClass = (props) => {
    return <View className="single-class-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <Image className="img-left-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/bxjs.png" />
            <View className="card-right">
                <Text className="card-right-title">C1 预约计时班</Text>
                <View className="two-tag">
                    <View className="card-right-tag">
                        <Text>最快50天拿证</Text>
                    </View>
                    <View className="card-right-tag">
                        <Text>最快50天拿证</Text>
                    </View>
                </View>
                <View className="fl">
                    <View className="card-right-tag">
                        <Text>周一到周日练车</Text>
                    </View>
                </View>
                <View className="class-price">
                    <Text className="hdj">活动价</Text>
                    <Text className="symbol">￥</Text>
                    <Text className="cny">6000</Text>
                    <Text className="origin-rice">原价￥6800</Text>
                </View>
                <Text className="class-online-sinup">在线报名</Text>
            </View>
    </View>
}

export default SingleClass