// import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import SingleStar from './single-star'

const CoachStar = () => {
    return <View id="coach-star-box">
        <View className="coach-star-title">
            <View>
                <Text className="coach-card-title">明星教练</Text>
                <Text className="coach-card-level-title">金牌资深教练 一对一教学</Text>
            </View>
            <View>
                <Text className="look-more">查看更多&gt;</Text>
            </View>
        </View>
        <SingleStar />
        <SingleStar />
        <SingleStar lastChild/>
        {/* <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/zhjx.png"></Image>
            <Text>智慧驾校</Text>
        </View> */}
    </View>
}

export default CoachStar