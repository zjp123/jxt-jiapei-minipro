// import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import SingleClass from './single-class'

interface IntroducProp{
    classIntroducList: Array<any>
}

const ClassIntroduc = (props: IntroducProp) => {
    const {classIntroducList} = props
    return <View id="class-introduc-box">
        <View className="class-introduc-title">
            <View>
                <Text className="class-card-title">班型介绍</Text>
                <Text className="class-card-level-title">多样化班型 量身定制</Text>
            </View>
            <View>
                <Text 
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/classbrief/classbrief'
                    })
                }} 
                className="look-more">查看更多&gt;</Text>
            </View>
        </View>
        {classIntroducList.map((item, index) => {
          return <SingleClass key={item.id} item={item} lastChild={index === classIntroducList.length - 1}/>
        })}
        {/* <SingleClass />
        <SingleClass />
        <SingleClass lastChild/> */}
        {/* <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/zhjx.png"></Image>
            <Text>智慧驾校</Text>
        </View> */}
    </View>
}

export default ClassIntroduc