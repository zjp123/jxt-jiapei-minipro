import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, CoverImage } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './classbrief.scss'

const Index: React.FC = () => {
    const defaultClassesImage = 'https://img.58cdn.com.cn/dist/jxt/images/jxtschool/h5/classes-default.png'
    const [list, setList] = useState([{}]);
    // const [refreshing, setRefreshing] = useState(false);
    // const [loadingMore, setLoadingMore] = useState(false);

    useLoad(() => {
        console.log('Page loaded.')
    })

    const onRefresh = () => {
        console.log('=====222')
        // if (!refreshing) {
        //     setRefreshing(true);  // 打开刷新状态
        //     fetchData();
        // }
    };

    const onLoadMore = () => {
        console.log('=====1111')
        // if (!loadingMore) {
        //     setLoadingMore(true);  // 打开加载更多状态
        //     fetchData();
        // }
    };
    return (
        <ScrollView
            scrollY
            style={{ height: '100vh', backgroundColor: '#F8F8F8' }}
            onScrollToUpper={onRefresh}
            onScrollToLower={onLoadMore}
            upperThreshold={50}
            lowerThreshold={50}
        >
            <View className='class-bg'>
                {
                    list?.map((item, index) => {
                        return (
                            <View key={index} className='class-item'>
                                <View className='class-item-img'>
                                    <CoverImage className='img' src={defaultClassesImage} />
                                </View>
                                <View className='class-item-content'>
                                    <View className='class-content-top'>
                                        <Text className='class-title'>C1 速考无忧普通班</Text>
                                    </View>
                                    <View className='class-content-tab'>
                                        <View>
                                            <Text className='class-tab'>最快{50}天拿证</Text>
                                            <Text className='class-tab class-right'>{'一人一车'}</Text>
                                        </View>
                                        <View className='class-margin-top'>
                                            <Text className='class-tab'>{'周一到周日练车'}</Text>
                                        </View>
                                    </View>
                                    <View className='class-content-tip'>
                                        <Text className='class-tip-item'>周一至周日全天练车（不限课时）</Text>
                                    </View>
                                    <View className='class-content-price'>
                                        <Text className='class-price-text'>活动价¥</Text>
                                        <Text className='class-price-num'>6000</Text>
                                        <Text className='class-price-prve'>原价¥6800</Text>
                                    </View>
                                    <View className='class-content-btn'>
                                        <Text className='class-btn'>在线报名</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default Index
