// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const SingleCoach = (props) => {
    const {item} = props
    return <View onClick={() => {
      Taro.navigateTo({
        url: '/pages/coachDetail/coachDetail?id=' + item.id
      })
    }} className="single-coach-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <Image className="img-left-width" src={item.coachPhotoUrl} />
            <View className="card-right">
                <View className="card-right-one">
                    <Text className="card-right-title">{item.coachName}</Text>
                    <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/ysm-new.png" />
                    <Text className="star-tag">{item.coachYear}年教龄</Text>
                </View>
                <View className="card-right-two">
                    <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon-xlc.png" />
                    <Text numberOfLines={1} maxLines={1} className="star-chang-di">{item.coachAreaList.join('、')}</Text>
                </View>
                <View className="card-right-three">
                    <Text className="score">{item.score}分</Text>
                    <View className="evaluate">
                        点评<Text className="count">{item.dpCount}</Text>条
                    </View>
                    {
                      item.dpInfo.slice(0, 3).map((item) => {
                        return <Text key={item} className="star-tag">{item}</Text>
                      })
                    }
                    {/* <Text className="star-tag">专业教学</Text>
                    <Text className="star-tag">技术高超</Text> */}
                </View>
            </View>
    </View>
}

export default SingleCoach