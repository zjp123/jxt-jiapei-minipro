// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SingleNews = (props) => {
    return <View className="single-news-box" style={{borderBottom: props.lastChild ? 'none' : '1px solid #EDEDED' }}>
            <View>
                <View>是看思考思考思考</View>
                <View>
                    <Text>置顶</Text>
                    <Text>2023-10-01</Text>
                </View>
            </View>
            <View>
                <Image src="" />
            </View>
    </View>
}

export default SingleNews