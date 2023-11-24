// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SingleCoach = (props) => {
    return <View className="single-coach-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <Image className="img-left-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/jltx.png" />
            <View className="card-right">
                <View className="card-right-one">
                    <Text className="card-right-title">库梅隆</Text>
                    <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/ysm-new.png" />
                    <Text className="star-tag">5年教龄</Text>
                </View>
                <View className="card-right-two">
                    <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon-xlc.png" />
                    <Text className="star-chang-di">科二训练场、科三训练场</Text>
                </View>
                <View className="card-right-three">
                    <Text className="score">5.0分</Text>
                    <View className="evaluate">
                        点评<Text className="count">13</Text>条
                    </View>
                    <Text className="star-tag">专业教学</Text>
                    <Text className="star-tag">技术高超</Text>
                </View>
            </View>
    </View>
}

export default SingleCoach