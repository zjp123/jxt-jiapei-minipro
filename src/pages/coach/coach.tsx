import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getCoachList } from '@/api/common'
import { addSyncTrackLog } from '@/utils/utils'
import { defaultCoachImage, shiming, coachAreaImg } from '@/utils/imgUrl'
import './coach.scss'

const Index: React.FC = () => {
    const { path }: any = Taro.getCurrentInstance().router;
    const [triggered, setTriggered] = useState(false)
    const [list, setList] = useState({
        list: [],
        pagination: {
            pageIndex: 1,
            pageSize: 10,
            totalPages: 1,
            totalRows: 1,
        }
    });
    // 初始化
    useEffect(() => {
        getList({ pageIndex: 1 })
    }, [])
    // 请求数据接口
    const getList = async (page, flag = false) => {
        try {
            const res: any = await getCoachList('POST', { ...list?.pagination, ...page })
            if (res?.code === 0 || res?.code === 200) {
                if (flag) {
                    const data = [...list?.list, ...res?.data?.list]
                    setList({
                        ...res?.data,
                        list: data
                    })
                } else {
                    setList(res?.data)
                }
            }
            setTriggered(false)
        } catch (e) {

        }
    }
    // 下拉触发
    const onPulling = () => {
        setTriggered(true)
    }

    // 下拉重新加载
    const onRefresh = () => {
        getList({ pageIndex: 1 })
    };
    // 上拉加载
    const onLoadMore = () => {
        if (list?.list.length === list?.pagination?.totalRows) {
            return
        }
        getList({ pageIndex: list.pagination.pageIndex + 1 }, true)
    };

    // 明星教练详情
    const goDetail = (item) => {
        addSyncTrackLog('教练详情', path, navigator.userAgent)
        Taro.navigateTo({
            url: `/pages/coachDetail/coachDetail?id=${item.id}`
        })
    }

    return (
        <View className='coach-werrper'>
            <ScrollView
                scrollY
                style={{ height: '100%', backgroundColor: '#F8F8F8' }}
                onScrollToLower={onLoadMore}
                lowerThreshold={50}
                refresherEnabled={true}
                refresherThreshold={50}
                refresherDefaultStyle="black"
                refresherBackground="#F8F8F8"
                refresherTriggered={triggered}
                // 自定义下拉刷新控件被下拉开始
                onRefresherPulling={onPulling}
                // 自定义下拉刷新被触发 -- 下拉刷新
                onRefresherRefresh={onRefresh}
            >
                <View className='coach-bg'>
                    {
                        list?.list?.map((item: any, index) => {
                            return (
                                <View
                                    key={index}
                                    className='coach-item'
                                    onClick={() => {
                                        goDetail(item)
                                    }}
                                >
                                    <View className='coach-item-img'>
                                        <Image className='img' src={item?.coachPhotoUrl ? item?.coachPhotoUrl + '?w=120&h=120' : defaultCoachImage} />
                                    </View>
                                    <View className='coach-item-content'>
                                        <View className='coach-content-top'>
                                            <Text className='coach-title'>{item?.coachName}</Text>
                                            <Image className='coach-shiming' src={shiming} />
                                            <Text className='coach-year'>{item?.coachYear}年教龄</Text>
                                        </View>
                                        <View className='coach-content-area'>
                                            <Image className='coach-area-img' src={coachAreaImg} />
                                            <Text className='coach-area-text'>{item.coachAreaList?.join('、')}</Text>
                                        </View>
                                        <View className='coach-content-info'>
                                            <Text className='coach-score'>{item.score}分</Text>
                                            <Text className='coach-dp'>
                                                点评<Text className='coach-dpCount'>{item.dpCount}</Text>条
                                            </Text>
                                            {
                                                item?.dpInfo?.slice(0, 2)?.map((i, index) => (
                                                    <Text key={index} className='coach-tab'>{i}</Text>
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                {
                    list?.list.length === list?.pagination?.totalRows &&
                    <View className='no-list'>暂无更多~</View>
                }
            </ScrollView>
        </View>
    )
}

export default Index
