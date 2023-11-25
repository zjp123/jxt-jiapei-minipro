// import React from 'react'
import { View, Text } from '@tarojs/components'

const SingleOrder = (props: any) => {
   const {item, lastChild = false} = props
    return <View className="single-order" style={{borderBottom: lastChild ? 'none' : '1px solid #EDEDED' }}>
            <View className="order-level-left">
                <View className="order-level-top">
                    <Text className="bac-style">{item.carType}</Text>
                    <Text className="order-desc">{item.className}</Text>
                </View>
                <Text className="order-level-bottom">{item.schName}</Text>
            </View>
            <View className="order-level-right">
                <Text className="cny-sym">￥</Text>
                <Text>{item.actualFee}</Text>
            </View>
        </View>
}

export default SingleOrder