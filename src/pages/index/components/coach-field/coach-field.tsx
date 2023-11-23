// import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import SingleField from './single-field'

interface FieldProp{
    fieldList: Array<any>
}

const CoachField = (props: FieldProp) => {
    return <View id="coach_field_box">
        <View className="coach_field_title">
            <View>
                <Text className="coach_field_card_title">练车场地</Text>
                <Text className="coach_field_card_level_title">就近练车</Text>
            </View>
            <View>
                <Text 
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/field/field'
                    })
                }} 
                className="look_more">查看更多&gt;</Text>
            </View>
        </View>
        {props.fieldList.map((item, index) => {
          return <SingleField key={item.id} item={item} lastChild={index === props.fieldList.length - 1}/>
        })}
        {/* <SingleField />
        <SingleField />
        <SingleField lastChild/> */}
        {/* <View className="fl">
            <Image className="mr" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/zhjx.png"></Image>
            <Text>智慧驾校</Text>
        </View> */}
    </View>
}

export default CoachField