// import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import SingleNews from './single-news'
import NoData from '@/components/noData/noData'

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
                        url: '/pages/news/news'
                    })
                }}
                className="look-more">查看更多&gt;</Text>
            </View>
        </View>
        {
          newsList.length ? newsList.map((item, index) => {
            return <SingleNews key={item.id} item={item} lastChild={index === newsList.length - 1}/>
          }) : <NoData />
        }
        {/* <SingleNews />
        <SingleNews />
        <SingleNews lastChild/> */}
    </View>
}

export default SchoolNews