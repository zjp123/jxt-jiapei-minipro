import React, { useState, useEffect } from 'react'
import { View, RichText, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getCombinationDetail } from '@/api/common'

import './newsDetail.scss'

const Index: React.FC = () => {
    const { params }: any = Taro.getCurrentInstance().router;
    // 教练数据
    const [data, setData] = useState<any>({});

    // 初始化
    useEffect(() => {
        getList()
    }, [])
    // 请求数据接口
    const getList = async () => {
        try {
            const res: any = await getCombinationDetail('POST', { id: params.id, type: params.type })
            if (res?.code === 0 || res?.code === 200) {
                setData(res?.data)
            }
        } catch (e) {

        }
    }

    return (
        <View className='news-detail-werrper'>
            <ScrollView
                scrollY
                style={{ height: '100%' }}
            >
                <View className='news-detail-content'>
                    <View className='news-detail-title'>{data?.title}</View>
                    <View className='news-detail-time'>{data?.dateShow}</View>
                    <View>
                        <RichText nodes={data?.text} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Index
