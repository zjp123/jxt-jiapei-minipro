// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const SingleNews = (props) => {
    const {item} = props
    return <View onClick={() => {
      Taro.navigateTo({
        url: '/pages/newsDetail/newsDetail?id=' + item.id
      })
    }} className="single-news-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <View className="news-left">
                <View className="news-left-desc">{item.title}</View>
                <View className="news-left-date">
                    {item.top && <Text className="set-top">置顶</Text>}
                    <Text className="date">{item.dateShow}</Text>
                </View>
            </View>
            <View className="news-right">
                <Image src={item.picUrl} />
            </View>
    </View>
}

export default SingleNews