// import React from 'react'
import { View, Text } from '@tarojs/components'

const SingleOrder = (props: any) => {
   const {item, lastChild = false} = props
    return <View className="single-order" style={{borderBottom: lastChild ? 'none' : '1px solid #EDEDED' }}>
            <View className="order-level-left">
                <View className="order-level-top">
                    <Text className="bac-style">C1</Text>
                    <Text className="order-desc">{item.name}</Text>
                </View>
                <Text className="order-level-bottom">{item.schoolName}</Text>
            </View>
            <View className="order-level-right">
                <Text className="cny-sym">￥</Text>
                <Text>{item.price}</Text>
            </View>
        </View>
}

export default SingleOrder