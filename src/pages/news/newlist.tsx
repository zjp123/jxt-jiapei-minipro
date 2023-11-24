import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, CoverImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getCombination } from '@/api/common'
import { addSyncTrackLog } from '@/utils/utils'
import { newS_img1, newS_img2, newS_img3 } from '@/utils/imgUrl'

interface Props {
    current: number // 资讯的类型
}
// 默认图片集合
const imgs = {
    0: newS_img1,
    1: newS_img2,
    2: newS_img3,
}
const Index: React.FC<Props> = (props) => {
    const { current } = props
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
    }, [current])

    // 请求数据接口
    const getList = async (page, flag = false) => {
        try {
            const res: any = await getCombination('POST', {type: current, ...list?.pagination, ...page })
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

    // 班制详情
    const goDetail = (item) => {
        addSyncTrackLog('资讯详情', path, navigator.userAgent)
        Taro.navigateTo({
            url: `/pages/newsDetail/newsDetail?id=${item.id}&type=${current}`
        })
    }

    return (
        <View className='new-list-werrper'>
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
                <View className='new-bg'>
                    {
                        list?.list?.map((item: any, index) => {
                            return (
                                <View
                                    key={index}
                                    className='new-item'
                                    onClick={() => {
                                        goDetail(item)
                                    }}
                                >
                                    <View className='new-item-content'>
                                        <View className='new-content-title'>{item?.title}</View>
                                        <View className='new-content'>
                                            {!!item.top && <Text className='new-tab'>置顶</Text>}
                                            <Text className='new-time'>{item.dateShow}</Text>
                                        </View>
                                    </View>
                                    <View className='new-item-img'>
                                        <CoverImage className='img' src={item.picUrl ? item.picUrl + '?w=107&h=72&ss=1' : imgs[current]} />
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
