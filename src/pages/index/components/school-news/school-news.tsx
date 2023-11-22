// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import SingleNews from './single-news'

interface NewsProp{
    newsList: Array<any>
}

const SchoolNews = (props: NewsProp) => {
    const {newsList} = props
    return <View id="school-news-box">
        <View className="school-news-title">
            <View>
                <Text className="school-news-card-title">驾校资讯</Text>
            </View>
            <View>
                <Text
                onClick={() => {
                    Taro.navigateTo({
                        url: 'news'
                    })
                }}
                className="look-more">查看更多&gt;</Text>
            </View>
        </View>
        {
          newsList.map((item, index) => {
            return <SingleNews key={item.id} item={item} lastChild={index === newsList.length - 1}/>
          })
        }
        {/* <SingleNews />
        <SingleNews />
        <SingleNews lastChild/> */}
    </View>
}

export default SchoolNews