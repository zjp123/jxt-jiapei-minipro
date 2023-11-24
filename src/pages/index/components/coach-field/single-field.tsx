// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SingleCard = (props) => {
    return <View className="single-card-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <Image className="img-left-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/lccd.png" />
            <View className="card-right">
                <Text className="card-right-title">科二训练场地</Text>
                <View className="card-right-jz">
                    <Image className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon_jz.png" />
                    <Text>c1/c2</Text>
                </View>
                <View className="card-right-jz">
                    <Image className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon_dz.png" />
                    <Text>佛山无影脚</Text>
                </View>
            </View>
    </View>
}

export default SingleCard