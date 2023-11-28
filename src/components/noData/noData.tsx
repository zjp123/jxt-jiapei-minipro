import React from 'react'
import { View, Image } from '@tarojs/components'
import './noData.scss'

const Index: React.FC = () => {
    const noData = 'https://img.58cdn.com.cn/dist/jxt/images/jxtschool/h5/no-data.png?v=1'
   
    return (
        <View className='no-data'>
            <Image src={noData} className='no-data-img' />
            <View className='no-data-text'>暂无数据</View>
        </View>
    )
}

export default Index
