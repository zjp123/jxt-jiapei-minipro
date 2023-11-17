// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import SingleNews from './single-news'

const SchoolNews = () => {
    return <View id="school-news-box">
        <View className="school-news-title">
            <View>
                <Text className="school-news-card-title">驾校咨询</Text>
            </View>
            <View>
                <Text className="look-more">查看更多&gt;</Text>
            </View>
        </View>
        <SingleNews />
        <SingleNews />
        <SingleNews lastChild/>
    </View>
}

export default SchoolNews