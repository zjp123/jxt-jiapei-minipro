// import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import SingleStar from './single-star'

interface StarProp{
    coachStarList: Array<any>
}

const CoachStar = (props: StarProp) => {
    const {coachStarList} = props
    return <View id="coach-star-box">
        <View className="coach-star-title">
            <View>
                <Text className="coach-card-title">明星教练</Text>
                <Text className="coach-card-level-title">金牌资深教练 一对一教学</Text>
            </View>
            <View>
                <Text
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/coach/coach'
                    })
                }} 
                className="look-more">查看更多&gt;</Text>
            </View>
        </View>
        {
          coachStarList.map((item, index) => {
            return <SingleStar key={item.id} item={item} lastChild={index === coachStarList.length - 1}/>
          })
        }
        {/* <SingleStar />
        <SingleStar />
        <SingleStar lastChild/> */}
        {/* <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/zhjx.png"></Image>
            <Text>智慧驾校</Text>
        </View> */}
    </View>
}

export default CoachStar