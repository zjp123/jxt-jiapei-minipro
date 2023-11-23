import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, CoverImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getClassList } from '@/api/common'
import { addSyncTrackLog } from '@/utils/utils'
import { defaultClassesImage } from '@/utils/imgUrl'

interface Props {
    current: number // 资讯的类型
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
            const res: any = await getClassList('POST', { ...list?.pagination, ...page })
            if (res?.code === 0 || res?.code === 200) {
                res.data.list.forEach((item: any) => {
                    if (item.remarks) {
                        item.remarksList = item.remarks
                            .replace(/[\.。；]/g, ';')
                            .split(';')
                            .filter((item: any) => item)
                    }
                })

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
        addSyncTrackLog('班型详情', path, navigator.userAgent)
        Taro.navigateTo({
            url: `/pages/classbriefDetail/classbriefDetail?id=${item.id}`
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
                <View className='class-bg'>
                    {
                        list?.list?.map((item: any, index) => {
                            return (
                                <View
                                    key={index}
                                    className='class-item'
                                    onClick={() => {
                                        goDetail(item)
                                    }}
                                >
                                    <View className='class-item-content'>
                                        <View className='class-content-top'>
                                        </View>
                                        <View className='class-content-tab'>
                                            <Text className='class-tab'>最快{item?.naBen}天拿证</Text>
                                            <Text className='class-tab'>最快{item?.naBen}天拿证</Text>
                                        </View>
                                    </View>
                                    <View className='class-item-img'>
                                        <CoverImage className='img' src={item?.picUrl ? item?.picUrl + '?w=233&h=175' : defaultClassesImage} />
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
