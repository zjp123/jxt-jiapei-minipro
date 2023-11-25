// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import SignupBtn from '@/components/signupBtn/signupBtn'
import Taro from '@tarojs/taro'

const SingleClass = (props) => {
    const {item = {}} = props
    return <View onClick={() => {
      Taro.navigateTo({
        url: '/pages/classbriefDetail/classbriefDetail?id=' + item.id
      })
    }} className="single-class-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <Image className="img-left-width" src={item.picUrl} />
            <View className="card-right">
                <Text className="card-right-title">{item.dicTrainType} {item.name}</Text>
                <View className="three-tag">
                    <View className="card-right-tag">
                        <Text>最快{item.naBen}天拿证</Text>
                    </View>
                    <View className="card-right-tag">
                        <Text>{item.ctdK2}</Text>
                    </View>
                    <View className="card-right-tag">
                        <Text>{item.learnDriverTime}</Text>
                    </View>
                </View>
                {/* <View className="fl">
                    <View className="card-right-tag">
                        <Text>周一到周日练车</Text>
                    </View>
                </View> */}
                <View className="class-price">
                    <Text className="hdj">活动价</Text>
                    <Text className="symbol">￥</Text>
                    <Text className="cny">{item.price}</Text>
                    <Text className="origin-rice">原价￥{item.originalPrice}</Text>
                </View>
                <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                  {/* <Text className="class-online-sinup">在线报名</Text> */}
                  <SignupBtn data={item} />
                </View>
            </View>
    </View>
}

export default SingleClass