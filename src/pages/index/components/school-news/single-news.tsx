// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SingleNews = (props) => {
    return <View className="single-news-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <View className="news-left">
                <View className="news-left-desc">是看思考思考思考</View>
                <View className="news-left-date">
                    <Text className="set-top">置顶</Text>
                    <Text className="date">2023-10-01</Text>
                </View>
            </View>
            <View className="news-right">
                <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/jxzx-new.png" />
            </View>
    </View>
}

export default SingleNews